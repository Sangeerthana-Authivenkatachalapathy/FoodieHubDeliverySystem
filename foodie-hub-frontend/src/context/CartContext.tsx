import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { CartItem, MenuItem } from '../types';
import apiService from '../services/api';
import { useAuth } from './AuthContext';

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  isLoading: boolean;
  error: string | null;
}

interface CartContextType extends CartState {
  addToCart: (menuItem: MenuItem, quantity?: number) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  clearError: () => void;
}

type CartAction =
  | { type: 'CART_LOADING' }
  | { type: 'CART_LOADED'; payload: CartItem[] }
  | { type: 'CART_ERROR'; payload: string }
  | { type: 'ITEM_ADDED'; payload: CartItem }
  | { type: 'ITEM_REMOVED'; payload: number }
  | { type: 'ITEM_UPDATED'; payload: CartItem }
  | { type: 'CART_CLEARED' }
  | { type: 'CLEAR_ERROR' };

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
  isLoading: false,
  error: null,
};

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => {
    const price = item.menuItem?.price || 0;
    return sum + (price * item.quantity);
  }, 0);
  
  return { totalItems, totalAmount };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'CART_LOADING':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'CART_LOADED': {
      const { totalItems, totalAmount } = calculateTotals(action.payload);
      return {
        ...state,
        items: action.payload,
        totalItems,
        totalAmount,
        isLoading: false,
        error: null,
      };
    }
    case 'CART_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'ITEM_ADDED': {
      const newItems = [...state.items, action.payload];
      const { totalItems, totalAmount } = calculateTotals(newItems);
      return {
        ...state,
        items: newItems,
        totalItems,
        totalAmount,
        error: null,
      };
    }
    case 'ITEM_REMOVED': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const { totalItems, totalAmount } = calculateTotals(newItems);
      return {
        ...state,
        items: newItems,
        totalItems,
        totalAmount,
        error: null,
      };
    }
    case 'ITEM_UPDATED': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id ? action.payload : item
      );
      const { totalItems, totalAmount } = calculateTotals(newItems);
      return {
        ...state,
        items: newItems,
        totalItems,
        totalAmount,
        error: null,
      };
    }
    case 'CART_CLEARED': {
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalAmount: 0,
        error: null,
      };
    }
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      refreshCart();
    }
  }, [isAuthenticated, user]);

  const refreshCart = async (): Promise<void> => {
    if (!user) return;
    
    try {
      dispatch({ type: 'CART_LOADING' });
      const cartItems = await apiService.getCartItems(user.userId);
      dispatch({ type: 'CART_LOADED', payload: cartItems });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to load cart';
      dispatch({ type: 'CART_ERROR', payload: errorMessage });
    }
  };

  const addToCart = async (menuItem: MenuItem, quantity: number = 1): Promise<void> => {
    if (!user) {
      dispatch({ type: 'CART_ERROR', payload: 'Please login to add items to cart' });
      return;
    }

    try {
      // Check if item already exists in cart
      const existingItem = state.items.find(item => item.menuItemId === menuItem.menuItemId);
      
      if (existingItem) {
        // Update existing item quantity
        await updateQuantity(existingItem.id, existingItem.quantity + quantity);
      } else {
        // Add new item to cart
        const cartItem = await apiService.addToCart({
          userId: user.userId,
          menuItemId: menuItem.menuItemId,
          quantity,
        });
        
        // Include menu item details for display
        const cartItemWithDetails = {
          ...cartItem,
          menuItem,
        };
        
        dispatch({ type: 'ITEM_ADDED', payload: cartItemWithDetails });
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to add item to cart';
      dispatch({ type: 'CART_ERROR', payload: errorMessage });
      throw error;
    }
  };

  const removeFromCart = async (cartItemId: number): Promise<void> => {
    try {
      await apiService.removeFromCart(cartItemId);
      dispatch({ type: 'ITEM_REMOVED', payload: cartItemId });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to remove item from cart';
      dispatch({ type: 'CART_ERROR', payload: errorMessage });
      throw error;
    }
  };

  const updateQuantity = async (cartItemId: number, quantity: number): Promise<void> => {
    if (quantity <= 0) {
      await removeFromCart(cartItemId);
      return;
    }

    try {
      const existingItem = state.items.find(item => item.id === cartItemId);
      if (!existingItem) return;

      const updatedItem = { ...existingItem, quantity };
      await apiService.updateCartItem(cartItemId, updatedItem);
      dispatch({ type: 'ITEM_UPDATED', payload: updatedItem });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to update item quantity';
      dispatch({ type: 'CART_ERROR', payload: errorMessage });
      throw error;
    }
  };

  const clearCart = async (): Promise<void> => {
    if (!user) return;

    try {
      await apiService.clearCart(user.userId);
      dispatch({ type: 'CART_CLEARED' });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to clear cart';
      dispatch({ type: 'CART_ERROR', payload: errorMessage });
      throw error;
    }
  };

  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: CartContextType = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    refreshCart,
    clearError,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
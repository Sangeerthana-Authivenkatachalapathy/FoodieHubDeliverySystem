import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { CartItem, MenuItem } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  public cartItems$ = this.cartItemsSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {
    // Load cart when user is authenticated
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.refreshCart();
      } else {
        this.cartItemsSubject.next([]);
      }
    });
  }

  get cartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  get totalItems(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalAmount(): number {
    return this.cartItems.reduce((sum, item) => {
      const price = item.menuItem?.price || 0;
      return sum + (price * item.quantity);
    }, 0);
  }

  refreshCart(): void {
    const user = this.authService.currentUser;
    if (!user) return;

    this.loadingSubject.next(true);
    this.apiService.getCartItems(user.userId).pipe(
      tap(items => {
        this.cartItemsSubject.next(items);
        this.loadingSubject.next(false);
      }),
      catchError(error => {
        this.loadingSubject.next(false);
        const errorMessage = error.error?.message || 'Failed to load cart';
        this.errorSubject.next(errorMessage);
        return throwError(() => error);
      })
    ).subscribe();
  }

  addToCart(menuItem: MenuItem, quantity: number = 1): Observable<void> {
    const user = this.authService.currentUser;
    if (!user) {
      this.errorSubject.next('Please login to add items to cart');
      return throwError(() => new Error('User not authenticated'));
    }

    // Check if item already exists in cart
    const existingItem = this.cartItems.find(item => item.menuItemId === menuItem.menuItemId);
    
    if (existingItem) {
      // Update existing item quantity
      return this.updateQuantity(existingItem.id, existingItem.quantity + quantity);
    } else {
      // Add new item to cart
      const cartItem = {
        userId: user.userId,
        menuItemId: menuItem.menuItemId,
        quantity
      };

      return this.apiService.addToCart(cartItem).pipe(
        tap(newItem => {
          const cartItemWithDetails = {
            ...newItem,
            menuItem
          };
          const currentItems = this.cartItemsSubject.value;
          this.cartItemsSubject.next([...currentItems, cartItemWithDetails]);
        }),
        catchError(error => {
          const errorMessage = error.error?.message || 'Failed to add item to cart';
          this.errorSubject.next(errorMessage);
          return throwError(() => error);
        })
      );
    }
  }

  removeFromCart(cartItemId: number): Observable<void> {
    return this.apiService.removeFromCart(cartItemId).pipe(
      tap(() => {
        const currentItems = this.cartItemsSubject.value;
        const updatedItems = currentItems.filter(item => item.id !== cartItemId);
        this.cartItemsSubject.next(updatedItems);
      }),
      catchError(error => {
        const errorMessage = error.error?.message || 'Failed to remove item from cart';
        this.errorSubject.next(errorMessage);
        return throwError(() => error);
      })
    );
  }

  updateQuantity(cartItemId: number, quantity: number): Observable<void> {
    if (quantity <= 0) {
      return this.removeFromCart(cartItemId);
    }

    const existingItem = this.cartItems.find(item => item.id === cartItemId);
    if (!existingItem) {
      return throwError(() => new Error('Item not found'));
    }

    const updatedItem = { ...existingItem, quantity };
    
    return this.apiService.updateCartItem(cartItemId, updatedItem).pipe(
      tap(() => {
        const currentItems = this.cartItemsSubject.value;
        const updatedItems = currentItems.map(item =>
          item.id === cartItemId ? updatedItem : item
        );
        this.cartItemsSubject.next(updatedItems);
      }),
      catchError(error => {
        const errorMessage = error.error?.message || 'Failed to update item quantity';
        this.errorSubject.next(errorMessage);
        return throwError(() => error);
      })
    );
  }

  clearCart(): Observable<void> {
    const user = this.authService.currentUser;
    if (!user) {
      return throwError(() => new Error('User not authenticated'));
    }

    return this.apiService.clearCart(user.userId).pipe(
      tap(() => {
        this.cartItemsSubject.next([]);
      }),
      catchError(error => {
        const errorMessage = error.error?.message || 'Failed to clear cart';
        this.errorSubject.next(errorMessage);
        return throwError(() => error);
      })
    );
  }

  clearError(): void {
    this.errorSubject.next(null);
  }
}
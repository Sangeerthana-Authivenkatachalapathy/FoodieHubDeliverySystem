import React from 'react';
import styled from 'styled-components';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
`;

const CartCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
`;

const ItemPrice = styled.p`
  color: #667eea;
  font-weight: 600;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 0 20px;
`;

const QuantityButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2px solid #667eea;
  background: white;
  color: #667eea;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: #667eea;
    color: white;
  }
`;

const Quantity = styled.span`
  font-weight: 600;
  font-size: 1.1rem;
  min-width: 30px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: #ff4757;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background 0.3s ease;
  
  &:hover {
    background: #ff3742;
  }
`;

const Summary = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  
  &:last-child {
    margin-bottom: 0;
    font-weight: 700;
    font-size: 1.2rem;
    color: #333;
    border-top: 1px solid #ddd;
    padding-top: 10px;
  }
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
`;

const EmptyCartIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
`;

const Cart: React.FC = () => {
  const { items, totalAmount, updateQuantity, removeFromCart, isLoading } = useCart();

  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    try {
      await updateQuantity(itemId, newQuantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const handleRemoveItem = async (itemId: number) => {
    try {
      await removeFromCart(itemId);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const handleCheckout = () => {
    // TODO: Implement checkout functionality
    alert('Checkout functionality will be implemented soon!');
  };

  if (items.length === 0) {
    return (
      <Container>
        <Title>Your Cart</Title>
        <CartCard>
          <EmptyCart>
            <EmptyCartIcon>🛒</EmptyCartIcon>
            <h3>Your cart is empty</h3>
            <p>Add some delicious items to get started!</p>
          </EmptyCart>
        </CartCard>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Your Cart</Title>
      <CartCard>
        {items.map((item) => (
          <CartItem key={item.id}>
            <ItemInfo>
              <ItemName>{item.menuItem?.name || 'Menu Item'}</ItemName>
              <ItemPrice>₹{item.menuItem?.price || 0} each</ItemPrice>
            </ItemInfo>
            
            <QuantityControls>
              <QuantityButton
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                disabled={isLoading}
              >
                <Minus size={16} />
              </QuantityButton>
              <Quantity>{item.quantity}</Quantity>
              <QuantityButton
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                disabled={isLoading}
              >
                <Plus size={16} />
              </QuantityButton>
            </QuantityControls>
            
            <RemoveButton
              onClick={() => handleRemoveItem(item.id)}
              disabled={isLoading}
            >
              <Trash2 size={16} />
              Remove
            </RemoveButton>
          </CartItem>
        ))}
        
        <Summary>
          <SummaryRow>
            <span>Subtotal:</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Delivery Fee:</span>
            <span>₹40.00</span>
          </SummaryRow>
          <SummaryRow>
            <span>Total:</span>
            <span>₹{(totalAmount + 40).toFixed(2)}</span>
          </SummaryRow>
        </Summary>
        
        <CheckoutButton onClick={handleCheckout} disabled={isLoading}>
          <ShoppingBag size={20} />
          Proceed to Checkout
        </CheckoutButton>
      </CartCard>
    </Container>
  );
};

export default Cart;
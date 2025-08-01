import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { MapPin, Star, Clock, Plus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import apiService from '../../services/api';
import { useCart } from '../../context/CartContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const RestaurantHeader = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
`;

const RestaurantName = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
`;

const RestaurantMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  color: #666;
  font-size: 16px;
  margin-bottom: 15px;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const RestaurantDescription = styled.p`
  color: #666;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const RestaurantAddress = styled.p`
  color: #999;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const MenuSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
`;

const MenuTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 30px;
`;

const MenuGrid = styled.div`
  display: grid;
  gap: 20px;
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 2px solid #f0f0f0;
  border-radius: 10px;
  transition: border-color 0.3s ease;
  
  &:hover {
    border-color: #667eea;
  }
`;

const MenuItemInfo = styled.div`
  flex: 1;
`;

const MenuItemName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
`;

const MenuItemDescription = styled.p`
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
`;

const MenuItemPrice = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #667eea;
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 600;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #ff4757;
  padding: 20px;
  background: #fee;
  border-radius: 10px;
  margin: 20px 0;
`;

const RestaurantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const { data: restaurant, isLoading: restaurantLoading, error: restaurantError } = useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => apiService.getRestaurantById(Number(id)),
    enabled: !!id,
  });

  const { data: menuItems, isLoading: menuLoading, error: menuError } = useQuery({
    queryKey: ['menu-items', id],
    queryFn: () => apiService.getMenuItemsByRestaurant(Number(id)),
    enabled: !!id,
  });

  const handleAddToCart = async (menuItem: any) => {
    try {
      await addToCart(menuItem);
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  if (restaurantLoading || menuLoading) {
    return <LoadingSpinner>Loading restaurant details...</LoadingSpinner>;
  }

  if (restaurantError || menuError) {
    return (
      <Container>
        <ErrorMessage>
          Failed to load restaurant details. Please try again later.
        </ErrorMessage>
      </Container>
    );
  }

  if (!restaurant) {
    return (
      <Container>
        <ErrorMessage>Restaurant not found.</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <RestaurantHeader>
        <RestaurantName>{restaurant.restaurantName}</RestaurantName>
        <RestaurantMeta>
          <MetaItem>
            <MapPin size={16} />
            {restaurant.city}
          </MetaItem>
          <MetaItem>
            <Star size={16} />
            4.5 (120 reviews)
          </MetaItem>
          <MetaItem>
            <Clock size={16} />
            30-45 min
          </MetaItem>
        </RestaurantMeta>
        <RestaurantDescription>
          {restaurant.description || 'Delicious food prepared with love and care.'}
        </RestaurantDescription>
        <RestaurantAddress>
          <MapPin size={14} />
          {restaurant.address}, {restaurant.city} - {restaurant.pincode}
        </RestaurantAddress>
      </RestaurantHeader>

      <MenuSection>
        <MenuTitle>Menu</MenuTitle>
        {menuItems && menuItems.length > 0 ? (
          <MenuGrid>
            {menuItems.map((item) => (
              <MenuItem key={item.menuItemId}>
                <MenuItemInfo>
                  <MenuItemName>{item.name}</MenuItemName>
                  <MenuItemDescription>
                    {item.description || 'A delicious menu item'}
                  </MenuItemDescription>
                  <MenuItemPrice>₹{item.price}</MenuItemPrice>
                </MenuItemInfo>
                <AddButton onClick={() => handleAddToCart(item)}>
                  <Plus size={16} />
                  Add
                </AddButton>
              </MenuItem>
            ))}
          </MenuGrid>
        ) : (
          <div style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
            <p>No menu items available at the moment.</p>
          </div>
        )}
      </MenuSection>
    </Container>
  );
};

export default RestaurantDetail;
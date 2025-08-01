import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Search, MapPin, Star, Clock, ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import apiService from '../services/api';
import { Restaurant } from '../types';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 60px 40px;
  text-align: center;
  color: white;
  margin-bottom: 40px;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  opacity: 0.9;
`;

const SearchSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const SearchTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const SearchForm = styled.form`
  display: flex;
  gap: 15px;
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 15px 20px;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const SearchButton = styled.button`
  padding: 15px 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const FeaturedSection = styled.section`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 30px;
  color: #333;
  text-align: center;
`;

const RestaurantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const RestaurantCard = styled(Link)`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

const RestaurantImage = styled.div`
  height: 200px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

const RestaurantInfo = styled.div`
  padding: 20px;
`;

const RestaurantName = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
`;

const RestaurantMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const RestaurantDescription = styled.p`
  color: #666;
  font-size: 14px;
  line-height: 1.4;
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

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const ActionCard = styled(Link)`
  background: white;
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ActionIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 15px;
`;

const ActionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
`;

const ActionDescription = styled.p`
  color: #666;
  font-size: 14px;
`;

const Home: React.FC = () => {
  const [searchPincode, setSearchPincode] = useState('');

  const { data: restaurants, isLoading, error } = useQuery({
    queryKey: ['featured-restaurants'],
    queryFn: () => apiService.getAllRestaurants(),
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchPincode.trim()) {
      window.location.href = `/restaurants?pincode=${searchPincode}`;
    }
  };

  const featuredRestaurants = restaurants?.slice(0, 6) || [];

  return (
    <HomeContainer>
      <HeroSection>
        <HeroTitle>Delicious Food, Delivered Fast</HeroTitle>
        <HeroSubtitle>
          Discover amazing restaurants in your area and get your favorite food delivered to your doorstep
        </HeroSubtitle>
      </HeroSection>

      <SearchSection>
        <SearchTitle>Find Restaurants Near You</SearchTitle>
        <SearchForm onSubmit={handleSearch}>
          <SearchInput
            type="text"
            placeholder="Enter your pincode..."
            value={searchPincode}
            onChange={(e) => setSearchPincode(e.target.value)}
          />
          <SearchButton type="submit">
            <Search size={20} />
            Search
          </SearchButton>
        </SearchForm>
      </SearchSection>

      <QuickActions>
        <ActionCard to="/restaurants">
          <ActionIcon>🍽️</ActionIcon>
          <ActionTitle>Browse Restaurants</ActionTitle>
          <ActionDescription>Explore all available restaurants in your area</ActionDescription>
        </ActionCard>
        
        <ActionCard to="/orders">
          <ActionIcon>📦</ActionIcon>
          <ActionTitle>Track Orders</ActionTitle>
          <ActionDescription>View your order history and track current orders</ActionDescription>
        </ActionCard>
        
        <ActionCard to="/profile">
          <ActionIcon>👤</ActionIcon>
          <ActionTitle>Your Profile</ActionTitle>
          <ActionDescription>Manage your account and delivery addresses</ActionDescription>
        </ActionCard>
      </QuickActions>

      <FeaturedSection>
        <SectionTitle>Featured Restaurants</SectionTitle>
        
        {isLoading && <LoadingSpinner>Loading restaurants...</LoadingSpinner>}
        
        {error && (
          <ErrorMessage>
            Failed to load restaurants. Please try again later.
          </ErrorMessage>
        )}
        
        {featuredRestaurants.length > 0 && (
          <RestaurantGrid>
            {featuredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} to={`/restaurants/${restaurant.id}`}>
                <RestaurantImage>
                  🍽️
                </RestaurantImage>
                <RestaurantInfo>
                  <RestaurantName>{restaurant.restaurantName}</RestaurantName>
                  <RestaurantMeta>
                    <MetaItem>
                      <MapPin size={14} />
                      {restaurant.city}
                    </MetaItem>
                    <MetaItem>
                      <Star size={14} />
                      4.5
                    </MetaItem>
                    <MetaItem>
                      <Clock size={14} />
                      30-45 min
                    </MetaItem>
                  </RestaurantMeta>
                  <RestaurantDescription>
                    {restaurant.description || 'Delicious food awaits you!'}
                  </RestaurantDescription>
                </RestaurantInfo>
              </RestaurantCard>
            ))}
          </RestaurantGrid>
        )}
        
        {featuredRestaurants.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <Link to="/restaurants">
              <SearchButton as="div" style={{ display: 'inline-flex' }}>
                View All Restaurants
                <ArrowRight size={20} />
              </SearchButton>
            </Link>
          </div>
        )}
      </FeaturedSection>
    </HomeContainer>
  );
};

export default Home;
import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { Search, MapPin, Star, Clock, Filter } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import apiService from '../../services/api';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
`;

const SearchBar = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
`;

const SearchForm = styled.form`
  display: flex;
  gap: 15px;
  
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
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const RestaurantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
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
  margin-bottom: 15px;
`;

const RestaurantAddress = styled.p`
  color: #999;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
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

const NoResults = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
`;

const RestaurantList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('pincode') || '');
  const [activeSearch, setActiveSearch] = useState(searchParams.get('pincode') || '');

  const { data: restaurants, isLoading, error } = useQuery({
    queryKey: ['restaurants', activeSearch],
    queryFn: () => {
      if (activeSearch) {
        return apiService.getRestaurantsByPincode(activeSearch);
      }
      return apiService.getAllRestaurants();
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveSearch(searchQuery);
  };

  return (
    <Container>
      <Header>
        <Title>Restaurants</Title>
        <Subtitle>Discover amazing restaurants and order your favorite food</Subtitle>
      </Header>

      <SearchBar>
        <SearchForm onSubmit={handleSearch}>
          <SearchInput
            type="text"
            placeholder="Search by pincode, restaurant name, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchButton type="submit">
            <Search size={20} />
            Search
          </SearchButton>
        </SearchForm>
      </SearchBar>

      {isLoading && <LoadingSpinner>Loading restaurants...</LoadingSpinner>}

      {error && (
        <ErrorMessage>
          Failed to load restaurants. Please try again later.
        </ErrorMessage>
      )}

      {restaurants && restaurants.length === 0 && (
        <NoResults>
          <h3>No restaurants found</h3>
          <p>Try searching with a different pincode or location.</p>
        </NoResults>
      )}

      {restaurants && restaurants.length > 0 && (
        <RestaurantGrid>
          {restaurants.map((restaurant) => (
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
                <RestaurantAddress>
                  <MapPin size={12} />
                  {restaurant.address}, {restaurant.city} - {restaurant.pincode}
                </RestaurantAddress>
              </RestaurantInfo>
            </RestaurantCard>
          ))}
        </RestaurantGrid>
      )}
    </Container>
  );
};

export default RestaurantList;
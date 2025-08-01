import React from 'react';
import styled from 'styled-components';
import { Package, Clock, CheckCircle } from 'lucide-react';

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

const EmptyOrders = styled.div`
  background: white;
  border-radius: 15px;
  padding: 60px 20px;
  text-align: center;
  color: #666;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
`;

const Orders: React.FC = () => {
  return (
    <Container>
      <Title>Your Orders</Title>
      <EmptyOrders>
        <EmptyIcon>📦</EmptyIcon>
        <h3>No orders yet</h3>
        <p>Start ordering from your favorite restaurants!</p>
      </EmptyOrders>
    </Container>
  );
};

export default Orders;
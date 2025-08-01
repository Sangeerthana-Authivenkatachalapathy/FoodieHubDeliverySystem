import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import styled, { createGlobalStyle } from 'styled-components';

import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';
import RestaurantList from './components/restaurants/RestaurantList';
import RestaurantDetail from './components/restaurants/RestaurantDetail';
import Cart from './components/cart/Cart';
import Orders from './components/orders/Orders';
import Profile from './components/profile/Profile';
import Header from './components/layout/Header';

// Global Styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f8f9fa;
    color: #333;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
  }

  input, textarea {
    font-family: inherit;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 80px; // Account for fixed header
`;

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Public Route Component (redirect to home if already authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Router>
            <GlobalStyle />
            <AppContainer>
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                } />
                <Route path="/register" element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                } />
                
                {/* Protected Routes */}
                <Route path="/*" element={
                  <ProtectedRoute>
                    <>
                      <Header />
                      <MainContent>
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/restaurants" element={<RestaurantList />} />
                          <Route path="/restaurants/:id" element={<RestaurantDetail />} />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/orders" element={<Orders />} />
                          <Route path="/profile" element={<Profile />} />
                          <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                      </MainContent>
                    </>
                  </ProtectedRoute>
                } />
              </Routes>
            </AppContainer>
          </Router>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

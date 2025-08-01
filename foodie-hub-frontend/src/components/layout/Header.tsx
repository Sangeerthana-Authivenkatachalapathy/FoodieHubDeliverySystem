import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ShoppingCart, User, LogOut, Menu, X, Home, Store, Package } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 0 20px;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: 700;
  color: #667eea;
  text-decoration: none;
  
  &:hover {
    color: #764ba2;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 30px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: #667eea;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const CartButton = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f8f9fa;
  color: #667eea;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: #667eea;
    color: white;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4757;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
`;

const UserMenu = styled.div`
  position: relative;
`;

const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background: #f8f9fa;
  }
`;

const UserName = styled.span`
  font-weight: 500;
  color: #333;
  
  @media (max-width: 480px) {
    display: none;
  }
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  min-width: 180px;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: translateY(${props => props.isOpen ? '0' : '-10px'});
  transition: all 0.3s ease;
  z-index: 1001;
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
  transition: background-color 0.3s ease;
  
  &:hover {
    background: #f8f9fa;
  }
  
  &:first-child {
    border-radius: 8px 8px 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transform: translateY(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease;
  z-index: 999;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileNavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  color: #666;
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    color: #667eea;
  }
`;

const Header: React.FC = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/login');
  };

  const handleProfileClick = () => {
    setUserMenuOpen(false);
    navigate('/profile');
  };

  const handleOrdersClick = () => {
    setUserMenuOpen(false);
    navigate('/orders');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <Logo to="/">🍔 FoodieHub</Logo>
          
          <Nav>
            <NavLink to="/">
              <Home size={18} />
              Home
            </NavLink>
            <NavLink to="/restaurants">
              <Store size={18} />
              Restaurants
            </NavLink>
            <NavLink to="/orders">
              <Package size={18} />
              Orders
            </NavLink>
          </Nav>
          
          <RightSection>
            <CartButton to="/cart">
              <ShoppingCart size={20} />
              {totalItems > 0 && <CartBadge>{totalItems}</CartBadge>}
            </CartButton>
            
            <UserMenu>
              <UserButton onClick={() => setUserMenuOpen(!userMenuOpen)}>
                <User size={20} />
                <UserName>{user?.name}</UserName>
              </UserButton>
              
              <DropdownMenu isOpen={userMenuOpen}>
                <DropdownItem onClick={handleProfileClick}>
                  <User size={16} />
                  Profile
                </DropdownItem>
                <DropdownItem onClick={handleOrdersClick}>
                  <Package size={16} />
                  Orders
                </DropdownItem>
                <DropdownItem onClick={handleLogout}>
                  <LogOut size={16} />
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UserMenu>
            
            <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </MobileMenuButton>
          </RightSection>
        </HeaderContent>
      </HeaderContainer>
      
      <MobileMenu isOpen={mobileMenuOpen}>
        <MobileNavLink to="/" onClick={closeMobileMenu}>
          <Home size={18} />
          Home
        </MobileNavLink>
        <MobileNavLink to="/restaurants" onClick={closeMobileMenu}>
          <Store size={18} />
          Restaurants
        </MobileNavLink>
        <MobileNavLink to="/orders" onClick={closeMobileMenu}>
          <Package size={18} />
          Orders
        </MobileNavLink>
      </MobileMenu>
    </>
  );
};

export default Header;
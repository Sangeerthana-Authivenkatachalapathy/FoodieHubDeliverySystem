import React from 'react';
import styled from 'styled-components';
import { User, Mail, Phone, MapPin, Edit } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Container = styled.div`
  max-width: 600px;
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

const ProfileCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: white;
  margin: 0 auto 15px;
`;

const UserName = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
`;

const UserRole = styled.p`
  color: #666;
  font-size: 14px;
`;

const ProfileInfo = styled.div`
  display: grid;
  gap: 20px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
`;

const InfoIcon = styled.div`
  color: #667eea;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.p`
  font-size: 12px;
  color: #999;
  margin-bottom: 2px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InfoValue = styled.p`
  font-size: 16px;
  color: #333;
  font-weight: 500;
`;

const EditButton = styled.button`
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Container>
        <Title>Profile</Title>
        <ProfileCard>
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <p>Unable to load profile information.</p>
          </div>
        </ProfileCard>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Profile</Title>
      <ProfileCard>
        <ProfileHeader>
          <Avatar>
            <User size={40} />
          </Avatar>
          <UserName>{user.name}</UserName>
          <UserRole>Customer</UserRole>
        </ProfileHeader>
        
        <ProfileInfo>
          <InfoItem>
            <InfoIcon>
              <Mail size={20} />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>Email</InfoLabel>
              <InfoValue>{user.email}</InfoValue>
            </InfoContent>
          </InfoItem>
          
          <InfoItem>
            <InfoIcon>
              <Phone size={20} />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>Phone</InfoLabel>
              <InfoValue>{user.phoneNumber}</InfoValue>
            </InfoContent>
          </InfoItem>
          
          <InfoItem>
            <InfoIcon>
              <MapPin size={20} />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>Address</InfoLabel>
              <InfoValue>{user.address}</InfoValue>
            </InfoContent>
          </InfoItem>
        </ProfileInfo>
        
        <EditButton onClick={() => alert('Edit profile functionality coming soon!')}>
          <Edit size={20} />
          Edit Profile
        </EditButton>
      </ProfileCard>
    </Container>
  );
};

export default Profile;
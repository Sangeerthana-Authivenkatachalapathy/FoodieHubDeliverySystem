import React, { useState } from 'react';
import styled from 'styled-components';
import { Phone, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 28px;
  font-weight: 700;
`;

const Subtitle = styled.p`
  text-align: center;
  margin-bottom: 30px;
  color: #666;
  font-size: 16px;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 15px 15px 50px;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SecondaryButton = styled(Button)`
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
  margin-top: 10px;

  &:hover:not(:disabled) {
    background: #667eea;
    color: white;
  }
`;

const ErrorMessage = styled.div`
  background: #fee;
  color: #c33;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 14px;
`;

const SuccessMessage = styled.div`
  background: #efe;
  color: #3c3;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 14px;
`;

const LinkText = styled.p`
  text-align: center;
  margin-top: 20px;
  color: #666;
  
  a {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  
  const { generateOtp, login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleGenerateOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (!phoneNumber.trim()) {
      return;
    }

    try {
      const otpCode = await generateOtp(phoneNumber);
      setGeneratedOtp(otpCode);
      setStep('otp');
      setOtpSent(true);
    } catch (error) {
      console.error('Failed to generate OTP:', error);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (!otp.trim()) {
      return;
    }

    try {
      await login(phoneNumber, otp);
      navigate('/');
    } catch (error) {
      console.error('Failed to verify OTP:', error);
    }
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setOtp('');
    setOtpSent(false);
    setGeneratedOtp('');
    clearError();
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Welcome to FoodieHub</Title>
        
        {step === 'phone' ? (
          <>
            <Subtitle>Enter your phone number to get started</Subtitle>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <form onSubmit={handleGenerateOtp}>
              <InputGroup>
                <InputIcon>
                  <Phone size={20} />
                </InputIcon>
                <Input
                  type="tel"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </InputGroup>
              
              <Button type="submit" disabled={isLoading || !phoneNumber.trim()}>
                {isLoading ? 'Sending...' : 'Send OTP'}
                <ArrowRight size={20} />
              </Button>
            </form>
          </>
        ) : (
          <>
            <Subtitle>Enter the OTP sent to {phoneNumber}</Subtitle>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {otpSent && !error && (
              <SuccessMessage>
                OTP sent successfully! Demo OTP: {generatedOtp}
              </SuccessMessage>
            )}
            
            <form onSubmit={handleVerifyOtp}>
              <InputGroup>
                <InputIcon>
                  <Lock size={20} />
                </InputIcon>
                <Input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={isLoading}
                  maxLength={6}
                  required
                />
              </InputGroup>
              
              <Button type="submit" disabled={isLoading || !otp.trim()}>
                {isLoading ? 'Verifying...' : 'Verify OTP'}
                <ArrowRight size={20} />
              </Button>
              
              <SecondaryButton type="button" onClick={handleBackToPhone} disabled={isLoading}>
                Back to Phone Number
              </SecondaryButton>
            </form>
          </>
        )}
        
        <LinkText>
          Don't have an account? <a href="/register">Sign up here</a>
        </LinkText>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
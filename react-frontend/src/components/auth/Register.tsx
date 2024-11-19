import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { getDeviceIdentifier } from '../../utils/deviceIdentifier';
import { useNavigate,Link } from 'react-router-dom';
import { CommonFormTextInput } from '../common/inputs';
import { CommonButtonSolidBlue } from '../common/buttons';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import ImageTitleSection from '../common/bannerheadings';
const Register: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [deviceIdentifier, setDeviceIdentifier] = useState('');
    const [lastKnownIP, setLastKnownIP] = useState('');
    const [userAgent, setUserAgent] = useState('');
    const [browserName, setBrowserName] = useState('');
    const [operatingSystem, setOperatingSystem] = useState('');
  
    useEffect(() => {
      const fetchAdditionalData = async () => {
        try {
          const identifier = await getDeviceIdentifier();
          const ua = navigator.userAgent;
          const ip = await fetchPublicIP();
          const browser = getBrowserName(ua);
          const os = getOSName(ua);
  
          setDeviceIdentifier(identifier);
          setUserAgent(ua);
          setLastKnownIP(ip);
          setBrowserName(browser);
          setOperatingSystem(os);
        } catch (error) {
          console.error('Failed to fetch device information:', error);
        }
      };
  
      fetchAdditionalData();
    }, []);
  
    const fetchPublicIP = async (): Promise<string> => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
      } catch (error) {
        console.error('Failed to fetch IP address:', error);
        return '';
      }
    };
  
    const getBrowserName = (userAgent: string): string => {
      if (userAgent.includes('Edg/')) return 'Microsoft Edge';
      if (userAgent.includes('Chrome/')) return 'Google Chrome';
      if (userAgent.includes('Firefox/')) return 'Mozilla Firefox';
      if (userAgent.includes('Safari/') && !userAgent.includes('Chrome/')) return 'Apple Safari';
      return 'Unknown';
    };
  
    const getOSName = (userAgent: string): string => {
      if (userAgent.includes('Windows')) return 'Windows';
      if (userAgent.includes('Mac')) return 'MacOS';
      if (userAgent.includes('Linux')) return 'Linux';
      if (userAgent.includes('Android')) return 'Android';
      if (userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
      return 'Unknown';
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        const formData = {
          username,
          email,
          password,
          phoneNumber,
          deviceIdentifier,
          lastKnownIP,
          userAgent,
          browserName,
          operatingSystem,
        };
      
        try {

           
          const response = await api.post(`/Auth/register`, formData);
      
          if (response.data.needsVerification) {
            navigate('/verify-otp', { state: { username } });
          } else {
            notification.success({
              message: 'Registration Successful',
              description: 'You have successfully registered.',
            });
            navigate('/login');
          }
        } catch (error) {
          if (error instanceof AxiosError && error.response) {
            const errorMessage = error.response.data.error || 'An error occurred while registering. Please try again.';
            notification.error({
              message: 'Registration Failed',
              description: errorMessage,
            });
          } else {
            notification.error({
              message: 'Registration Failed',
              description: 'Unable to connect to the server. Please try again.',
            });
          }
      
          console.error('Registration failed:', error);
        }
      };
      
    return (
      <div className="flex items-center justify-center min-h-screen bg-[color:var(--lightBackgroundColor)]">

        <div className="flex-col shadow-md p-6 bg-white rounded-md w-full max-w-md">
        <ImageTitleSection Title="Sign Up" />
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <CommonFormTextInput
              title="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <CommonFormTextInput
              title="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <CommonFormTextInput
              title="Password"
              name="password"
             
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <CommonFormTextInput
              title="Phone Number"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <CommonButtonSolidBlue type="submit" text="Register" />
            <div className="text-sm text-center">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-[color:var(--mainTitleColor)] hover:p-1 hover:text-[color:var(--primaryColor)]">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  };

 export default Register;

// src/components/Auth/Login.tsx
import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { getDeviceIdentifier } from '../../utils/deviceIdentifier';
import { useNavigate } from 'react-router-dom';
import { CommonFormTextInput } from '../common/inputs';
import {Link } from 'react-router-dom';
import { CommonButtonSolidBlue } from '../common/buttons';
import { notification } from 'antd';
import ImageTitleSection from '../common/bannerheadings';
import { isUserLoggedIn } from '../../utils/fetches';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [deviceIdentifier, setDeviceIdentifier] = useState('');
    const [lastKnownIP, setLastKnownIP] = useState('');
    const [userAgent, setUserAgent] = useState('');
    const [browserName, setBrowserName] = useState('');
    const [operatingSystem, setOperatingSystem] = useState('');

    useEffect(() => {
        const fetchAdditionalData = async () => {
            try {
                const identifier = await getDeviceIdentifier();
                const userAgent = navigator.userAgent;
                const lastKnownIP = await fetchPublicIP();
                const browserName = getBrowserName(userAgent);
                const operatingSystem = getOSName(userAgent);

                setDeviceIdentifier(identifier);
                setUserAgent(userAgent);
                setLastKnownIP(lastKnownIP);
                setBrowserName(browserName);
                setOperatingSystem(operatingSystem);
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
            password,
            deviceIdentifier,
            lastKnownIP,
            userAgent,
            browserName,
            operatingSystem,
        };
    
        try {
            const response = await api.post(`/Auth/login`, formData);
    
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                notification.success({
                    message: 'Login Successful',
                    description: 'You have been successfully logged in.',
                });

                navigate('/dashboard', { state: { username } });
            } else if (response.data.needsVerification) {
                notification.warning({
                    message: 'Verification Needed',
                    description: 'Redirecting to OTP verification.',
                });
                navigate('/verify-otp', { state: { username, needsVerification: true } });
            }
        } catch (error) {
            notification.error({
                message: 'Login Failed',
                description: 'Please check your credentials and try again.',
            });
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[color:var(--lightBackgroundColor)]">
            <div className="flex-col shadow-md p-6 bg-white rounded-md w-full max-w-md">
            <ImageTitleSection Title="Login" />
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <CommonFormTextInput
                        title="Username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required={true}
                    />
                    <CommonFormTextInput
                        title="Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={true}
                    />
                    <CommonButtonSolidBlue type="submit" text="Login" />
                    <div className="text-sm text-center">
                        Create an account?{' '}
                        <Link
                            to="/register"
                            className="font-semibold text-[color:var(--mainTitleColor)] hover:p-1 hover:text-[color:var(--primaryColor)]"
                        >
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default Login;

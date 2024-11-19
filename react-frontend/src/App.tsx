import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import TwoFactorAuth from './components/auth/TwoFactorAuth';
import Dashboard from './components/app/dashboard';
import { isUserLoggedIn } from './utils/fetches';


function App() {
    const navigate = useNavigate();
    useEffect(() => {
        if (isUserLoggedIn()) {
            navigate('/dashboard');
        }
    }, [navigate]);

    return (
        <div>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-otp" element={<TwoFactorAuth />} />
            </Routes>
        </div>
    );
}

export default App;

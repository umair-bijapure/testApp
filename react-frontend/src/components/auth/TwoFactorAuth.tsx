import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useLocation } from 'react-router-dom';
import { notification, Modal } from 'antd';
import { CommonFormTextInput } from '../common/inputs';
import { CommonButtonSolidBlue } from '../common/buttons';
import { useNavigate } from 'react-router-dom';
import ImageTitleSection from '../common/bannerheadings';
 
const TwoFactorAuth: React.FC = () => {
    const location = useLocation();
    const { username, needsVerification } = location.state || {}; // Destructure the username and needsVerification flag
    const [otp, setOtp] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const navigate = useNavigate();

    useEffect(() => {
        // Show the modal if needsVerification is true
        if (needsVerification) {
            setIsModalOpen(true);
        }
    }, [needsVerification]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !otp) {
            notification.error({
                message: 'Error',
                description: 'Username and OTP are required.',
            });
            return;
        }

        try {
            const response = await api.post(`/Auth/verify-otp`, {
                username,
                otp,
            });

            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);

                notification.success({
                    message: 'OTP Verified',
                    description: 'You have successfully verified your OTP.',
                });

                navigate('/dashboard', { state: { username } });
            } else {
                notification.error({
                    message: 'OTP Verification Failed',
                    description: 'Invalid OTP, please try again.',
                });
            }
        } catch (error) {
            notification.error({
                message: 'OTP Verification Failed',
                description: 'Please try again.',
            });
            console.error('OTP verification failed:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-light">
            <div className="flex-col shadow-md p-6 bg-white rounded-md w-full max-w-md">
            <ImageTitleSection Title="Verification : Otp has been succsefully sent to your registered email !!" />
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <CommonFormTextInput
                        title="Username"
                        value={username}
                        name="username"
                        onChange={handleChange}
                        required={true}
                    />
                    <CommonFormTextInput
                        title="OTP"
                        value={otp}
                        name="otp"
                        onChange={handleChange}
                        required={true}
                    />
                    <CommonButtonSolidBlue type="submit" text="Verify OTP" />
                </form>
            </div>

            {/* Modal Pop-Up for Needs Verification */}
            <Modal
                title="User Authentication"
                open={isModalOpen} // Open when needsVerification is true
                onOk={() => setIsModalOpen(false)} // Close on Ok
                onCancel={() => setIsModalOpen(false)} // Close on Cancel
                okText="Ok"
            >
                <p>User Id and Password Validated</p>
                <p>User has logged in from a new source.</p>
            </Modal>
        </div>
    );
};

export default TwoFactorAuth;

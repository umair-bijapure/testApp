import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification,Modal } from 'antd';
import { fetchUser, getLoggedInUserData } from '../../utils/fetches';
import { useLocation } from 'react-router-dom';
import { CommonButtonSolidBlue } from '../common/buttons';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username_2, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsername = async () => {
            const usernameFromToken = await getLoggedInUserData();
            setUsername(usernameFromToken);
        };

        fetchUsername();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (!token) {
            notification.error({
                message: 'Not Authenticated',
                description: 'You need to log in first.',
            });
            navigate('/login');
        } else if (username_2) {
            fetchUserData(username_2);
        }
    }, [username_2, navigate]);

    const fetchUserData = async (username: string) => {
        try {
            const response = await fetchUser(username);

            if (response) {
                setUserData(response);
                setIsModalOpen(true);
            } else {
                notification.error({
                    message: 'Error Fetching User Data',
                    description: response || 'Something went wrong.',
                });
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            notification.error({
                message: 'Error',
                description: 'Failed to fetch user data.',
            });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[color:var(--lightBackgroundColor)] px-4">
            <h1 className="text-4xl font-bold text-[color:var(--mainTitleColor)] mb-6">
                Welcome to Your Dashboard
            </h1>

            {userData ? (
                <div className="user-info bg-white p-6 shadow-lg rounded-lg max-w-md w-full">
                    <h2 className="text-2xl font-semibold text-[color:var(--primaryColor)] mb-4">
                        User Profile
                    </h2>
                    <div className="space-y-2">
                        <p>
                            <strong className="text-[color:var(--primaryColor)]">Username:</strong>{' '}
                            {userData.username}
                        </p>
                        <p>
                            <strong className="text-[color:var(--primaryColor)]">Email:</strong>{' '}
                            {userData.email}
                        </p>
                        <p>
                            <strong className="text-[color:var(--primaryColor)]">Phone:</strong>{' '}
                            {userData.phoneNumber}
                        </p>
                    </div>

                    <CommonButtonSolidBlue onClick={handleLogout} text="Logout" />
                </div>
            ) : (
                <p className="text-lg text-gray-600">Loading...</p>
            )}

            <Modal
                title="Login Successful"
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                okText="OK"
            >
                <p>User Id, Password and Hardware Key Validated</p>
            </Modal>
        </div>
    );
};




export default Dashboard;

import axios, { AxiosRequestConfig } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { api } from '../services/api';

interface StandardFetchInput {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  contentType: string;
  controller?: AbortController | null;
}


interface CommonProfileProps {
  userId: number;
  username: string;
  passwordHash: string;
  phoneNumber: string;
  email: string;
  deviceIdentifier: string;
  lastKnownIP: string;
  userAgent: string;
  operatingSystem: string;
  browserName: string;
  trustedDevice: boolean;
  lastLoginDate: Date;
}


export async function standardFetch<T>(input: StandardFetchInput): Promise<T> {
    const { url, method = 'GET', body, contentType, controller } = input;

    const headers: Record<string, string> = {
        'Content-Type': contentType,
    };

    const token = localStorage.getItem('token');
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    } else {
        console.warn('No token found, user may not be authenticated');
    }

    const config: AxiosRequestConfig = {
        url,
        method,
        headers,
        data: body,
        signal: controller?.signal,
    };

    try {
        const response = await api(config);
        return response.data as T;
    } catch (error: any) {
        if (error.response) {
            console.error('Axios error response:', error.response);
            throw error.response.data; 
        } else {
            console.error('Axios error:', error.message);
            throw new Error('An unexpected error occurred.');
        }
    }
}


type User = CommonProfileProps;
export const fetchUser = async (userId: string): Promise<User> => {
  return standardFetch<User>({
    url: `/User/getByUsername/${userId}`,
    contentType: 'application/json',
  });
};

export const fetchUserByEmail = async (userId: string): Promise<User> => {
    return standardFetch<User>({
      url: `/User/getByEmail/${userId}`,
      contentType: 'application/json',
    });
  };

export const isUserLoggedIn = () => {
    try {
        let token = localStorage.getItem('authToken');

        if (!token) {
         
            return false;
        }

     
        const decodedToken = jwtDecode<{ exp: number }>(token); 
        
    
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTime) {
          
            return false;
        }

        return true; 
    } catch (e) {
        console.error('Error decoding token:', e);
        return false;
    }
};

export const getLoggedInUserData = async (): Promise<string | null> => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            return null;
        }
        const decodedToken = jwtDecode<{ Username: string }>(token);
        console.log(decodedToken.Username, "Decoded Username");
        return decodedToken.Username || null;
    } catch (e) {
        console.error('Error decoding token or fetching user data:', e);
        return null;
    }
};


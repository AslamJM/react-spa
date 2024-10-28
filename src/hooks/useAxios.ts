// useAxios.ts

import { useEffect } from 'react';
import axios, { AxiosInstance } from 'axios';
import { useAuth } from './useAuth';
import { refreshAccessToken } from '@/api/auth';

const createAxiosInstance = (accessToken: string | null): AxiosInstance => {
    const instance = axios.create({
        baseURL: "http://localhost:3000/api",
        withCredentials: true,
    });

    // Attach access token to request headers
    instance.interceptors.request.use((config) => {
        if (accessToken && config.headers) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    });

    return instance;
};

export const useAxios = () => {
    const { state, logout } = useAuth();

    const axiosInstance = createAxiosInstance(state.token);

    useEffect(() => {
        const interceptor = axiosInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        await refreshAccessToken();
                        originalRequest.headers['Authorization'] = `Bearer ${state.token}`;
                        return axiosInstance(originalRequest);
                    } catch (refreshError) {
                        logout();
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosInstance.interceptors.response.eject(interceptor);
        };
    }, [logout, axiosInstance, state.token]);

    return axiosInstance;
};

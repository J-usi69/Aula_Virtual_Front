import axiosInstance from './axiosInstance';

export const login = (credentials) => {
  return axiosInstance.post('/auth/login', credentials);
};

export const logout = () => {
  return axiosInstance.post('/auth/logout');
}
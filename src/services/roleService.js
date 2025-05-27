import axios from './axiosInstance';


export const getRoles = async () => {
  const response = await axios.get('/roles/listar');
  return response.data;
};

import axiosInstance from "./axiosInstance";

export const getAdmins = async () => {
  const response = await axiosInstance.get('/users/listar_adminitrador');
  return response.data;
}


export const getAdminByName = async (name) => {
  const response = await axiosInstance.get(`/users/buscar?name=${name}`);
  return response.data;
}

export const createAdmin = async (adminData) => {
  const response = await axiosInstance.post('/users/guardar', adminData);
  return response.data;
}

export const updateAdmin = async (id, adminData) => {
  const response = await axiosInstance.put(`/users/actualizar/${id}`, adminData);
  return response.data;
};

export const patchAdmin = async (id, adminData) => {
  const response = await axiosInstance.patch(`/users/actualizar/${id}`, adminData);
  return response.data;
};

export const deleteAdmin = async (id) => {
  const response = await axiosInstance.delete(`/users/eliminar/${id}`);
  return response.data;
}

export const getAdminFoto = async (name) => {
  const response = await axiosInstance.get(`/users/uploads/${name}`);
  return response.data;
}
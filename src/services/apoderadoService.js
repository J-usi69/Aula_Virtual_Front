import axiosInstance from "./axiosInstance";

export const getApoderados = async () => {
  const response = await axiosInstance.get('apoderados/listar');
  return response.data;
}

export const createApoderado = async (apoderadoData) => {
  const response = await axiosInstance.post('apoderados/guardar', apoderadoData);
  return response.data;
}

export const updateApoderado = async (apoderadoData, id) => {
  const response = await axiosInstance.put(`apoderados/actualizar/${id}`, apoderadoData);
  return response.data;
}

export const patchApoderado = async (id, apoderadoData) => {
  const response = await axiosInstance.patch(`apoderados/actualizar/${id}`, apoderadoData);
  return response.data;
}

export const deleteApoderado = async (id) => {
  const response = await axiosInstance.delete(`apoderados/eliminar/${id}`);
  return response.data;
}
import axiosInstance from "./axiosInstance";

export const getDias = async () => {
  const response = await axiosInstance.get('dias/listar');
  return response.data;
}

export const getHorarios = async () => {
  const response = await axiosInstance.get('horario/listar');
  return response.data;
}

export const createHorario = async (horarioData) => {
  const response = await axiosInstance.post('horario/guardar', horarioData);
  return response.data;
}

export const updateHorario = async (horarioData, id) => {
  const response = await axiosInstance.put(`horario/actualizar/${id}`, horarioData);
  return response.data;
}

export const deleteHorario = async (id) => {
  const response = await axiosInstance.delete(`horario/eliminar/${id}`);
  return response.data;
}
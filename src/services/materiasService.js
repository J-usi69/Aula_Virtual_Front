import axiosInstance from "./axiosInstance";

export const getMaterias = async () => {
  const response = await axiosInstance.get('/materias/listar');
  return response.data;
}

export const createMateria = async (materiaData) => {
  const response = await axiosInstance.post('/materias/guardar', materiaData);
  return response.data;
}

export const updateMateria = async (materiaData, id) => {
  const response = await axiosInstance.put(`/materias/actualizar/${id}`, materiaData);
  return response.data;
}

export const deleteMateria = async (id) => {
  const response = await axiosInstance.delete(`/materias/eliminar/${id}`);
  return response.data;
}
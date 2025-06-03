import axiosInstance from "./axiosInstance";

export const getgestion = async () => {
  const response = await axiosInstance.get('gestion/listar_cursos_por_gestion');
  return response.data;
}

export const createGestion = async (gestionData) => {
  const response = await axiosInstance.post('gestion/guardar_curso_parelo', gestionData);
  return response.data;
}

export const updateGestion = async (gestionData, id) => {
  const response = await axiosInstance.put(`gestion/actualizar/${id}`, gestionData);
  return response.data;
}

export const patchGestion = async (id, gestionData) => {
  const response = await axiosInstance.patch(`gestion/actualizar/${id}`, gestionData);
  return response.data;
}

export const deleteGestion = async (id) => {
  const response = await axiosInstance.delete(`gestion/eliminar/${id}`);
  return response.data;
}

export const getCursosParalelos = async () => {
  const response = await axiosInstance.get('gestion/listar_cursos_paralelos');
  return response.data;
}
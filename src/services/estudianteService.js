import axiosInstance from "./axiosInstance";

export const getEstudiantes = async () => {
  const response = await axiosInstance.get('/estudiante/listar');
  return response.data;
}

export const getEstudianteByCI = async (ci) => {
  const response = await axiosInstance.get(`/estudiante/buscar?ci=${ci}`);
  return response.data;
}

export const createEstudiante = async (estudianteData) => {
  const response = await axiosInstance.post('/estudiante/guardar_user', estudianteData);
  return response.data;
}

export const updateEstudiante = async (id, estudianteData) => {
  const response = await axiosInstance.put(`/estudiante/actualizar_user/${id}`, estudianteData);
  return response.data;
};

export const patchEstudiante = async (id, estudianteData) => {
  const response = await axiosInstance.patch(`/estudiante/actualizar_user/${id}`, estudianteData);
  return response.data;
}

export const deleteEstudiante = async (id) => {
  const response = await axiosInstance.delete(`/estudiante/eliminar_definitivamente/${id}`);
  return response.data;
}


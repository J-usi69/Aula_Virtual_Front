import axiosInstance from "./axiosInstance";

export const getProfesor = async () => {
  const response = await axiosInstance.get('/profesores/listar');
  return response.data;
}


export const getProfesorByCI = async (ci) => {
  const response = await axiosInstance.get(`/profesores/buscar?ci=${ci}`);
  return response.data;
}

export const createProfesor = async (profesorData) => {
  const response = await axiosInstance.post('/profesores/guardar', profesorData);
  return response.data;
}

export const updateProfesor = async (id, profesorData) => {
  const response = await axiosInstance.put(`/profesores/actualizar/${id}`, profesorData);
  return response.data;
};

export const patchProfesor = async (id, profesorData) => {
  const response = await axiosInstance.patch(`/profesores/actualizar/${id}`, profesorData);
  return response.data;
}

export const deleteProfesor = async (id) => {
  const response = await axiosInstance.delete(`/profesores/eliminar/${id}`);
  return response.data;
}
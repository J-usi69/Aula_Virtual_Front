import axiosInstance from './axiosInstance';

export const getBoletas = async () => {
  const response = await axiosInstance.get('boleta/listar-boletas-por-gestion');
  return response.data;
}

export const createBoleta = async (boletaData) => {
  const response = await axiosInstance.post('boleta/registrar-boleta', boletaData);
  return response.data;
}

export const updateBoleta = async (id,boletaData) => {
  const response = await axiosInstance.put(`boleta/actualizar-boleta/${id}`, boletaData);
  return response.data;
}

export const deleteBoleta = async (id) => {
  const response = await axiosInstance.delete(`boleta/eliminar-boleta/${id}`);
  return response.data;
}

export const getBoletaGestioCursoParalelo = async () => {
  const response = await axiosInstance.get(`boleta/listar_gestion_paralelo`);
  return response.data;
}

export const getEstudianteByCI = async (ci) => {
  const response = await axiosInstance.get(`/estudiante/buscar?ci=${ci}`);
  return response.data;
}
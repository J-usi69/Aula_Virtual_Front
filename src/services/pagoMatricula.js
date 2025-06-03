import axiosInstance from "./axiosInstance"; 

export const getMatriculas = async () => {
  const response = await axiosInstance.get('pagos_matriculas/listar_todas_subgestiones');
  return response.data;
}

export const getSubgestiones = async () => {
  const response = await axiosInstance.get('pagos_matriculas/listar-subgestiones');
  return response.data;
}


export const getEstudianteByCI = async (ci) => {
  const response = await axiosInstance.get(`/estudiante/buscar?ci=${ci}`);
  return response.data;
}

export const createMatricula = async (matriculaData) => {
  const response = await axiosInstance.post('pagos_matriculas/guardar', matriculaData);
  return response.data;
}

export const deleteMatricula = async (id) => {
  const response = await axiosInstance.delete(`pagos_matriculas/eliminar/${id}`);
  return response.data;
}
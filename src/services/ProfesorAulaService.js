import axiosInstance from "./axiosInstance";

export const getProfesorGestion = async (id) => {
  const response = await axiosInstance.get('movil/listar_profesor_estructura/profesor/' + id);
  return response.data;
}

export const guardarAsistencia = async (asistenciaData) => {
  const response = await axiosInstance.post('asistencias/guardar', asistenciaData);
  return response.data;
}

export const actualizarAsistencia = async (id, asistenciaData) => {
  const response = await axiosInstance.put(`asistencias/actualizar/${id}`, asistenciaData);
  return response.data;
}

export const getAsistencia = async () => {
  const response = await axiosInstance.get('asistencias/listar');
  return response.data;
}

export const deleteAsistencia = async (id) => {
  const response = await axiosInstance.delete(`asistencias/eliminar/${id}`);
  return response.data;
}

export const getParticiones = async () => {
  const response = await axiosInstance.get(`participacion/listar`);
  return response.data;
}

export const guardarParticipacion = async (participacionData) => {
  const response = await axiosInstance.post('participacion/guardar', participacionData);
  return response.data;
}

export const actualizarParticipacion = async (id, participacionData) => {
  const response = await axiosInstance.put(`participacion/actualizar/${id}`, participacionData);
  return response.data;
}

export const deleteParticipacion = async (id) => {
  const response = await axiosInstance.delete(`participacion/eliminar/${id}`);
  return response.data;
}

export const getNotas = async () => {
  const response = await axiosInstance.get('gestion_notas/estructura-notas');
  return response.data;
}

export const guardarNota = async (notaData) => {
  const response = await axiosInstance.post('gestion_notas/guardar', notaData);
  return response.data;
}

export const actualizarNota = async (id, notaData) => {
  const response = await axiosInstance.put(`gestion_notas/actualizar/${id}`, notaData);
  return response.data;
}

export const deleteNota = async (id) => {
  const response = await axiosInstance.delete(`gestion_notas/eliminar/${id}`);
  return response.data;
}
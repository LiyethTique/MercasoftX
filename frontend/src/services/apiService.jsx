import axios from 'axios';

const API_URL = 'https://tu-backend-api.com'; // Cambia esto por tu API

export const obtenerRegistros = async (entidad) => {
  const response = await axios.get(`${API_URL}/${entidad}`);
  return response.data;
};

export const crearRegistro = async (entidad, registro) => {
  const response = await axios.post(`${API_URL}/${entidad}`, registro);
  return response.data;
};

export const actualizarRegistro = async (entidad, id, registro) => {
  const response = await axios.put(`${API_URL}/${entidad}/${id}`, registro);
  return response.data;
};

export const eliminarRegistro = async (entidad, id) => {
  const response = await axios.delete(`${API_URL}/${entidad}/${id}`);
  return response.data;
};
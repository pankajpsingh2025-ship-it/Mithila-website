import axios from "axios";

const BASE = process.env.REACT_APP_BACKEND_URL;
export const API = `${BASE}/api`;

export const createOrder = async (payload) => {
  const { data } = await axios.post(`${API}/orders`, payload);
  return data;
};

export const getOrder = async (id) => {
  const { data } = await axios.get(`${API}/orders/${id}`);
  return data;
};

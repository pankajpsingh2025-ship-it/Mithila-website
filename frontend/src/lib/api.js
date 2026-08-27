import axios from "axios";

const BASE = process.env.REACT_APP_BACKEND_URL;
export const API = `${BASE}/api`;

// Send/receive the httpOnly session cookie on every request.
axios.defaults.withCredentials = true;

export const createOrder = async (payload) => {
  const { data } = await axios.post(`${API}/orders`, payload);
  return data;
};

export const getOrder = async (id) => {
  const { data } = await axios.get(`${API}/orders/${id}`);
  return data;
};

// ----- Auth -----
export const authSession = async (sessionId) => {
  const { data } = await axios.post(`${API}/auth/session`, { session_id: sessionId });
  return data;
};

export const authMe = async () => {
  const { data } = await axios.get(`${API}/auth/me`);
  return data;
};

export const authLogout = async () => {
  const { data } = await axios.post(`${API}/auth/logout`, {});
  return data;
};

export const getMyOrders = async () => {
  const { data } = await axios.get(`${API}/my/orders`);
  return data;
};

export const subscribeNewsletter = async (email, source = "footer") => {
  const { data } = await axios.post(`${API}/newsletter`, { email, source });
  return data;
};

import axios from "axios";

const BASE = process.env.REACT_APP_BACKEND_URL || "";
export const API = `${BASE}/api`;

/**
 * The storefront currently ships WITHOUT a backend — ordering goes through
 * WhatsApp / Instagram / Facebook and online checkout is "coming soon". When
 * REACT_APP_BACKEND_URL is not set these helpers fail fast so their callers'
 * catch blocks handle it, and no request is made to a dead origin.
 */
export const backendConfigured = Boolean(BASE);
const ensureBackend = () => {
  if (!BASE) throw new Error("Backend is not configured");
};

// Send/receive the httpOnly session cookie on every request.
axios.defaults.withCredentials = true;

export const createOrder = async (payload) => {
  ensureBackend();
  const { data } = await axios.post(`${API}/orders`, payload);
  return data;
};

export const getOrder = async (id) => {
  ensureBackend();
  const { data } = await axios.get(`${API}/orders/${id}`);
  return data;
};

// ----- Auth -----
export const authSession = async (sessionId) => {
  ensureBackend();
  const { data } = await axios.post(`${API}/auth/session`, { session_id: sessionId });
  return data;
};

export const authMe = async () => {
  ensureBackend();
  const { data } = await axios.get(`${API}/auth/me`);
  return data;
};

export const authLogout = async () => {
  ensureBackend();
  const { data } = await axios.post(`${API}/auth/logout`, {});
  return data;
};

export const getMyOrders = async () => {
  ensureBackend();
  const { data } = await axios.get(`${API}/my/orders`);
  return data;
};

export const subscribeNewsletter = async (email, source = "footer") => {
  ensureBackend();
  const { data } = await axios.post(`${API}/newsletter`, { email, source });
  return data;
};

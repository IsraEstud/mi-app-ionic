import axios from "axios";

const BASE_DOMAIN = "https://api.riksiri.com/";

// ── Instancia para endpoints bajo /api/* ──────────────────────────────
const axiosRiksiri = axios.create({
  baseURL: `${BASE_DOMAIN}api/`,
  headers: { "Content-Type": "application/json" },
});

// ── Instancia para endpoints en la raíz del dominio (sin /api/) ───────
// Ej: GET https://api.riksiri.com/contenido
export const axiosRiksiriRoot = axios.create({
  baseURL: BASE_DOMAIN,
  headers: { "Content-Type": "application/json" },
});

// Interceptor JWT compartido (función reutilizable)
const addAuthToken = (config: any) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

axiosRiksiri.interceptors.request.use(addAuthToken);
axiosRiksiriRoot.interceptors.request.use(addAuthToken);

// Interceptor de respuesta para diagnóstico de 404
const handle404 = (error: any) => {
  if (error.response?.status === 404) {
    console.warn(
      `[Axios 404] Ruta no encontrada: ${error.config?.method?.toUpperCase()} ${error.config?.baseURL}${error.config?.url}`
    );
  }
  return Promise.reject(error);
};

axiosRiksiri.interceptors.response.use((r) => r, handle404);
axiosRiksiriRoot.interceptors.response.use((r) => r, handle404);

export default axiosRiksiri;

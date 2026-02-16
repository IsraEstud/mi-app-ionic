import axiosRiksiri from "@/api/axiosConfig";

export const AuthService = {
  // Método para registrar usuarios
  async register(userData: any) {
    try {
      const response = await axiosRiksiri.post("auth/register", userData);
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || "Error al registrarse";
    }
  },

  // Método para iniciar sesión
  async login(credentials: { email: string; password: string }) {
    try {
      const response = await axiosRiksiri.post("auth/login", credentials);
      // Guardamos el token que viene de la API
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || "Credenciales incorrectas";
    }
  },

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem("token");
  },
};

import { defineStore } from "pinia";
import { ref } from "vue";

export interface User {
  id?: number;
  perfil_id?: number;
  name?: string;
  email?: string;
  usuario: string;
  foto?: string;
  nivel?: string;
  section_id?: number;
}

export interface MenuItem {
  id: number;
  name: string;
  url: string;
  icon?: string;
  active?: string;
  sub?: MenuItem[];
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem("token"));
  const menu = ref<MenuItem[]>([]);
  const isAuthenticated = ref(!!token.value);

  function setAuth(data: { user: User; token: string; menu: MenuItem[] }) {
    localStorage.setItem("token", data.token);
    token.value = data.token;
    user.value = data.user;
    menu.value = data.menu;
    isAuthenticated.value = true;
  }

  function setUser(userData: User) {
    user.value = userData;
  }

  function clearAuth() {
    localStorage.removeItem("token");
    token.value = null;
    user.value = null;
    menu.value = [];
    isAuthenticated.value = false;
  }

  return { user, token, menu, isAuthenticated, setAuth, setUser, clearAuth };
});

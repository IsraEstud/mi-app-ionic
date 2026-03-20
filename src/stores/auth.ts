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
  active?: string;             // "yes" | "no"
  internal_name?: string | null;
  to?: string | null;          // componente/tipo de vista
  parent_id?: number | null;
  subActivePaths?: string;
  user_section_id?: number | null;
  sub?: MenuItem[];
}

export interface HomeSection {
  id: number;
  name: string;
  url: string;
  internal_name: string;
  to?: string;
  contenido?: string;          // HTML del contenido
  youtube?: string;
  parent_id?: number;
  order?: number;
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem("token"));
  const menu = ref<MenuItem[]>([]);
  const home = ref<HomeSection | null>(null);
  const isAuthenticated = ref(!!token.value);

  function setAuth(data: { user: User; token: string; menu: MenuItem[]; home?: HomeSection }) {
    localStorage.setItem("token", data.token);
    token.value = data.token;
    user.value = data.user;
    menu.value = data.menu;
    home.value = data.home ?? null;
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
    home.value = null;
    isAuthenticated.value = false;
  }

  return { user, token, menu, home, isAuthenticated, setAuth, setUser, clearAuth };
});

import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const isAuthenticated = ref(!!localStorage.getItem("token"));

  function setToken(token: string) {
    localStorage.setItem("token", token);
    isAuthenticated.value = true;
  }

  function clearAuth() {
    localStorage.removeItem("token");
    user.value = null;
    isAuthenticated.value = false;
  }

  return { user, isAuthenticated, setToken, clearAuth };
});

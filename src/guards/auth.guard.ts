import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const token = localStorage.getItem("token");
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isPublic = to.matched.some((record) => record.meta.public);

  if (requiresAuth && !token) {
    // Caso: Intenta entrar a dashboard sin haber hecho login
    next("/login");
  } else if (isPublic && token) {
    // Caso: Ya está logueado pero intenta volver al login (lo mandamos al dashboard)
    next("/dashboard");
  } else {
    // Caso: Todo legal, adelante
    next();
  }
};

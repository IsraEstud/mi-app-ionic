<template>
  <main-layout page-title="Dashboard Riksiri">
    <template #actions>
      <ion-button @click="handleLogout">
        <ion-icon slot="icon-only" :icon="logOutOutline"></ion-icon>
      </ion-button>
    </template>

    <div class="welcome-card">
      <h1>¡Bienvenido!</h1>
      <p>Has ingresado exitosamente al panel de control.</p>
      <p>Esta es una ruta protegida que solo ves si estás autenticado.</p>
    </div>

    <!-- Optional: Add more dashboard content here -->
    <ion-button
      expand="block"
      color="danger"
      @click="handleLogout"
      class="ion-margin-top"
    >
      Cerrar Sesión Segura
    </ion-button>
  </main-layout>
</template>

<script setup lang="ts">
import { IonButton, IonIcon } from "@ionic/vue";
import { logOutOutline } from "ionicons/icons";
import { useRouter } from "vue-router";
import { AuthService } from "@/services/auth.service";
import { useAuthStore } from "@/stores/auth";
import MainLayout from "@/layouts/MainLayout.vue";

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = () => {
  AuthService.logout();
  authStore.clearAuth();
  router.replace("/login");
};
</script>

<style scoped>
.welcome-card {
  text-align: center;
  margin-top: 2rem;
  padding: 20px;
  border-radius: 15px;
  background: var(--ion-color-light);
}
</style>

<template>
  <main-layout page-title="Dashboard Riksiri">
    <div class="welcome-card">
      <h1>¡Bienvenido!</h1>
      <p>Has ingresado exitosamente al panel de control.</p>
      <p>Esta es una ruta protegida que solo ves si estás autenticado.</p>
    </div>
  </main-layout>
</template>

<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
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

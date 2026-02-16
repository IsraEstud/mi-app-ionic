<template>
  <div class="brand-section">
    <div class="logo-circle">
      <ion-icon :icon="icon" class="logo-icon"></ion-icon>
    </div>
    <h1 class="brand-title">{{ title }}</h1>
    <p class="brand-subtitle">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
import { IonIcon } from "@ionic/vue";

defineProps<{
  title: string;
  subtitle: string;
  icon: string;
}>();
</script>

<style scoped>
.brand-section {
  text-align: center;
  margin-bottom: 30px;
}

.logo-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.logo-icon {
  font-size: 40px;
  color: white;
}

.brand-title {
  font-size: 32px;
  font-weight: 700;
  color: white;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
}

.brand-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

@media (max-width: 576px) {
  .logo-circle {
    width: 70px;
    height: 70px;
  }

  .logo-icon {
    font-size: 35px;
  }

  .brand-title {
    font-size: 28px;
  }
}
</style>

<template>
  <ion-page>
    <!-- Menu Lateral -->
    <ion-menu side="start" content-id="main-content" type="overlay">
      <ion-header>
        <ion-toolbar color="tertiary">
          <ion-title>Menú</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <!-- Perfil -->
        <div class="user-profile">
          <div class="avatar-container" @click="changeProfilePhoto">
            <ion-avatar class="user-avatar">
              <img
                v-if="userProfile?.foto"
                :src="userProfile.foto"
                alt="Foto de perfil"
              />
              <ion-icon
                v-else
                :icon="personCircleOutline"
                class="default-avatar"
              ></ion-icon>
            </ion-avatar>
            <div class="camera-overlay">
              <ion-icon :icon="cameraOutline"></ion-icon>
            </div>
          </div>
          <div class="user-info">
            <h3>{{ userProfile?.usuario || 'Usuario' }}</h3>
            <p>{{ userProfile?.email || '' }}</p>
          </div>
        </div>

        <!-- Opciones del Menu -->
        <ion-list lines="none">
          <ion-menu-toggle :auto-hide="false">
            <ion-item
              router-link="/dashboard"
              router-direction="root"
              detail
              :button="true"
            >
              <ion-icon slot="start" :icon="homeOutline"></ion-icon>
              <ion-label>Inicio</ion-label>
            </ion-item>
          </ion-menu-toggle>

          <ion-menu-toggle :auto-hide="false">
            <ion-item
              detail
              :button="true"
              @click="handleLogout"
            >
              <ion-icon slot="start" :icon="logOutOutline" color="danger"></ion-icon>
              <ion-label color="danger">Cerrar Sesión</ion-label>
            </ion-item>
          </ion-menu-toggle>
        </ion-list>
      </ion-content>
    </ion-menu>

    <!-- Pagina Principal -->
    <div class="ion-page" id="main-content">
      <!-- Header Global -->
      <ion-header>
        <ion-toolbar color="tertiary">
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>{{ pageTitle }}</ion-title>
          <ion-buttons slot="end">
            <slot name="actions"></slot>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <!-- Contenido Principal -->
      <ion-content class="ion-padding">
        <slot></slot>
      </ion-content>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonMenu,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonAvatar,
} from "@ionic/vue";
import {
  personCircleOutline,
  homeOutline,
  logOutOutline,
  cameraOutline,
} from "ionicons/icons";
import { useAuthStore } from "@/stores/auth";
import { AuthService } from "@/services/auth.service";
import { useCamera } from "@/composables/useCamera";

defineProps<{
  pageTitle?: string;
}>();

const router = useRouter();
const authStore = useAuthStore();
const { takePicture, isLoading } = useCamera();

const userProfile = computed(() => authStore.user);

const changeProfilePhoto = async () => {
  const photoPath = await takePicture();
  if (photoPath && authStore.user) {
    authStore.setUser({ ...authStore.user, foto: photoPath });
  }
};

const handleLogout = () => {
  AuthService.logout();
  authStore.clearAuth();
  router.replace("/login");
};
</script>

<style scoped>
.user-profile {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.avatar-container {
  position: relative;
  flex-shrink: 0;
  cursor: pointer;
}

.avatar-container:hover .camera-overlay {
  opacity: 1;
}

.camera-overlay {
  position: absolute;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.camera-overlay ion-icon {
  width: 14px;
  height: 14px;
  color: white;
}

.user-avatar {
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
}

.default-avatar {
  width: 64px;
  height: 64px;
  color: white;
}

.user-info h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.user-info p {
  margin: 4px 0 0;
  font-size: 14px;
  opacity: 0.85;
}
</style>

<template>
  <ion-page>
    <!-- ─── Menú Lateral ──────────────────────────────────────────── -->
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

        <!-- ── Menú dinámico desde la API ─────────────────────────── -->
        <ion-list lines="none" class="menu-list">

          <!-- Item de Inicio fijo -->
          <ion-menu-toggle :auto-hide="false">
            <ion-item
              router-link="/dashboard"
              router-direction="root"
              detail
              :button="true"
              class="menu-item-home"
            >
              <ion-icon slot="start" :icon="homeOutline" />
              <ion-label>Inicio</ion-label>
            </ion-item>
          </ion-menu-toggle>

          <!-- Separador -->
          <div class="menu-divider" />

          <!-- Ítems del menú de la API (con sub-ítems) -->
          <template v-for="parent in authMenu" :key="parent.id">

            <!-- Padre — actúa como encabezado/acordeón -->
            <ion-item
              :button="true"
              :detail="false"
              class="menu-parent"
              :class="{ 'menu-parent--open': openMenus.has(parent.id) }"
              @click="toggleMenu(parent.id)"
            >
              <ion-label>{{ parent.name }}</ion-label>
              <ion-icon
                :icon="openMenus.has(parent.id) ? chevronUpOutline : chevronDownOutline"
                slot="end"
                class="chevron-icon"
              />
            </ion-item>

            <!-- Sub-ítems (colapso animado) -->
            <div
              v-if="openMenus.has(parent.id)"
              class="submenu"
            >
              <ion-menu-toggle
                v-for="sub in parent.sub"
                :key="sub.id"
                :auto-hide="false"
              >
                <ion-item
                  :button="true"
                  :detail="false"
                  class="submenu-item"
                  :class="{
                    'submenu-item--active': currentSlug === sub.internal_name,
                    'submenu-item--done': sub.active === 'yes',
                  }"
                  @click="navigateTo(sub.internal_name)"
                >
                  <!-- Indicador de completado -->
                  <ion-icon
                    v-if="sub.active === 'yes'"
                    :icon="checkmarkCircle"
                    slot="start"
                    class="done-icon"
                  />
                  <div v-else class="dot" slot="start" />

                  <ion-label class="submenu-label">{{ sub.name }}</ion-label>
                </ion-item>
              </ion-menu-toggle>
            </div>

          </template>

          <!-- Separador -->
          <div class="menu-divider" />

          <!-- Logout -->
          <ion-menu-toggle :auto-hide="false">
            <ion-item
              detail
              :button="true"
              @click="handleLogout"
              class="menu-item-logout"
            >
              <ion-icon slot="start" :icon="logOutOutline" color="danger" />
              <ion-label color="danger">Cerrar Sesión</ion-label>
            </ion-item>
          </ion-menu-toggle>

        </ion-list>
      </ion-content>
    </ion-menu>

    <!-- ─── Página Principal ───────────────────────────────────────── -->
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
import { computed, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
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
  IonMenuToggle,
} from "@ionic/vue";
import {
  personCircleOutline,
  homeOutline,
  logOutOutline,
  cameraOutline,
  chevronDownOutline,
  chevronUpOutline,
  checkmarkCircle,
} from "ionicons/icons";
import { useAuthStore } from "@/stores/auth";
import { AuthService } from "@/services/auth.service";
import { useCamera } from "@/composables/useCamera";

defineProps<{
  pageTitle?: string;
}>();

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const { takePicture } = useCamera();

const userProfile = computed(() => authStore.user);
const authMenu = computed(() => authStore.menu);

// Slug activo para resaltar el ítem en el menú
const currentSlug = computed(() => route.params.slug as string | undefined);

// ── Acordeón: set de IDs de padres abiertos ──────────────────────────
const openMenus = ref<Set<number>>(new Set());

// Abrir automáticamente el padre que contiene el slug activo
const openParentOfCurrentSlug = () => {
  authStore.menu.forEach((parent) => {
    const hasCurrent = parent.sub?.some(
      (s) => s.internal_name === currentSlug.value
    );
    if (hasCurrent) openMenus.value.add(parent.id);
  });
};

watch(currentSlug, openParentOfCurrentSlug, { immediate: true });

const toggleMenu = (id: number) => {
  if (openMenus.value.has(id)) {
    openMenus.value.delete(id);
  } else {
    openMenus.value.add(id);
  }
  // Forzar reactividad
  openMenus.value = new Set(openMenus.value);
};

// ── Navegación ────────────────────────────────────────────────────────
const navigateTo = (internalName?: string | null) => {
  if (!internalName) return;
  router.push(`/seccion/${internalName}`);
};

// ── Foto de perfil ────────────────────────────────────────────────────
const changeProfilePhoto = async () => {
  const photoPath = await takePicture();
  if (photoPath && authStore.user) {
    authStore.setUser({ ...authStore.user, foto: photoPath });
  }
};

// ── Logout ────────────────────────────────────────────────────────────
const handleLogout = () => {
  AuthService.logout();
  authStore.clearAuth();
  router.replace("/login");
};
</script>

<style scoped>
/* ── Perfil ──────────────────────────────────────────────────────────── */
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

/* ── Menú ────────────────────────────────────────────────────────────── */
.menu-list {
  padding: 8px 0;
}

.menu-divider {
  height: 1px;
  background: var(--ion-color-light-shade);
  margin: 8px 16px;
}

.menu-item-home {
  --padding-start: 16px;
  font-weight: 500;
}

/* ── Ítem padre ──────────────────────────────────────────────────────── */
.menu-parent {
  --padding-start: 16px;
  --padding-end: 12px;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.3px;
  color: var(--ion-color-dark);
  --background: transparent;
  border-left: 3px solid transparent;
  transition: border-color 0.2s;
}

.menu-parent--open {
  border-left-color: var(--ion-color-tertiary);
  --background: rgba(102, 126, 234, 0.05);
}

.chevron-icon {
  font-size: 16px;
  color: var(--ion-color-medium);
  transition: transform 0.25s ease;
}

/* ── Sub-ítems ───────────────────────────────────────────────────────── */
.submenu {
  background: var(--ion-color-light, #f4f5f8);
}

.submenu-item {
  --padding-start: 20px;
  --padding-end: 12px;
  --min-height: 44px;
  font-size: 13px;
  --background: transparent;
  --color: var(--ion-color-medium);
  border-left: 3px solid transparent;
  transition: all 0.15s ease;
}

.submenu-item--active {
  border-left-color: var(--ion-color-tertiary);
  --background: rgba(102, 126, 234, 0.1);
  --color: var(--ion-color-tertiary);
  font-weight: 600;
}

.submenu-item--done {
  --color: var(--ion-color-success);
}

.submenu-label {
  font-size: 13px;
  white-space: normal;
  line-height: 1.3;
}

.done-icon {
  color: var(--ion-color-success);
  font-size: 16px;
  flex-shrink: 0;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--ion-color-medium-tint);
  flex-shrink: 0;
  margin-right: 4px;
}

/* ── Logout ──────────────────────────────────────────────────────────── */
.menu-item-logout {
  --padding-start: 16px;
}
</style>

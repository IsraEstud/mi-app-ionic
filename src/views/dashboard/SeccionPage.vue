<template>
  <main-layout :page-title="seccion?.name || 'Cargando...'">
    <!-- ── Cargando ─────────────────────────────────────────────── -->
    <div v-if="isLoading" class="state-container">
      <ion-spinner name="crescent" class="main-spinner" />
      <p class="state-text">Cargando sección…</p>
    </div>

    <!-- ── Error ───────────────────────────────────────────────── -->
    <div v-else-if="error" class="state-container error-state" id="error-seccion">
      <ion-icon :icon="alertCircleOutline" class="state-icon" />
      <p class="state-text">{{ error }}</p>
      <ion-button fill="outline" color="danger" size="small" @click="cargar">
        Reintentar
      </ion-button>
    </div>

    <!-- ── Contenido ───────────────────────────────────────────── -->
    <div v-else-if="seccion" class="seccion-body">

      <!-- Video de YouTube (opcional) -->
      <div v-if="youtubeEmbed" class="video-wrapper">
        <iframe
          :src="youtubeEmbed"
          title="Video de la sección"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="video-frame"
        />
      </div>

      <!-- Contenido HTML -->
      <div
        v-if="seccion.contenido"
        class="html-content"
        v-html="seccion.contenido"
      />

      <!-- Navegación: anterior / siguiente -->
      <div class="nav-actions">
        <ion-button
          v-if="prevSlug"
          fill="outline"
          color="medium"
          size="small"
          @click="goTo(prevSlug)"
        >
          <ion-icon :icon="chevronBackOutline" slot="start" />
          Anterior
        </ion-button>

        <ion-button
          v-if="nextSlug"
          fill="solid"
          color="tertiary"
          size="small"
          @click="goNext()"
        >
          Siguiente
          <ion-icon :icon="chevronForwardOutline" slot="end" />
        </ion-button>
      </div>
    </div>
  </main-layout>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  IonSpinner,
  IonIcon,
  IonButton,
} from "@ionic/vue";
import { SeccionService } from "@/services/seccion.service";
import {
  alertCircleOutline,
  chevronBackOutline,
  chevronForwardOutline,
} from "ionicons/icons";
import MainLayout from "@/layouts/MainLayout.vue";
import { useAuthStore } from "@/stores/auth";
import type { Seccion } from "@/types/seccion";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

// ── Estado ────────────────────────────────────────────────────────────
const seccion = ref<Seccion | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);

// ── Flat list de todos los subs del menú para prev/next ──────────────
const allSubs = computed(() => {
  return authStore.menu.flatMap((parent) => parent.sub ?? []);
});

const currentIndex = computed(() =>
  allSubs.value.findIndex(
    (s) => s.internal_name === route.params.slug
  )
);

const prevSlug = computed<string | null>(() => {
  const prev = allSubs.value[currentIndex.value - 1];
  return prev?.internal_name ?? null;
});

const nextSlug = computed<string | null>(() => {
  const next = allSubs.value[currentIndex.value + 1];
  return next?.internal_name ?? null;
});

// ── YouTube embed URL ─────────────────────────────────────────────────
const youtubeEmbed = computed(() => {
  const yt = seccion.value?.youtube;
  if (!yt) return null;
  // Convertir youtu.be/ID o watch?v=ID a embed URL
  const match =
    yt.match(/youtu\.be\/([^?&]+)/) ||
    yt.match(/[?&]v=([^&]+)/);
  if (match) return `https://www.youtube.com/embed/${match[1]}`;
  return null;
});

// ── Carga de datos ────────────────────────────────────────────────────
const cargar = async () => {
  const slug = route.params.slug as string;
  if (!slug) return;

  isLoading.value = true;
  error.value = null;
  seccion.value = null;

  try {
    seccion.value = await SeccionService.getBySlug(slug);
  } catch (err: any) {
    error.value = typeof err === "string" ? err : "No se pudo cargar la sección";
  } finally {
    isLoading.value = false;
  }
};

const goTo = (slug: string) => {
  router.push(`/seccion/${slug}`);
};

// Registra el progreso (fire-and-forget) y navega de inmediato
// No bloqueamos con await para no congelar el gesture handler del menú
const goNext = () => {
  if (!nextSlug.value || !seccion.value) return;
  SeccionService.seteasiguiente(seccion.value.id); // sin await intencional
  goTo(nextSlug.value);
};

// Recargar cuando cambia el slug (navegación entre secciones)
watch(() => route.params.slug, cargar);

onMounted(cargar);
</script>

<style scoped>
/* ── Estados ────────────────────────────────────────────────────────── */
.state-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 24px;
  gap: 14px;
  text-align: center;
}

.main-spinner {
  width: 48px;
  height: 48px;
  color: var(--ion-color-tertiary);
}

.state-icon {
  font-size: 52px;
  color: var(--ion-color-danger);
  opacity: 0.8;
}

.state-text {
  margin: 0;
  font-size: 15px;
  color: var(--ion-color-medium);
}

.error-state .state-text {
  color: var(--ion-color-danger);
}

/* ── Cuerpo de la sección ───────────────────────────────────────────── */
.seccion-body {
  padding-bottom: 32px;
}

/* ── Video ──────────────────────────────────────────────────────────── */
.video-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.video-frame {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

/* ── HTML renderizado desde la API ──────────────────────────────────── */
.html-content {
  font-size: 16px;
  line-height: 1.75;
  color: var(--ion-color-dark);
}

/* Estilos para los tags HTML que puede traer la API */
.html-content :deep(h1),
.html-content :deep(h2),
.html-content :deep(h3),
.html-content :deep(h4) {
  color: var(--ion-color-dark);
  font-weight: 700;
  margin: 1.2em 0 0.5em;
  line-height: 1.3;
}

.html-content :deep(h2) { font-size: 1.4rem; }
.html-content :deep(h3) { font-size: 1.2rem; }
.html-content :deep(h4) { font-size: 1rem; }

.html-content :deep(p) {
  margin: 0 0 1em;
}

.html-content :deep(ul),
.html-content :deep(ol) {
  padding-left: 1.4em;
  margin: 0 0 1em;
}

.html-content :deep(li) {
  margin-bottom: 0.4em;
}

.html-content :deep(strong) {
  font-weight: 700;
  color: var(--ion-color-dark);
}

.html-content :deep(img) {
  max-width: 100%;
  border-radius: 12px;
  margin: 8px 0;
}

/* ── Navegación prev/next ───────────────────────────────────────────── */
.nav-actions {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid var(--ion-color-light-shade);
}
</style>

<template>
  <main-layout page-title="Inicio">

    <!-- ── Hero ─────────────────────────────────────────────────────── -->
    <section class="hero">
      <div class="hero-top">
        <div class="hero-text">
          <span class="hero-greeting">¡Hola, {{ nombreUsuario }}! 👋</span>
          <h1 class="hero-title">Tu viaje<br>continúa aquí</h1>
          <p class="hero-sub">Sigue explorando y desbloqueando nuevos conocimientos sobre salud sexual y bienestar.</p>
        </div>
        <div class="hero-orb" aria-hidden="true">
          <span class="orb-emoji">🚀</span>
        </div>
      </div>

      <!-- Barra de progreso global -->
      <div class="progress-bar-wrap">
        <div class="progress-bar-header">
          <span class="progress-label">Progreso total</span>
          <span class="progress-pct">{{ totalPct }}%</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: totalPct + '%' }" />
        </div>
        <p class="progress-sub">{{ completedSubs }} de {{ totalSubs }} secciones completadas</p>
      </div>
    </section>

    <!-- ── Acceso rápido ──────────────────────────────────────────── -->
    <section v-if="homeSlug" class="quick-access">
      <ion-button
        expand="block"
        color="tertiary"
        class="resume-btn"
        @click="irAInicio"
      >
        <ion-icon :icon="playCircleOutline" slot="start" />
        Continuar desde el inicio
      </ion-button>
    </section>

    <!-- ── Estadísticas ───────────────────────────────────────────── -->
    <section class="stats-row">
      <div class="stat-card stat-card--purple">
        <span class="stat-icon">⭐</span>
        <span class="stat-value">{{ completedSubs }}</span>
        <span class="stat-label">Completadas</span>
      </div>
      <div class="stat-card stat-card--blue">
        <span class="stat-icon">📚</span>
        <span class="stat-value">{{ menu.length }}</span>
        <span class="stat-label">Módulos</span>
      </div>
      <div class="stat-card stat-card--pink">
        <span class="stat-icon">🔒</span>
        <span class="stat-value">{{ pendingSubs }}</span>
        <span class="stat-label">Pendientes</span>
      </div>
    </section>

    <!-- ── Módulos ────────────────────────────────────────────────── -->
    <section class="modules-section">
      <h2 class="section-title">Tus módulos</h2>

      <div
        v-for="(modulo, idx) in menu"
        :key="modulo.id"
        class="module-card"
      >
        <!-- Cabecera del módulo -->
        <div class="module-header">
          <div class="module-badge">{{ idx + 1 }}</div>
          <div class="module-info">
            <h3 class="module-name">{{ modulo.name }}</h3>
            <span class="module-count">
              {{ moduloCompletados(modulo) }}/{{ modulo.sub?.length ?? 0 }} secciones
            </span>
          </div>
          <div
            class="module-pct-badge"
            :class="moduloPct(modulo) === 100 ? 'badge--done' : ''"
          >
            {{ moduloPct(modulo) }}%
          </div>
        </div>

        <!-- Barra de progreso del módulo -->
        <div class="module-track">
          <div
            class="module-fill"
            :style="{ width: moduloPct(modulo) + '%' }"
            :class="moduloPct(modulo) === 100 ? 'fill--done' : ''"
          />
        </div>

        <!-- Primeras 3 secciones visibles como chips -->
        <div class="module-chips">
          <span
            v-for="sub in modulo.sub?.slice(0, 4)"
            :key="sub.id"
            class="chip"
            :class="sub.active === 'yes' ? 'chip--done' : 'chip--pending'"
          >
            {{ sub.active === 'yes' ? '✓' : '·' }} {{ sub.name }}
          </span>
          <span
            v-if="(modulo.sub?.length ?? 0) > 4"
            class="chip chip--more"
          >
            +{{ (modulo.sub?.length ?? 0) - 4 }} más
          </span>
        </div>
      </div>
    </section>

    <!-- ── Footer motivacional ────────────────────────────────────── -->
    <section class="motivational">
      <div class="motivational-inner">
        <span class="mot-emoji">💡</span>
        <p class="mot-text">"El conocimiento sobre tu cuerpo y tu sexualidad es un derecho. ¡Sigue aprendiendo!"</p>
      </div>
    </section>

  </main-layout>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { IonButton, IonIcon } from "@ionic/vue";
import { playCircleOutline } from "ionicons/icons";
import MainLayout from "@/layouts/MainLayout.vue";
import { useAuthStore } from "@/stores/auth";
import type { MenuItem } from "@/stores/auth";

const router  = useRouter();
const authStore = useAuthStore();

const nombreUsuario = computed(
  () => authStore.user?.name || authStore.user?.usuario || "Usuario"
);

const menu = computed(() => authStore.menu);
const homeSlug = computed(() => authStore.home?.internal_name ?? null);

// ── Cálculo de progreso global ────────────────────────────────────────
const totalSubs = computed(() =>
  menu.value.reduce((acc, m) => acc + (m.sub?.length ?? 0), 0)
);

const completedSubs = computed(() =>
  menu.value.reduce(
    (acc, m) => acc + (m.sub?.filter((s) => s.active === "yes").length ?? 0),
    0
  )
);

const pendingSubs = computed(() => totalSubs.value - completedSubs.value);

const totalPct = computed(() =>
  totalSubs.value === 0 ? 0 : Math.round((completedSubs.value / totalSubs.value) * 100)
);

// ── Progreso por módulo ───────────────────────────────────────────────
const moduloCompletados = (m: MenuItem) =>
  m.sub?.filter((s) => s.active === "yes").length ?? 0;

const moduloPct = (m: MenuItem) => {
  const total = m.sub?.length ?? 0;
  if (total === 0) return 0;
  return Math.round((moduloCompletados(m) / total) * 100);
};

// ── Navegación ────────────────────────────────────────────────────────
const irAInicio = () => {
  if (homeSlug.value) router.push(`/seccion/${homeSlug.value}`);
};
</script>

<style scoped>
/* ── Hero ─────────────────────────────────────────────────────────── */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 24px;
  padding: 28px 24px 24px;
  color: white;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: -40px;
  right: -40px;
  width: 160px;
  height: 160px;
  background: rgba(255,255,255,0.07);
  border-radius: 50%;
}

.hero-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 24px;
}

.hero-greeting {
  display: block;
  font-size: 13px;
  opacity: 0.85;
  margin-bottom: 6px;
  font-weight: 500;
}

.hero-title {
  margin: 0 0 10px;
  font-size: 28px;
  font-weight: 800;
  line-height: 1.15;
}

.hero-sub {
  margin: 0;
  font-size: 13px;
  opacity: 0.8;
  line-height: 1.5;
  max-width: 220px;
}

.hero-orb {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  background: rgba(255,255,255,0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
}

.orb-emoji {
  font-size: 30px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-6px); }
}

/* Barra de progreso global */
.progress-bar-wrap {
  background: rgba(255,255,255,0.12);
  border-radius: 14px;
  padding: 14px 16px;
}

.progress-bar-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.progress-label {
  font-size: 12px;
  opacity: 0.85;
  font-weight: 500;
}

.progress-pct {
  font-size: 14px;
  font-weight: 800;
}

.progress-track {
  width: 100%;
  height: 8px;
  background: rgba(255,255,255,0.25);
  border-radius: 99px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: white;
  border-radius: 99px;
  transition: width 0.6s cubic-bezier(.4,0,.2,1);
}

.progress-sub {
  margin: 8px 0 0;
  font-size: 11px;
  opacity: 0.7;
  text-align: right;
}

/* ── Acceso rápido ─────────────────────────────────────────────────── */
.quick-access {
  margin-bottom: 20px;
}

.resume-btn {
  --border-radius: 14px;
  height: 50px;
  font-size: 15px;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
}

/* ── Estadísticas ──────────────────────────────────────────────────── */
.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 28px;
}

.stat-card {
  border-radius: 16px;
  padding: 16px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-card--purple { background: #f0edff; }
.stat-card--blue   { background: #e8f4ff; }
.stat-card--pink   { background: #ffedf5; }

.stat-icon  { font-size: 22px; }

.stat-value {
  font-size: 22px;
  font-weight: 800;
  color: var(--ion-color-dark);
  line-height: 1;
}

.stat-label {
  font-size: 11px;
  color: var(--ion-color-medium);
  font-weight: 500;
  text-align: center;
}

/* ── Módulos ───────────────────────────────────────────────────────── */
.modules-section {
  margin-bottom: 24px;
}

.section-title {
  margin: 0 0 16px;
  font-size: 18px;
  font-weight: 700;
  color: var(--ion-color-dark);
}

.module-card {
  background: var(--ion-card-background, #fff);
  border-radius: 18px;
  padding: 18px 16px;
  margin-bottom: 14px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
}

.module-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.module-badge {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  font-weight: 800;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.module-info {
  flex: 1;
  min-width: 0;
}

.module-name {
  margin: 0 0 2px;
  font-size: 14px;
  font-weight: 700;
  color: var(--ion-color-dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.module-count {
  font-size: 11px;
  color: var(--ion-color-medium);
}

.module-pct-badge {
  padding: 4px 10px;
  border-radius: 20px;
  background: #f0edff;
  color: #764ba2;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
}

.badge--done {
  background: #e6f9f0;
  color: #2dd36f;
}

/* Barra de progreso del módulo */
.module-track {
  width: 100%;
  height: 6px;
  background: var(--ion-color-light-shade, #e5e5ea);
  border-radius: 99px;
  overflow: hidden;
  margin-bottom: 12px;
}

.module-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 99px;
  transition: width 0.5s ease;
}

.fill--done {
  background: linear-gradient(90deg, #2dd36f, #00b386);
}

/* Chips de secciones */
.module-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.chip {
  font-size: 11px;
  padding: 4px 9px;
  border-radius: 20px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
}

.chip--done    { background: #e6f9f0; color: #2dd36f; }
.chip--pending { background: var(--ion-color-light, #f4f5f8); color: var(--ion-color-medium); }
.chip--more    { background: #f0edff; color: #764ba2; max-width: none; }

/* ── Motivacional ──────────────────────────────────────────────────── */
.motivational {
  margin-bottom: 32px;
}

.motivational-inner {
  background: linear-gradient(135deg, #fff7ed, #fdf2ff);
  border-left: 4px solid #764ba2;
  border-radius: 14px;
  padding: 18px 16px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.mot-emoji {
  font-size: 24px;
  flex-shrink: 0;
  margin-top: 2px;
}

.mot-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--ion-color-dark);
  font-style: italic;
}
</style>

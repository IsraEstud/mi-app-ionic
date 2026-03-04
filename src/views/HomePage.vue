<template>
  <ion-page>
    <ion-header class="ion-no-border" :translucent="true">
      <ion-toolbar class="dashboard-toolbar">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Dashboard</ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon slot="icon-only" :icon="notificationsOutline"></ion-icon>
            <div class="notification-badge"></div>
          </ion-button>
          <ion-button class="profile-btn">
            <ion-avatar class="header-avatar">
              <img src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </ion-avatar>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="dashboard-content ion-padding">
      <div class="welcome-section">
        <div class="greeting">
          <h2>Hola, Chae 👋</h2>
          <p class="subtitle">Aquí tienes tu resumen del día</p>
        </div>
      </div>

      <!-- Stats Grid -->
      <ion-grid class="stats-grid ion-no-padding">
        <ion-row>
          <ion-col size="6" size-md="3">
            <ion-card class="stat-card gradient-primary">
              <ion-card-content>
                <div class="stat-icon">
                  <ion-icon :icon="peopleOutline"></ion-icon>
                </div>
                <div class="stat-value">1,204</div>
                <div class="stat-label">Usuarios</div>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col size="6" size-md="3">
            <ion-card class="stat-card gradient-success">
              <ion-card-content>
                <div class="stat-icon">
                  <ion-icon :icon="walletOutline"></ion-icon>
                </div>
                <div class="stat-value">$8,450</div>
                <div class="stat-label">Ingresos</div>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col size="6" size-md="3">
            <ion-card class="stat-card gradient-warning">
              <ion-card-content>
                <div class="stat-icon">
                  <ion-icon :icon="documentTextOutline"></ion-icon>
                </div>
                <div class="stat-value">42</div>
                <div class="stat-label">Pendientes</div>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col size="6" size-md="3">
            <ion-card class="stat-card gradient-danger">
              <ion-card-content>
                <div class="stat-icon">
                  <ion-icon :icon="statsChartOutline"></ion-icon>
                </div>
                <div class="stat-value">+14%</div>
                <div class="stat-label">Crecimiento</div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

      <!-- Quick Actions -->
      <div class="section-header">
        <h3>Acciones Rápidas</h3>
      </div>
      <div class="quick-actions">
        <div class="action-item">
          <div class="action-btn bg-soft-primary">
            <ion-icon :icon="addCircleOutline" color="primary"></ion-icon>
          </div>
          <span>Nuevo</span>
        </div>
        <div class="action-item">
          <div class="action-btn bg-soft-success">
            <ion-icon :icon="swapHorizontalOutline" color="success"></ion-icon>
          </div>
          <span>Transferir</span>
        </div>
        <div class="action-item">
          <div class="action-btn bg-soft-warning">
            <ion-icon :icon="receiptOutline" color="warning"></ion-icon>
          </div>
          <span>Facturas</span>
        </div>
        <div class="action-item">
          <div class="action-btn bg-soft-danger">
            <ion-icon :icon="helpCircleOutline" color="danger"></ion-icon>
          </div>
          <span>Ayuda</span>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="section-header">
        <h3>Actividad Reciente</h3>
        <ion-button fill="clear" size="small">Ver todo</ion-button>
      </div>
      <ion-list class="activity-list" lines="none">
        <ion-item class="activity-item">
          <div slot="start" class="activity-icon bg-soft-success">
            <ion-icon :icon="arrowDownOutline" color="success"></ion-icon>
          </div>
          <ion-label>
            <h2>Pago recibido</h2>
            <p>De Cliente Principal</p>
          </ion-label>
          <div slot="end" class="activity-meta">
            <span class="amount positive">+$1,500</span>
            <span class="time">Hace 2h</span>
          </div>
        </ion-item>

        <ion-item class="activity-item">
          <div slot="start" class="activity-icon bg-soft-primary">
            <ion-icon :icon="personAddOutline" color="primary"></ion-icon>
          </div>
          <ion-label>
            <h2>Nuevo usuario</h2>
            <p>María García se unió</p>
          </ion-label>
          <div slot="end" class="activity-meta">
            <span class="time">Hace 4h</span>
          </div>
        </ion-item>

        <ion-item class="activity-item">
          <div slot="start" class="activity-icon bg-soft-warning">
            <ion-icon :icon="alertCircleOutline" color="warning"></ion-icon>
          </div>
          <ion-label>
            <h2>Actualización del sistema</h2>
            <p>Versión 2.1 instalada</p>
          </ion-label>
          <div slot="end" class="activity-meta">
            <span class="time">Ayer</span>
          </div>
        </ion-item>
        
        <ion-item class="activity-item">
          <div slot="start" class="activity-icon bg-soft-danger">
            <ion-icon :icon="arrowUpOutline" color="danger"></ion-icon>
          </div>
          <ion-label>
            <h2>Suscripción renovada</h2>
            <p>Servicios Cloud</p>
          </ion-label>
          <div slot="end" class="activity-meta">
            <span class="amount negative">-$299</span>
            <span class="time">Ayer</span>
          </div>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonButtons, IonMenuButton, IonButton, IonIcon, IonAvatar,
  IonGrid, IonRow, IonCol, IonCard, IonCardContent,
  IonList, IonItem, IonLabel
} from '@ionic/vue';
import { 
  notificationsOutline, peopleOutline, walletOutline, documentTextOutline, 
  statsChartOutline, addCircleOutline, swapHorizontalOutline, receiptOutline, 
  helpCircleOutline, arrowDownOutline, arrowUpOutline, personAddOutline, 
  alertCircleOutline 
} from 'ionicons/icons';
</script>

<style scoped>
/* Base Theme Adjustments */
.dashboard-content {
  --background: #f4f5f8;
}

@media (prefers-color-scheme: dark) {
  .dashboard-content {
    --background: #121212;
  }
}

.dashboard-toolbar {
  --background: transparent;
  padding-top: 10px;
}

/* Header Elements */
.notification-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--ion-color-danger);
  border: 2px solid var(--ion-background-color, #fff);
}

.header-avatar {
  width: 32px;
  height: 32px;
  border: 2px solid var(--ion-color-primary);
}

/* Welcome Section */
.welcome-section {
  padding: 10px 5px 20px;
}

.greeting h2 {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 4px 0;
  letter-spacing: -0.5px;
}

.subtitle {
  color: var(--ion-color-medium);
  margin: 0;
  font-size: 15px;
}

/* Stats Grid */
.stats-grid {
  margin-bottom: 24px;
}

.stat-card {
  margin: 0;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  overflow: hidden;
  border: none;
}

.stat-card:active {
  transform: scale(0.95);
}

.stat-card::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  background: rgba(255,255,255,0.1);
  border-radius: 50%;
  transform: translate(30%, -30%);
}

.gradient-primary { background: linear-gradient(135deg, #4c8dff 0%, #1a65ff 100%); color: white; }
.gradient-success { background: linear-gradient(135deg, #2dd36f 0%, #1fb45a 100%); color: white; }
.gradient-warning { background: linear-gradient(135deg, #ffc409 0%, #e0a700 100%); color: white; }
.gradient-danger { background: linear-gradient(135deg, #eb445a 0%, #c42b40 100%); color: white; }

.stat-card ion-card-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.stat-icon {
  background: rgba(255,255,255,0.2);
  border-radius: 12px;
  padding: 8px;
  margin-bottom: 12px;
  display: inline-flex;
}

.stat-icon ion-icon {
  font-size: 20px;
  color: white;
}

.stat-value {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 13px;
  opacity: 0.9;
  font-weight: 500;
}

/* Sections */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 5px;
}

.section-header h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

/* Quick Actions */
.quick-actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  padding: 0 5px;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.action-btn {
  width: 56px;
  height: 56px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.action-btn:active {
  transform: scale(0.9);
}

.action-btn ion-icon {
  font-size: 24px;
}

.bg-soft-primary { background: rgba(var(--ion-color-primary-rgb), 0.1); }
.bg-soft-success { background: rgba(var(--ion-color-success-rgb), 0.1); }
.bg-soft-warning { background: rgba(var(--ion-color-warning-rgb), 0.1); }
.bg-soft-danger { background: rgba(var(--ion-color-danger-rgb), 0.1); }

.action-item span {
  font-size: 12px;
  font-weight: 500;
  color: var(--ion-color-medium-tint);
}

@media (prefers-color-scheme: dark) {
  .action-item span {
    color: var(--ion-color-light);
  }
}

/* Activity List */
.activity-list {
  background: transparent;
  padding: 0;
}

.activity-item {
  --background: var(--ion-background-color, #fff);
  --padding-start: 16px;
  --inner-padding-end: 16px;
  --min-height: 72px;
  margin-bottom: 12px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
}

.activity-icon ion-icon {
  font-size: 20px;
}

.activity-item h2 {
  font-weight: 600 !important;
  font-size: 15px !important;
  margin-bottom: 4px !important;
}

.activity-item p {
  font-size: 13px !important;
  color: var(--ion-color-medium) !important;
}

.activity-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.amount {
  font-weight: 600;
  font-size: 15px;
}

.amount.positive { color: var(--ion-color-success); }
.amount.negative { color: var(--ion-color-medium); }

.time {
  font-size: 12px;
  color: var(--ion-color-medium);
}
</style>

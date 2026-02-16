<template>
  <ion-page>
    <!-- Header Global -->
    <ion-header>
      <ion-toolbar color="tertiary">
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
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
} from "@ionic/vue";

defineProps<{
  pageTitle?: string;
}>();
</script>

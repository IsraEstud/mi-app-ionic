<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <div class="auth-wrapper">
        <div class="auth-box">
          <slot></slot>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
</script>

<style scoped>
ion-content {
  --background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.auth-wrapper {
  max-width: 440px;
  margin: 0 auto;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 0;
}

.auth-box {
  /* This container can be used if we want a common card style for all auth pages, 
     or we can leave the card styling to the specific page implementation (like in the original code, the form had the background). 
     For now, I'll leaving it as a wrapper. */
}
</style>

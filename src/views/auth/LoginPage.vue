<template>
  <auth-layout>
    <div class="login-container">
      <brand-header
        title="Bienvenido"
        subtitle="Inicia sesión para continuar"
        :icon="lockClosedOutline"
      />

      <!-- Formulario -->
      <form @submit.prevent="handleLogin" class="login-form">
        <base-input
          v-model="username"
          label="Usuario"
          type="text"
          placeholder="nombredeusuario"
          :icon="personOutline"
          autocomplete="username"
          :error="usernameError"
          @blur="validateUsernameField"
          :disabled="loading"
        />

        <base-input
          v-model="password"
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          :icon="lockClosedOutline"
          autocomplete="current-password"
          :error="passwordError"
          @blur="validatePasswordField"
          :disabled="loading"
        />

        <!-- Olvidé mi contraseña -->
        <div class="forgot-password">
          <ion-button
            fill="clear"
            size="small"
            router-link="/forgot-password"
            class="forgot-btn"
          >
            ¿Olvidaste tu contraseña?
          </ion-button>
        </div>

        <!-- Botón de Login -->
        <ion-button
          expand="block"
          type="submit"
          class="submit-button"
          :disabled="loading || !isFormValid"
        >
          <ion-spinner v-if="loading" name="crescent"></ion-spinner>
          <span v-else>Iniciar Sesión</span>
        </ion-button>

        <!-- Divider -->
        <div class="divider">
          <span>o</span>
        </div>

        <!-- Registro -->
        <ion-button
          expand="block"
          fill="outline"
          class="secondary-button"
          router-link="/register"
          :disabled="loading"
        >
          Crear una cuenta
        </ion-button>
      </form>
    </div>
  </auth-layout>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { IonButton, IonSpinner, } from "@ionic/vue";
import { personOutline, lockClosedOutline } from "ionicons/icons";

import AuthLayout from "@/layouts/AuthLayout.vue";
import BrandHeader from "@/components/common/BrandHeader.vue";
import BaseInput from "@/components/common/BaseInput.vue";

import { AuthService } from "@/services/auth.service";
import { useAuthStore } from "@/stores/auth";
import { useToast } from "@/composables/useToast";
import { useFormValidators } from "@/composables/useFormValidators";

// Utils
const router = useRouter();
const authStore = useAuthStore();
const { showToast } = useToast();
const { validateUsername, validatePassword } = useFormValidators();

// State
const username = ref("");
const password = ref("");
const loading = ref(false);

const usernameError = ref("");
const passwordError = ref("");

// Validation
const validateUsernameField = () => {
  const error = validateUsername(username.value);
  usernameError.value = error || "";
  return !error;
};

const validatePasswordField = () => {
  const error = validatePassword(password.value);
  passwordError.value = error || "";
  return !error;
};

const isFormValid = computed(() => {
  return (
    username.value.length > 0 &&
    password.value.length > 0 &&
    !usernameError.value &&
    !passwordError.value
  );
});

// Logic
const handleLogin = async () => {
  if (!validateUsernameField() || !validatePasswordField()) {
    return;
  }

  loading.value = true;

  try {
    const data = await AuthService.login({
      username: username.value,
      password: password.value,
    });

    authStore.setToken(data.token);
    await showToast("¡Inicio de sesión exitoso!", "success");
    router.push("/dashboard");
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Error al iniciar sesión. Verifica tus credenciales.";
    await showToast(errorMessage, "danger");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  padding: 0 20px;
}

.login-form {
  background: white;
  border-radius: 24px;
  padding: 32px 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

/* Forgot Password */
.forgot-password {
  text-align: right;
  margin: 4px 0 20px;
}

.forgot-btn {
  --color: #667eea;
  font-size: 14px;
  text-transform: none;
  font-weight: 500;
}

/* Buttons */
.submit-button {
  --background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --border-radius: 12px;
  height: 52px;
  font-size: 16px;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0.3px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
}

.secondary-button {
  --border-color: #667eea;
  --color: #667eea;
  --border-radius: 12px;
  height: 52px;
  font-size: 16px;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0.3px;
}

/* Divider */
.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0;
  color: #8f9bb3;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #e4e9f2;
}

.divider span {
  padding: 0 16px;
  font-size: 14px;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 576px) {
  .login-form {
    padding: 24px 20px;
  }
}
</style>

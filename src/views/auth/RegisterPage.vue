<template>
  <auth-layout>
    <!-- Header con botón de regreso -->
    <div class="header-section">
      <ion-button
        fill="clear"
        class="back-button"
        @click="router.push('/login')"
        :disabled="loading"
      >
        <ion-icon slot="icon-only" :icon="arrowBackOutline"></ion-icon>
      </ion-button>
    </div>

    <!-- Brand -->
    <brand-header
      title="Crear Cuenta"
      subtitle="Completa tus datos para comenzar"
      :icon="personAddOutline"
    />

    <!-- Formulario -->
    <div class="register-form-container">
      <form @submit.prevent="handleRegister" class="register-form">
        <!-- Nombre -->
        <base-input
          v-model="form.name"
          label="Nombre Completo"
          type="text"
          placeholder="Juan Pérez"
          :icon="personOutline"
          autocomplete="name"
          :error="nameError"
          @blur="validateNameField"
          :disabled="loading"
        />

        <!-- Email -->
        <base-input
          v-model="form.email"
          label="Email"
          type="email"
          placeholder="ejemplo@correo.com"
          :icon="mailOutline"
          autocomplete="email"
          :error="emailError"
          @blur="validateEmailField"
          :disabled="loading"
        />

        <!-- Contraseña -->
        <base-input
          v-model="form.password"
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          :icon="lockClosedOutline"
          autocomplete="new-password"
          :error="passwordError"
          @blur="validatePasswordField"
          @update:modelValue="checkPasswordStrength"
          :disabled="loading"
        />

        <!-- Indicador de fuerza de contraseña -->
        <div v-if="form.password.length > 0" class="password-strength">
          <div class="strength-label">
            <small>Seguridad de contraseña:</small>
            <small :class="`strength-${passwordStrength.level}`">
              {{ passwordStrength.text }}
            </small>
          </div>
          <div class="strength-bar">
            <div
              class="strength-fill"
              :class="`strength-${passwordStrength.level}`"
              :style="{ width: `${passwordStrength.percent}%` }"
            ></div>
          </div>
        </div>

        <!-- Confirmar Contraseña -->
        <base-input
          v-model="confirmPassword"
          label="Confirmar Contraseña"
          type="password"
          placeholder="••••••••"
          :icon="shieldCheckmarkOutline"
          autocomplete="new-password"
          :error="confirmPasswordError"
          @blur="validateConfirmPasswordField"
          :disabled="loading"
        />

        <!-- Términos y Condiciones -->
        <div class="terms-section">
          <ion-checkbox
            v-model="acceptedTerms"
            :disabled="loading"
            class="terms-checkbox"
          ></ion-checkbox>
          <ion-label class="terms-label">
            Acepto los
            <a href="#" @click.prevent="showTerms">Términos y Condiciones</a>
            y la
            <a href="#" @click.prevent="showPrivacy">Política de Privacidad</a>
          </ion-label>
        </div>
        <div v-if="termsError" class="error-message">
          <ion-text color="danger">
            <small>{{ termsError }}</small>
          </ion-text>
        </div>

        <!-- Botón de Registro -->
        <ion-button
          expand="block"
          type="submit"
          class="submit-button"
          :disabled="loading || !isFormValid"
        >
          <ion-spinner v-if="loading" name="crescent"></ion-spinner>
          <span v-else>Crear Cuenta</span>
        </ion-button>

        <!-- Divider -->
        <div class="divider">
          <span>¿Ya tienes cuenta?</span>
        </div>

        <!-- Login -->
        <ion-button
          expand="block"
          fill="outline"
          class="secondary-button"
          router-link="/login"
          :disabled="loading"
        >
          Iniciar Sesión
        </ion-button>
      </form>
    </div>
  </auth-layout>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import {
  IonButton,
  IonIcon,
  IonSpinner,
  IonText,
  IonLabel,
  IonCheckbox,
  alertController,
} from "@ionic/vue";
import {
  personOutline,
  mailOutline,
  lockClosedOutline,
  personAddOutline,
  arrowBackOutline,
  shieldCheckmarkOutline,
} from "ionicons/icons";

import AuthLayout from "@/layouts/AuthLayout.vue";
import BrandHeader from "@/components/common/BrandHeader.vue";
import BaseInput from "@/components/common/BaseInput.vue";

import { AuthService } from "@/services/auth.service";
import { useToast } from "@/composables/useToast";
import { useFormValidators } from "@/composables/useFormValidators";

// Utils
const router = useRouter();
const { showToast } = useToast();
const { validateEmail, validateName, validateConfirmPassword } =
  useFormValidators();

// State
const form = ref({
  name: "",
  email: "",
  password: "",
});
const confirmPassword = ref("");
const acceptedTerms = ref(false);
const loading = ref(false);

// Errors
const nameError = ref("");
const emailError = ref("");
const passwordError = ref("");
const confirmPasswordError = ref("");
const termsError = ref("");

// Password Strength
const passwordStrength = ref({
  level: "weak",
  text: "Débil",
  percent: 0,
});

// Validators Wrappers
const validateNameField = () => {
  const error = validateName(form.value.name);
  nameError.value = error || "";
  return !error;
};

const validateEmailField = () => {
  const error = validateEmail(form.value.email);
  emailError.value = error || "";
  return !error;
};

const validatePasswordField = () => {
  // Custom logic for stronger password requirement in registration if needed
  // Using the composable basic one for now, but adding the specific regex checks here to match original
  const password = form.value.password;
  if (!password) {
    passwordError.value = "La contraseña es requerida";
    return false;
  }
  if (password.length < 8) {
    passwordError.value = "Mínimo 8 caracteres";
    return false;
  }
  if (!/(?=.*[a-z])/.test(password)) {
    passwordError.value = "Debe contener al menos una minúscula";
    return false;
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    passwordError.value = "Debe contener al menos una mayúscula";
    return false;
  }
  if (!/(?=.*\d)/.test(password)) {
    passwordError.value = "Debe contener al menos un número";
    return false;
  }
  passwordError.value = "";
  return true;
};

const validateConfirmPasswordField = () => {
  const error = validateConfirmPassword(form.value.password, confirmPassword.value);
  confirmPasswordError.value = error || "";
  return !error;
};

const isFormValid = computed(() => {
  return (
    form.value.name.length > 0 &&
    form.value.email.length > 0 &&
    form.value.password.length > 0 &&
    confirmPassword.value.length > 0 &&
    acceptedTerms.value &&
    !nameError.value &&
    !emailError.value &&
    !passwordError.value &&
    !confirmPasswordError.value
  );
});

// Logic
const checkPasswordStrength = () => {
  const password = form.value.password;
  let strength = 0;

  if (password.length >= 8) strength += 25;
  if (password.length >= 12) strength += 25;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 20;
  if (/\d/.test(password)) strength += 15;
  if (/[^a-zA-Z\d]/.test(password)) strength += 15;

  if (strength <= 25) {
    passwordStrength.value = { level: "weak", text: "Débil", percent: 25 };
  } else if (strength <= 50) {
    passwordStrength.value = { level: "fair", text: "Regular", percent: 50 };
  } else if (strength <= 75) {
    passwordStrength.value = { level: "good", text: "Buena", percent: 75 };
  } else {
    passwordStrength.value = { level: "strong", text: "Fuerte", percent: 100 };
  }
};

const showTerms = async () => {
  const alert = await alertController.create({
    header: "Términos y Condiciones",
    message: "Aquí irían los términos y condiciones de tu aplicación.",
    buttons: ["Entendido"],
  });
  await alert.present();
};

const showPrivacy = async () => {
  const alert = await alertController.create({
    header: "Política de Privacidad",
    message: "Aquí iría la política de privacidad de tu aplicación.",
    buttons: ["Entendido"],
  });
  await alert.present();
};

const handleRegister = async () => {
  const isNameValid = validateNameField();
  const isEmailValid = validateEmailField();
  const isPasswordValid = validatePasswordField();
  const isConfirmValid = validateConfirmPasswordField();

  if (!acceptedTerms.value) {
    termsError.value = "Debes aceptar los términos y condiciones";
    return;
  } else {
    termsError.value = "";
  }

  if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmValid) {
    return;
  }

  loading.value = true;

  try {
    await AuthService.register(form.value);

    await showToast(
      "¡Cuenta creada con éxito! Ahora puedes iniciar sesión.",
      "success"
    );

    form.value = { name: "", email: "", password: "" };
    confirmPassword.value = "";
    acceptedTerms.value = false;

    setTimeout(() => {
      router.push("/login");
    }, 1500);
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Error al crear la cuenta. Intenta nuevamente.";
    await showToast(errorMessage, "danger");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.header-section {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
}

.back-button {
  --background: rgba(255, 255, 255, 0.2);
  --background-hover: rgba(255, 255, 255, 0.3);
  --color: white;
  --border-radius: 12px;
  width: 44px;
  height: 44px;
  backdrop-filter: blur(10px);
}

.register-form-container {
  padding: 0 20px;
}

.register-form {
  background: white;
  border-radius: 24px;
  padding: 28px 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

/* Password Strength */
.password-strength {
  padding: 8px 16px 16px;
}

.strength-label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  font-size: 13px;
  color: #8f9bb3;
}

.strength-weak { color: #eb445a; }
.strength-fair { color: #ffc409; }
.strength-good { color: #2dd36f; }
.strength-strong { color: #0cd1e8; }

.strength-bar {
  height: 4px;
  background: #e4e9f2;
  border-radius: 2px;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.strength-fill.strength-weak { background: #eb445a; }
.strength-fill.strength-fair { background: #ffc409; }
.strength-fill.strength-good { background: #2dd36f; }
.strength-fill.strength-strong { background: linear-gradient(90deg, #2dd36f, #0cd1e8); }

/* Terms */
.terms-section {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  margin-bottom: 8px;
}

.terms-checkbox {
  --size: 20px;
  --checkbox-background-checked: #667eea;
  margin-top: 2px;
  flex-shrink: 0;
}

.terms-label {
  font-size: 13px;
  color: #5e6d82;
  line-height: 1.5;
}

.terms-label a {
  color: #667eea;
  text-decoration: none;
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
  margin-bottom: 16px;
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

.error-message {
  padding: 4px 16px 8px;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Divider */
.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 16px 0;
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
</style>

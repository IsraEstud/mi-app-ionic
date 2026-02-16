<template>
  <div class="base-input-wrapper">
    <ion-item
      lines="none"
      class="input-item"
      :class="{
        'item-has-focus': isFocused,
        'ion-invalid': !!error,
      }"
    >
      <ion-icon
        v-if="icon"
        :icon="icon"
        slot="start"
        class="input-icon"
      ></ion-icon>
      
      <ion-input
        :value="modelValue"
        @ionInput="$emit('update:modelValue', $event.detail.value)"
        :type="inputType"
        :label="label"
        label-placement="floating"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        @ionFocus="handleFocus"
        @ionBlur="handleBlur"
        :disabled="disabled"
      ></ion-input>

      <ion-button
        v-if="type === 'password'"
        slot="end"
        fill="clear"
        size="small"
        @click="togglePasswordVisibility"
        :disabled="disabled"
        class="visibility-button"
      >
        <ion-icon
          :icon="isPasswordVisible ? eyeOffOutline : eyeOutline"
          slot="icon-only"
        ></ion-icon>
      </ion-button>
    </ion-item>

    <div v-if="error" class="error-message">
      <ion-text color="danger">
        <small>{{ error }}</small>
      </ion-text>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { IonItem, IonInput, IonIcon, IonButton, IonText } from "@ionic/vue";
import { eyeOutline, eyeOffOutline } from "ionicons/icons";

const props = defineProps<{
  modelValue: string;
  label: string;
  type?: any;
  placeholder?: string;
  icon?: string;
  error?: string;
  autocomplete?: any;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | null | undefined): void;
  (e: "focus"): void;
  (e: "blur"): void;
}>();

const isFocused = ref(false);
const isPasswordVisible = ref(false);

const inputType = computed(() => {
  if (props.type === "password") {
    return isPasswordVisible.value ? "text" : "password";
  }
  return props.type || "text";
});

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const handleFocus = () => {
  isFocused.value = true;
  emit("focus");
};

const handleBlur = () => {
  isFocused.value = false;
  emit("blur");
};
</script>

<style scoped>
.base-input-wrapper {
  margin-bottom: 8px;
}

.input-item {
  --background: #f7f8fa;
  --border-radius: 12px;
  --padding-start: 16px;
  --padding-end: 16px;
  --inner-padding-end: 8px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.input-item.item-has-focus {
  --background: #ffffff;
  box-shadow: 0 0 0 2px #667eea;
}

.input-item.ion-invalid {
  --background: #fff5f5;
  box-shadow: 0 0 0 2px #eb445a;
}

.input-icon {
  font-size: 20px;
  color: #667eea;
  margin-right: 12px;
}

ion-input {
  --padding-top: 14px;
  --padding-bottom: 14px;
  --color: #1a1a1a;
  --placeholder-color: #888888;
  font-size: 15px;
  min-height: 44px;
}

.visibility-button {
  --color: #8f9bb3;
}

/* Error Messages */
.error-message {
  padding: 4px 16px 4px;
  animation: slideDown 0.3s ease;
  min-height: 24px;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

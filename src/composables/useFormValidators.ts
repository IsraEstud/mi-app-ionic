export const useFormValidators = () => {
  const validateEmail = (email: string): string | null => {
    if (!email) return "El email es requerido";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Email inválido";
    return null;
  };

  const validatePassword = (password: string): string | null => {
    if (!password) return "La contraseña es requerida";
    if (password.length < 6) return "Mínimo 6 caracteres";
    return null;
  };

  const validateName = (name: string): string | null => {
    if (!name.trim()) return "El nombre es requerido";
    if (name.trim().length < 3) return "El nombre debe tener al menos 3 caracteres";
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) return "El nombre solo puede contener letras";
    return null;
  };

  const validateConfirmPassword = (password: string, confirm: string): string | null => {
    if (!confirm) return "Confirma tu contraseña";
    if (confirm !== password) return "Las contraseñas no coinciden";
    return null;
  };

  return {
    validateEmail,
    validatePassword,
    validateName,
    validateConfirmPassword,
  };
};

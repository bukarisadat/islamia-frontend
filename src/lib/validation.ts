export const validatePassword = (password: string, minLength = 10): string[] => {
  const errors: string[] = [];
  if (password.length < minLength) errors.push(`Must be at least ${minLength} characters`);
  if (!/[a-zA-Z]/.test(password)) errors.push("Must contain at least one letter");
  if (!/[0-9]/.test(password)) errors.push("Must contain at least one number");
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) errors.push("Must contain at least one special character");
  return errors;
};

export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

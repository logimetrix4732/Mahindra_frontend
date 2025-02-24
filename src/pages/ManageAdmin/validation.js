// validation.js

// Validation functions
export const validateRequired = (value) => !!value.trim();
export const validateEmail = (email) => {
  return !!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/);
};

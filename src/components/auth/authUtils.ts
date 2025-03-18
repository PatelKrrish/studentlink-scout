
import { USER_ROLES, VALIDATION } from '@/lib/constants';
import { UserRole } from '@/lib/types';

export interface AuthFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface AuthFormErrors {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export const validateLoginForm = (formData: Pick<AuthFormData, 'email' | 'password'>) => {
  const errors = {
    email: '',
    password: '',
  };
  let isValid = true;

  if (!VALIDATION.EMAIL_REGEX.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
    isValid = false;
  }

  if (formData.password.length === 0) {
    errors.password = 'Password is required';
    isValid = false;
  }

  return { isValid, errors };
};

export const validateRegisterForm = (formData: AuthFormData) => {
  const errors = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  };
  let isValid = true;

  if (!VALIDATION.EMAIL_REGEX.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
    isValid = false;
  }

  if (!VALIDATION.PASSWORD_REGEX.test(formData.password)) {
    errors.password = 'Password does not meet requirements';
    isValid = false;
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
    isValid = false;
  }

  if (formData.firstName.length < VALIDATION.NAME_MIN_LENGTH) {
    errors.firstName = 'First name is required';
    isValid = false;
  }

  if (formData.lastName.length < VALIDATION.NAME_MIN_LENGTH) {
    errors.lastName = 'Last name is required';
    isValid = false;
  }

  if (formData.role === USER_ROLES.STUDENT && !formData.email.endsWith('@imsnoida.com')) {
    errors.email = 'Students must use an IMS Noida email (@imsnoida.com)';
    isValid = false;
  }

  return { isValid, errors };
};

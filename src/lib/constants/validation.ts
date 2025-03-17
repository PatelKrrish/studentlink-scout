
// Form validation
export const VALIDATION = {
  EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  NAME_MIN_LENGTH: 2,
  PHONE_REGEX: /^\+?[0-9]{10,15}$/,
};

// Password requirements for display
export const PASSWORD_REQUIREMENTS = [
  { id: 'length', label: 'At least 8 characters', regex: /.{8,}/ },
  { id: 'lowercase', label: 'At least one lowercase letter', regex: /[a-z]/ },
  { id: 'uppercase', label: 'At least one uppercase letter', regex: /[A-Z]/ },
  { id: 'number', label: 'At least one number', regex: /\d/ },
  { id: 'special', label: 'At least one special character (@$!%*?&)', regex: /[@$!%*?&]/ },
];

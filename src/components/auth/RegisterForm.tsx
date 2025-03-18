
import React from 'react';
import { Input } from '@/components/ui/input';
import PasswordInput from './PasswordInput';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { USER_ROLES } from '@/lib/constants';
import { UserRole } from '@/lib/types';

interface RegisterFormProps {
  formData: {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    role: UserRole;
  };
  formErrors: {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  formData,
  formErrors,
  handleChange,
  handleSubmit,
  isLoading
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            error={!!formErrors.firstName}
            helperText={formErrors.firstName}
            required
          />
        </div>
        <div>
          <Input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            error={!!formErrors.lastName}
            helperText={formErrors.lastName}
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">I am a</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40"
        >
          <option value={USER_ROLES.STUDENT}>Student</option>
          <option value={USER_ROLES.RECRUITER}>Recruiter</option>
        </select>
      </div>
      <div>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          error={!!formErrors.email}
          helperText={formErrors.email}
          required
        />
      </div>
      <div>
        <PasswordInput
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          error={!!formErrors.password}
          helperText={formErrors.password}
          showRequirements={true}
          required
          showToggle={true}
        />
      </div>
      <div>
        <PasswordInput
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!formErrors.confirmPassword}
          helperText={formErrors.confirmPassword}
          required
          showToggle={false}
        />
      </div>
      <Button type="submit" disabled={isLoading} className="mt-2 w-full">
        <Mail className="w-4 h-4 mr-2" />
        {isLoading ? 'Loading...' : 'Register with Email'}
      </Button>
    </form>
  );
};

export default RegisterForm;

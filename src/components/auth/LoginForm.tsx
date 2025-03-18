
import React from 'react';
import { Input } from '@/components/ui/input';
import PasswordInput from './PasswordInput';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/constants';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LoginFormProps {
  formData: {
    email: string;
    password: string;
  };
  formErrors: {
    email: string;
    password: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  formData,
  formErrors,
  handleChange,
  handleSubmit,
  isLoading
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          showRequirements={false}
          required
          showToggle={true}
        />
      </div>
      <div className="text-right">
        <Link
          to={ROUTES.FORGOT_PASSWORD}
          className="text-sm font-medium text-primary hover:underline"
        >
          Forgot password?
        </Link>
      </div>
      <Button type="submit" disabled={isLoading} className="mt-2 w-full">
        <Mail className="w-4 h-4 mr-2" />
        {isLoading ? 'Loading...' : 'Login with Email'}
      </Button>
    </form>
  );
};

export default LoginForm;

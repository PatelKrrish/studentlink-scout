
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { USER_ROLES, ROUTES } from '@/lib/constants';
import { toast } from 'sonner';
import SocialLoginButtons from './SocialLoginButtons';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { AuthFormData, AuthFormErrors, validateLoginForm, validateRegisterForm } from './authUtils';

interface AuthFormProps {
  type: 'login' | 'register';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const navigate = useNavigate();
  const { login, register: registerUser, isLoading, error } = useAuth();

  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: USER_ROLES.STUDENT,
  });

  const [formErrors, setFormErrors] = useState<AuthFormErrors>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name in formErrors) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const validateForm = () => {
    if (type === 'login') {
      const { isValid, errors } = validateLoginForm(formData);
      setFormErrors({ ...formErrors, ...errors });
      return isValid;
    } else {
      const { isValid, errors } = validateRegisterForm(formData);
      setFormErrors(errors);
      return isValid;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (type === 'login') {
        try {
          await login(formData.email, formData.password);
          // Login successful, navigation will be handled by the auth context
        } catch (err) {
          // Login failed, but we don't need to navigate as the error will be displayed in the form
          console.error('Login error:', err);
        }
      } else {
        // For registration, force email verification before allowing signup
        try {
          const { data, error: signUpError } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
              data: {
                first_name: formData.firstName,
                last_name: formData.lastName,
                role: formData.role
              },
              emailRedirectTo: `${window.location.origin}/verify-email`
            }
          });
          
          if (signUpError) throw signUpError;
          
          if (data.user) {
            toast.success('Verification email sent. Please check your inbox.');
            navigate(ROUTES.VERIFY_EMAIL);
          }
        } catch (err: any) {
          console.error('Registration error:', err);
          toast.error(err.message || 'Registration failed');
        }
      }
    }
  };

  return (
    <Card className="w-full max-w-md animate-scale-in">
      <CardHeader>
        <CardTitle className="text-2xl">{type === 'login' ? 'Login' : 'Create an Account'}</CardTitle>
        <CardDescription>
          {type === 'login'
            ? 'Enter your credentials to access your account'
            : 'Fill out the form to create your account'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <SocialLoginButtons isLoading={isLoading} />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {type === 'login' ? (
            <LoginForm
              formData={formData}
              formErrors={formErrors}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
            />
          ) : (
            <RegisterForm
              formData={formData}
              formErrors={formErrors}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
            />
          )}
        </div>
      </CardContent>
      <CardFooter className="flex-col space-y-2">
        {error && <p className="text-sm text-destructive">{error}</p>}
        <p className="text-sm text-center text-muted-foreground">
          {type === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <Link
            to={type === 'login' ? ROUTES.REGISTER : ROUTES.LOGIN}
            className="font-medium text-primary hover:underline"
          >
            {type === 'login' ? 'Register' : 'Login'}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;

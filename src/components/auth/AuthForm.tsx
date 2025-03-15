import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { USER_ROLES, ROUTES, VALIDATION } from '@/lib/constants';
import type { UserRole } from '@/lib/types';

interface AuthFormProps {
  type: 'login' | 'register';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const navigate = useNavigate();
  const { login, register, isLoading, error } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: USER_ROLES.STUDENT as UserRole,
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user types
    if (name in formErrors) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    };
    let isValid = true;

    // Email validation
    if (!VALIDATION.EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    if (formData.password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
      newErrors.password = `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`;
      isValid = false;
    }

    // For registration, validate additional fields
    if (type === 'register') {
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
        isValid = false;
      }

      if (formData.firstName.length < VALIDATION.NAME_MIN_LENGTH) {
        newErrors.firstName = 'First name is required';
        isValid = false;
      }

      if (formData.lastName.length < VALIDATION.NAME_MIN_LENGTH) {
        newErrors.lastName = 'Last name is required';
        isValid = false;
      }

      // Special validation for student emails
      if (formData.role === USER_ROLES.STUDENT && !formData.email.endsWith('@college.edu')) {
        newErrors.email = 'Students must use a college email (@college.edu)';
        isValid = false;
      }
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (type === 'login') {
        await login(formData.email, formData.password);
        
        // If no error after login, navigate based on role
        if (!error) {
          navigate(ROUTES.HOME);
        }
      } else {
        await register(
          formData.email,
          formData.password,
          formData.firstName,
          formData.lastName,
          formData.role
        );
        
        // Redirect based on role after registration
        if (!error) {
          if (formData.role === USER_ROLES.STUDENT) {
            navigate(ROUTES.STUDENT_PROFILE);
          } else if (formData.role === USER_ROLES.RECRUITER) {
            navigate(ROUTES.RECRUITER_DASHBOARD);
          } else {
            navigate(ROUTES.HOME);
          }
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
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'register' && (
            <>
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
            </>
          )}
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
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
              required
            />
          </div>
          {type === 'register' && (
            <div>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!formErrors.confirmPassword}
                helperText={formErrors.confirmPassword}
                required
              />
            </div>
          )}
          <Button type="submit" disabled={isLoading} className="mt-2 w-full">
            {isLoading ? 'Loading...' : type === 'login' ? 'Login' : 'Register'}
          </Button>
        </form>
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

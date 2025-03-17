
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PasswordInput from './PasswordInput';
import { ROUTES, VALIDATION } from '@/lib/constants';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { KeyRound } from 'lucide-react';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the hash fragment from the URL (contains the access token)
  useEffect(() => {
    // Supabase automatically handles the hash fragment
    const handleHashFragment = async () => {
      const { error } = await supabase.auth.refreshSession();
      if (error) {
        console.error('Error refreshing session:', error);
        toast.error('Password reset link is invalid or has expired');
        navigate(ROUTES.LOGIN);
      }
    };

    handleHashFragment();
  }, [navigate]);

  const validatePassword = () => {
    setError('');

    if (!VALIDATION.PASSWORD_REGEX.test(password)) {
      setError('Password does not meet requirements');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword()) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) throw error;

      toast.success('Password has been reset successfully');
      navigate(ROUTES.LOGIN);
    } catch (err: any) {
      console.error('Error resetting password:', err);
      setError(err.message || 'Failed to reset password');
      toast.error('Failed to reset password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md animate-scale-in">
      <CardHeader>
        <CardTitle className="text-2xl">Create New Password</CardTitle>
        <CardDescription>
          Enter a new secure password for your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <PasswordInput
              name="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!error}
              showRequirements={true}
              required
            />
          </div>
          <div>
            <PasswordInput
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!error}
              helperText={error}
              required
            />
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full mt-2">
            <KeyRound className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResetPassword;

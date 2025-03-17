
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ROUTES, VALIDATION } from '@/lib/constants';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Mail, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!VALIDATION.EMAIL_REGEX.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setIsSuccess(true);
      toast.success('Password reset instructions sent to your email');
    } catch (err: any) {
      console.error('Error sending reset password email:', err);
      setError(err.message || 'Failed to send reset password email');
      toast.error('Failed to send reset password email');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md animate-scale-in">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Your Password</CardTitle>
        <CardDescription>
          {!isSuccess
            ? 'Enter your email and we will send you instructions to reset your password'
            : 'Check your email for password reset instructions'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!error}
                helperText={error}
                required
              />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              <Mail className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Sending...' : 'Send Reset Instructions'}
            </Button>
          </form>
        ) : (
          <div className="text-center space-y-4 my-6">
            <div className="bg-green-100 text-green-800 p-4 rounded-md">
              <p className="text-sm">
                We've sent password reset instructions to <strong>{email}</strong>. Please check your
                email and follow the instructions to reset your password.
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              If you don't see the email, check your spam folder.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link
          to={ROUTES.LOGIN}
          className="inline-flex items-center text-sm text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Login
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ForgotPassword;

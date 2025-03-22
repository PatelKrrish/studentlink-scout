
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { CheckCircle, XCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/auth';

const VerifyEmail = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleEmailVerification = async () => {
      try {
        // Check for token in URL
        const hashParams = new URLSearchParams(location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const type = hashParams.get('type');

        // If we have tokens in the URL, we need to set them
        if (accessToken && refreshToken && type === 'email_verification') {
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });
          
          if (sessionError) throw sessionError;
        }

        // Refresh the session to get the latest user data
        const { error: refreshError } = await supabase.auth.refreshSession();
        
        if (refreshError) {
          throw refreshError;
        }

        // Check if the user is now verified
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user?.email_confirmed_at) {
          setIsSuccess(true);
          toast.success('Email verified successfully');
        } else {
          setError('Email verification failed. The link may have expired.');
        }
      } catch (err: any) {
        console.error('Email verification error:', err);
        setError(err.message || 'Email verification failed');
        toast.error('Email verification failed');
      } finally {
        setIsVerifying(false);
      }
    };

    handleEmailVerification();
  }, [location.hash, navigate]);

  const goToLogin = () => {
    navigate(ROUTES.LOGIN);
  };

  const goToDashboard = () => {
    navigate(ROUTES.DASHBOARD);
  };

  const resendVerification = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user?.email) {
        throw new Error('No email found for current user');
      }

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: session.user.email,
      });

      if (error) throw error;

      toast.success('Verification email sent successfully');
    } catch (err: any) {
      console.error('Error sending verification email:', err);
      toast.error(err.message || 'Failed to send verification email');
    }
  };

  return (
    <Card className="w-full max-w-md animate-scale-in">
      <CardHeader>
        <CardTitle className="text-2xl">Email Verification</CardTitle>
        <CardDescription>
          {isVerifying 
            ? 'Verifying your email...' 
            : isSuccess 
              ? 'Your email has been verified successfully' 
              : 'There was a problem verifying your email'}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        {isVerifying ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Please wait while we verify your email...</p>
          </div>
        ) : isSuccess ? (
          <div className="space-y-4 py-4">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <p className="text-green-600">Your email has been verified successfully!</p>
            <Button onClick={user ? goToDashboard : goToLogin} className="mt-4">
              {user ? 'Go to Dashboard' : 'Continue to Login'}
            </Button>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <XCircle className="mx-auto h-16 w-16 text-destructive" />
            <p className="text-destructive">{error}</p>
            <div className="flex flex-col space-y-2 mt-4">
              <Button onClick={resendVerification} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Resend Verification Email
              </Button>
              <Button onClick={goToLogin} variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VerifyEmail;

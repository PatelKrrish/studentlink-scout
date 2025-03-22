
import { useState } from 'react';
import { StudentProfile, RecruiterProfile, UserRole } from '@/lib/types';
import { USER_ROLES } from '@/lib/constants';
import { toast } from 'sonner';
import { authService } from '@/services/auth-service';
import { profileService } from '@/services/profile-service';
import { supabase } from '@/integrations/supabase/client';
import { AuthState } from './types';

export const useAuthMethods = (state: AuthState, setState: React.Dispatch<React.SetStateAction<AuthState>>) => {
  const login = async (email: string, password: string) => {
    try {
      setState({ ...state, isLoading: true, error: null });

      // Try Supabase login first
      const { data: supabaseData, error: supabaseError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (supabaseError) {
        // Fall back to mock login if Supabase fails
        console.warn('Supabase login failed, falling back to mock authentication', supabaseError);
        const result = await authService.login(email, password);
        
        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(result.user));
        if (result.studentProfile) {
          localStorage.setItem('studentProfile', JSON.stringify(result.studentProfile));
        }
        if (result.recruiterProfile) {
          localStorage.setItem('recruiterProfile', JSON.stringify(result.recruiterProfile));
        }

        setState({
          user: result.user,
          studentProfile: result.studentProfile,
          recruiterProfile: result.recruiterProfile,
          isLoading: false,
          error: null,
        });
      } else {
        // Supabase login successful
        const user = {
          id: supabaseData.user?.id || '',
          email: supabaseData.user?.email || '',
          role: (supabaseData.user?.user_metadata?.role as UserRole) || USER_ROLES.STUDENT,
          firstName: supabaseData.user?.user_metadata?.firstName || '',
          lastName: supabaseData.user?.user_metadata?.lastName || '',
          createdAt: new Date(supabaseData.user?.created_at || Date.now()),
          verified: !!supabaseData.user?.email_confirmed_at,
        };
        
        localStorage.setItem('user', JSON.stringify(user));

        setState({
          user: user,
          isLoading: false,
          error: null,
        });
      }

      toast.success('Logged in successfully');
    } catch (error) {
      console.error('Login failed', error);
      setState({
        user: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to authenticate',
      });
      toast.error(error instanceof Error ? error.message : 'Authentication failed');
    }
  };

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: UserRole
  ) => {
    try {
      setState({ ...state, isLoading: true, error: null });

      // Try Supabase registration first
      const { data: supabaseData, error: supabaseError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            firstName,
            lastName,
            role
          }
        }
      });

      if (supabaseError) {
        // Fall back to mock registration if Supabase fails
        console.warn('Supabase registration failed, falling back to mock registration', supabaseError);
        const result = await authService.register(email, password, firstName, lastName, role);
        
        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(result.user));
        if (result.studentProfile) {
          localStorage.setItem('studentProfile', JSON.stringify(result.studentProfile));
        }
        if (result.recruiterProfile) {
          localStorage.setItem('recruiterProfile', JSON.stringify(result.recruiterProfile));
        }

        setState({
          user: result.user,
          studentProfile: result.studentProfile,
          recruiterProfile: result.recruiterProfile,
          isLoading: false,
          error: null,
        });
      } else {
        // Supabase registration successful
        const user = {
          id: supabaseData.user?.id || '',
          email: supabaseData.user?.email || '',
          role: (supabaseData.user?.user_metadata?.role as UserRole) || role,
          firstName: firstName,
          lastName: lastName,
          createdAt: new Date(supabaseData.user?.created_at || Date.now()),
          verified: !!supabaseData.user?.email_confirmed_at,
        };
        
        localStorage.setItem('user', JSON.stringify(user));

        setState({
          user: user,
          isLoading: false,
          error: null,
        });

        // If email confirmation is required, show message
        if (!supabaseData.user?.email_confirmed_at) {
          toast.info('Please check your email to verify your account');
        }
      }

      toast.success('Registration successful');
    } catch (error) {
      console.error('Registration failed', error);
      setState({
        ...state,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to register',
      });
      toast.error(error instanceof Error ? error.message : 'Registration failed');
    }
  };

  const logout = async () => {
    try {
      // Try Supabase logout first
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Supabase logout error', error);
    } finally {
      // Clear local storage regardless of Supabase result
      localStorage.removeItem('user');
      localStorage.removeItem('studentProfile');
      localStorage.removeItem('recruiterProfile');
      
      setState({ user: null, isLoading: false, error: null });
      toast.success('Logged out successfully');
    }
  };

  return { login, register, logout };
};

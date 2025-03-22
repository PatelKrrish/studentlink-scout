import React, { useState, useEffect } from 'react';
import { User, StudentProfile, RecruiterProfile, UserRole } from '@/lib/types';
import { USER_ROLES } from '@/lib/constants';
import { toast } from 'sonner';
import { authService } from '@/services/auth-service';
import { profileService } from '@/services/profile-service';
import { AuthContext } from './AuthContext';
import { AuthState } from './types';
import { supabase } from '@/integrations/supabase/client';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        // Get current session from Supabase
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // We have a Supabase session, update local state
          const user = {
            id: session.user.id,
            email: session.user.email || '',
            role: (session.user.user_metadata?.role as UserRole) || USER_ROLES.STUDENT,
            firstName: session.user.user_metadata?.firstName || '',
            lastName: session.user.user_metadata?.lastName || '',
            createdAt: new Date(session.user.created_at),
            verified: !!session.user.email_confirmed_at,
          };
          
          // Store in localStorage for compatibility with existing code
          localStorage.setItem('user', JSON.stringify(user));
          
          // Set the user in state
          setState({
            user: user,
            isLoading: false,
            error: null,
          });
        } else {
          // No Supabase session, check local storage as fallback
          const storedUser = localStorage.getItem('user');
          const storedStudentProfile = localStorage.getItem('studentProfile');
          const storedRecruiterProfile = localStorage.getItem('recruiterProfile');

          if (storedUser) {
            setState({
              user: JSON.parse(storedUser),
              studentProfile: storedStudentProfile ? JSON.parse(storedStudentProfile) : undefined,
              recruiterProfile: storedRecruiterProfile ? JSON.parse(storedRecruiterProfile) : undefined,
              isLoading: false,
              error: null,
            });
          } else {
            setState({ user: null, isLoading: false, error: null });
          }
        }
      } catch (error) {
        console.error('Failed to load user from session or localStorage', error);
        setState({ user: null, isLoading: false, error: 'Failed to authenticate' });
      }
    };

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        
        if (event === 'SIGNED_IN' && session?.user) {
          // User signed in
          const user = {
            id: session.user.id,
            email: session.user.email || '',
            role: (session.user.user_metadata?.role as UserRole) || USER_ROLES.STUDENT,
            firstName: session.user.user_metadata?.firstName || '',
            lastName: session.user.user_metadata?.lastName || '',
            createdAt: new Date(session.user.created_at),
            verified: !!session.user.email_confirmed_at,
          };
          
          localStorage.setItem('user', JSON.stringify(user));
          
          setState(prevState => ({
            ...prevState,
            user: user,
            isLoading: false,
            error: null,
          }));
          
          toast.success('Logged in successfully');
        } else if (event === 'SIGNED_OUT') {
          // User signed out
          localStorage.removeItem('user');
          localStorage.removeItem('studentProfile');
          localStorage.removeItem('recruiterProfile');
          
          setState({ user: null, isLoading: false, error: null });
          
          toast.success('Logged out successfully');
        } else if (event === 'USER_UPDATED') {
          // User data updated (e.g. email verified)
          if (session?.user) {
            const updatedUser = {
              id: session.user.id,
              email: session.user.email || '',
              role: (session.user.user_metadata?.role as UserRole) || USER_ROLES.STUDENT,
              firstName: session.user.user_metadata?.firstName || '',
              lastName: session.user.user_metadata?.lastName || '',
              createdAt: new Date(session.user.created_at),
              verified: !!session.user.email_confirmed_at,
            };
            
            localStorage.setItem('user', JSON.stringify(updatedUser));
            
            setState(prevState => ({
              ...prevState,
              user: updatedUser,
              isLoading: false,
              error: null,
            }));
          }
        }
      }
    );

    loadUser();

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

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

  const updateStudentProfile = async (profile: Partial<StudentProfile> & { id: string }) => {
    try {
      setState({ ...state, isLoading: true });

      const updatedProfile = await profileService.updateStudentProfile(profile);
      localStorage.setItem('studentProfile', JSON.stringify(updatedProfile));

      setState({
        ...state,
        studentProfile: updatedProfile,
        isLoading: false,
      });

      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Profile update failed', error);
      setState({ 
        ...state, 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to update profile' 
      });
      toast.error(error instanceof Error ? error.message : 'Failed to update profile');
    }
  };

  const updateRecruiterProfile = async (profile: Partial<RecruiterProfile> & { id: string }) => {
    try {
      setState({ ...state, isLoading: true });

      const updatedProfile = await profileService.updateRecruiterProfile(profile);
      localStorage.setItem('recruiterProfile', JSON.stringify(updatedProfile));

      setState({
        ...state,
        recruiterProfile: updatedProfile,
        isLoading: false,
      });

      toast.success('Company profile updated successfully');
    } catch (error) {
      console.error('Profile update failed', error);
      setState({ 
        ...state, 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to update company profile' 
      });
      toast.error(error instanceof Error ? error.message : 'Failed to update company profile');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        updateStudentProfile,
        updateRecruiterProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

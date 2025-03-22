
import { useState, useEffect } from 'react';
import { User } from '@/lib/types';
import { AuthState } from './types';
import { supabase } from '@/integrations/supabase/client';

export const useAuthSession = () => {
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
        
        console.log('Initial session check:', session ? 'Session found' : 'No session');
        
        if (session?.user) {
          // We have a Supabase session, update local state
          const user = {
            id: session.user.id,
            email: session.user.email || '',
            role: session.user.user_metadata?.role || 'student',
            firstName: session.user.user_metadata?.firstName || '',
            lastName: session.user.user_metadata?.lastName || '',
            createdAt: new Date(session.user.created_at),
            verified: !!session.user.email_confirmed_at,
          };
          
          console.log('User verification status:', !!session.user.email_confirmed_at);
          
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
            role: session.user.user_metadata?.role || 'student',
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
        } else if (event === 'SIGNED_OUT') {
          // User signed out
          localStorage.removeItem('user');
          localStorage.removeItem('studentProfile');
          localStorage.removeItem('recruiterProfile');
          
          setState({ user: null, isLoading: false, error: null });
        } else if (event === 'USER_UPDATED') {
          // User data updated (e.g. email verified)
          if (session?.user) {
            const updatedUser = {
              id: session.user.id,
              email: session.user.email || '',
              role: session.user.user_metadata?.role || 'student',
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

  return { state, setState };
};


import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User, StudentProfile, RecruiterProfile, UserRole } from '../lib/types';
import { USER_ROLES } from '../lib/constants';
import { toast } from 'sonner';
import { authService, profileService } from '../services/api';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string, role: UserRole) => Promise<void>;
  logout: () => void;
  updateStudentProfile: (profile: Partial<StudentProfile>) => Promise<void>;
  updateRecruiterProfile: (profile: Partial<RecruiterProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = localStorage.getItem('user');
        const studentProfile = localStorage.getItem('studentProfile');
        const recruiterProfile = localStorage.getItem('recruiterProfile');

        if (user) {
          setState({
            user: JSON.parse(user),
            studentProfile: studentProfile ? JSON.parse(studentProfile) : undefined,
            recruiterProfile: recruiterProfile ? JSON.parse(recruiterProfile) : undefined,
            isLoading: false,
            error: null,
          });
        } else {
          setState({ user: null, isLoading: false, error: null });
        }
      } catch (error) {
        console.error('Failed to load user from localStorage', error);
        setState({ user: null, isLoading: false, error: 'Failed to authenticate' });
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setState({ ...state, isLoading: true, error: null });

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

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('studentProfile');
    localStorage.removeItem('recruiterProfile');
    
    setState({ user: null, isLoading: false, error: null });
    toast.success('Logged out successfully');
  };

  const updateStudentProfile = async (profile: Partial<StudentProfile>) => {
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

  const updateRecruiterProfile = async (profile: Partial<RecruiterProfile>) => {
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

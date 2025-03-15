
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User, StudentProfile, RecruiterProfile, UserRole } from '../lib/types';
import { USER_ROLES } from '../lib/constants';
import { toast } from 'sonner';

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

  // Load user from localStorage on mount
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

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo purposes, just check if it's a predefined user
      if (email === 'student@college.edu' && password === 'password') {
        const user: User = {
          id: 'usr1',
          email: 'student@college.edu',
          role: USER_ROLES.STUDENT,
          firstName: 'John',
          lastName: 'Smith',
          createdAt: new Date(),
          verified: true,
        };

        const studentProfile = {
          id: '1',
          userId: 'usr1',
          firstName: 'John',
          lastName: 'Smith',
          age: 21,
          department: 'computer_science',
          year: 3,
          semester: 5,
          phoneNumber: '+1234567890',
          collegeEmail: 'john.smith@college.edu',
          profilePicture: 'https://i.pravatar.cc/300?img=1',
          workStatus: 'available',
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('studentProfile', JSON.stringify(studentProfile));

        setState({
          user,
          studentProfile,
          isLoading: false,
          error: null,
        });

        toast.success('Logged in successfully');
        return;
      }

      if (email === 'recruiter@company.com' && password === 'password') {
        const user: User = {
          id: 'rec1',
          email: 'recruiter@company.com',
          role: USER_ROLES.RECRUITER,
          firstName: 'Jane',
          lastName: 'Doe',
          createdAt: new Date(),
          verified: true,
        };

        const recruiterProfile = {
          id: '1',
          userId: 'rec1',
          companyName: 'TechInnovate',
          industry: 'technology',
          website: 'https://techinnovate.com',
          logoUrl: 'https://via.placeholder.com/150',
          description: 'A leading tech company specializing in AI solutions',
          approved: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('recruiterProfile', JSON.stringify(recruiterProfile));

        setState({
          user,
          recruiterProfile,
          isLoading: false,
          error: null,
        });

        toast.success('Logged in successfully');
        return;
      }

      if (email === 'admin@college.edu' && password === 'password') {
        const user: User = {
          id: 'adm1',
          email: 'admin@college.edu',
          role: USER_ROLES.ADMIN,
          firstName: 'Admin',
          lastName: 'User',
          createdAt: new Date(),
          verified: true,
        };

        localStorage.setItem('user', JSON.stringify(user));

        setState({
          user,
          isLoading: false,
          error: null,
        });

        toast.success('Logged in as Admin');
        return;
      }

      setState({
        user: null,
        isLoading: false,
        error: 'Invalid email or password',
      });

      toast.error('Invalid email or password');
    } catch (error) {
      console.error('Login failed', error);
      setState({
        user: null,
        isLoading: false,
        error: 'Failed to authenticate',
      });
      toast.error('Authentication failed');
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

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check email format based on role
      if (role === USER_ROLES.STUDENT && !email.endsWith('@college.edu')) {
        setState({
          ...state,
          isLoading: false,
          error: 'Students must register with a college email (@college.edu)',
        });
        toast.error('Students must register with a college email (@college.edu)');
        return;
      }

      // For demo, create a user with given details
      const user: User = {
        id: `user-${Date.now()}`,
        email,
        role,
        firstName,
        lastName,
        createdAt: new Date(),
        verified: role === USER_ROLES.STUDENT, // Students are auto-verified for demo
      };

      localStorage.setItem('user', JSON.stringify(user));

      // Create empty profile based on role
      if (role === USER_ROLES.STUDENT) {
        const studentProfile: StudentProfile = {
          id: `profile-${Date.now()}`,
          userId: user.id,
          firstName,
          lastName,
          age: 0,
          department: '',
          year: 1,
          semester: 1,
          phoneNumber: '',
          collegeEmail: email,
          workStatus: 'available',
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        localStorage.setItem('studentProfile', JSON.stringify(studentProfile));

        setState({
          user,
          studentProfile,
          isLoading: false,
          error: null,
        });
      } else if (role === USER_ROLES.RECRUITER) {
        const recruiterProfile: RecruiterProfile = {
          id: `profile-${Date.now()}`,
          userId: user.id,
          companyName: '',
          industry: '',
          website: '',
          approved: false, // Recruiters need approval
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        localStorage.setItem('recruiterProfile', JSON.stringify(recruiterProfile));

        setState({
          user,
          recruiterProfile,
          isLoading: false,
          error: null,
        });
      } else {
        setState({
          user,
          isLoading: false,
          error: null,
        });
      }

      toast.success('Registration successful');
    } catch (error) {
      console.error('Registration failed', error);
      setState({
        ...state,
        isLoading: false,
        error: 'Failed to register',
      });
      toast.error('Registration failed');
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

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      const updatedProfile = { ...state.studentProfile, ...profile, updatedAt: new Date() };
      localStorage.setItem('studentProfile', JSON.stringify(updatedProfile));

      setState({
        ...state,
        studentProfile: updatedProfile as StudentProfile,
        isLoading: false,
      });

      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Profile update failed', error);
      setState({ ...state, isLoading: false, error: 'Failed to update profile' });
      toast.error('Failed to update profile');
    }
  };

  const updateRecruiterProfile = async (profile: Partial<RecruiterProfile>) => {
    try {
      setState({ ...state, isLoading: true });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      const updatedProfile = { ...state.recruiterProfile, ...profile, updatedAt: new Date() };
      localStorage.setItem('recruiterProfile', JSON.stringify(updatedProfile));

      setState({
        ...state,
        recruiterProfile: updatedProfile as RecruiterProfile,
        isLoading: false,
      });

      toast.success('Company profile updated successfully');
    } catch (error) {
      console.error('Profile update failed', error);
      setState({ ...state, isLoading: false, error: 'Failed to update company profile' });
      toast.error('Failed to update company profile');
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

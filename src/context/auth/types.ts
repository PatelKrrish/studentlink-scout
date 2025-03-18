
import { StudentProfile, RecruiterProfile, User, UserRole } from '@/lib/types';

export interface AuthState {
  user: User | null;
  studentProfile?: StudentProfile;
  recruiterProfile?: RecruiterProfile;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string, role: UserRole) => Promise<void>;
  logout: () => void;
  updateStudentProfile: (profile: Partial<StudentProfile> & { id: string }) => Promise<void>;
  updateRecruiterProfile: (profile: Partial<RecruiterProfile> & { id: string }) => Promise<void>;
}

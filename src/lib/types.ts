
export type UserRole = 'student' | 'recruiter' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  createdAt: Date;
  verified: boolean;
}

export interface StudentProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  age: number;
  department: string;
  year: number;
  semester: number;
  phoneNumber: string;
  collegeEmail: string;
  communicationEmail?: string;
  profilePicture?: string;
  resume?: string;
  certificates?: string[];
  experience: string;
  workStatus: 'available' | 'employed' | 'not_available';
  createdAt: Date;
  updatedAt: Date;
}

export interface RecruiterProfile {
  id: string;
  userId: string;
  companyName: string;
  industry: string;
  website: string;
  logoUrl?: string;
  description?: string;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobOffer {
  id: string;
  recruiterId: string;
  studentId: string;
  position: string;
  description: string;
  salary?: string;
  location: string;
  type: 'full-time' | 'part-time' | 'internship' | 'contract';
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  studentProfile?: StudentProfile;
  recruiterProfile?: RecruiterProfile;
  isLoading: boolean;
  error: string | null;
}

export type UserWithProfile = User & {
  studentProfile?: StudentProfile;
  recruiterProfile?: RecruiterProfile;
};

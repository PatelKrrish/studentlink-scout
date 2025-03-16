
import { User, StudentProfile, RecruiterProfile, UserRole } from '@/lib/types';
import { dbUtils } from './db-utils';
import { USER_ROLES } from '@/lib/constants';

// Simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  // Login user
  login: async (email: string, password: string): Promise<{
    user: User;
    studentProfile?: StudentProfile;
    recruiterProfile?: RecruiterProfile;
  }> => {
    await delay(800);

    // Find user by email
    const users = dbUtils.get<User>(dbUtils.collections.USERS);
    const user = users.find(u => u.email === email);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // In a real app, we would check password hash
    // Here we just simulate it
    if (password !== 'password') {
      throw new Error('Invalid email or password');
    }

    // Get profile based on role
    let studentProfile: StudentProfile | undefined;
    let recruiterProfile: RecruiterProfile | undefined;

    if (user.role === USER_ROLES.STUDENT) {
      studentProfile = dbUtils.query<StudentProfile>(
        dbUtils.collections.STUDENT_PROFILES,
        profile => profile.userId === user.id
      )[0];
    } else if (user.role === USER_ROLES.RECRUITER) {
      recruiterProfile = dbUtils.query<RecruiterProfile>(
        dbUtils.collections.RECRUITER_PROFILES,
        profile => profile.userId === user.id
      )[0];
    }

    return { user, studentProfile, recruiterProfile };
  },

  // Register user
  register: async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: UserRole
  ): Promise<{
    user: User;
    studentProfile?: StudentProfile;
    recruiterProfile?: RecruiterProfile;
  }> => {
    await delay(800);

    // Check if email is already taken
    const users = dbUtils.get<User>(dbUtils.collections.USERS);
    if (users.some(u => u.email === email)) {
      throw new Error('Email is already taken');
    }

    // Validate student email domain
    if (role === USER_ROLES.STUDENT && !email.endsWith('@college.edu')) {
      throw new Error('Students must register with a college email (@college.edu)');
    }

    // Create user
    const userId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const user: User = {
      id: userId,
      email,
      role,
      firstName,
      lastName,
      createdAt: new Date(),
      verified: role === USER_ROLES.STUDENT,
    };

    // Add user to database
    dbUtils.add<User>(dbUtils.collections.USERS, user);

    // Create profile based on role
    let studentProfile: StudentProfile | undefined;
    let recruiterProfile: RecruiterProfile | undefined;

    if (role === USER_ROLES.STUDENT) {
      studentProfile = {
        id: `profile-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userId,
        firstName,
        lastName,
        age: 0,
        department: '',
        year: 1,
        semester: 1,
        phoneNumber: '',
        collegeEmail: email,
        workStatus: 'available',
        experience: '',
        certificates: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      dbUtils.add<StudentProfile>(dbUtils.collections.STUDENT_PROFILES, studentProfile);
    } else if (role === USER_ROLES.RECRUITER) {
      recruiterProfile = {
        id: `profile-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userId,
        companyName: '',
        industry: '',
        website: '',
        approved: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      dbUtils.add<RecruiterProfile>(dbUtils.collections.RECRUITER_PROFILES, recruiterProfile);
    }

    return { user, studentProfile, recruiterProfile };
  },

  // Verify email (for recruiters)
  verifyEmail: async (userId: string): Promise<User> => {
    await delay(500);
    
    const updatedUser = dbUtils.update<User>(
      dbUtils.collections.USERS,
      userId,
      { verified: true }
    );
    
    if (!updatedUser) {
      throw new Error('User not found');
    }
    
    return updatedUser;
  },
  
  // Approve recruiter
  approveRecruiter: async (profileId: string): Promise<RecruiterProfile> => {
    await delay(500);
    
    const updatedProfile = dbUtils.update<RecruiterProfile>(
      dbUtils.collections.RECRUITER_PROFILES,
      profileId,
      { approved: true }
    );
    
    if (!updatedProfile) {
      throw new Error('Recruiter profile not found');
    }
    
    return updatedProfile;
  }
};

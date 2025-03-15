
import { User, StudentProfile, RecruiterProfile, JobOffer, UserRole, WorkStatus } from '../lib/types';
import { USER_ROLES } from '../lib/constants';

// Simulate API delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Auth Service
 */
export const authService = {
  // Login user
  login: async (email: string, password: string): Promise<{
    user: User;
    studentProfile?: StudentProfile;
    recruiterProfile?: RecruiterProfile;
  }> => {
    await delay(800);

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

      const studentProfile: StudentProfile = {
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
        experience: 'I have 2 years of experience with React and TypeScript.',
        certificates: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return { user, studentProfile };
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

      const recruiterProfile: RecruiterProfile = {
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

      return { user, recruiterProfile };
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

      return { user };
    }

    throw new Error('Invalid email or password');
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

    if (role === USER_ROLES.STUDENT && !email.endsWith('@college.edu')) {
      throw new Error('Students must register with a college email (@college.edu)');
    }

    const user: User = {
      id: `user-${Date.now()}`,
      email,
      role,
      firstName,
      lastName,
      createdAt: new Date(),
      verified: role === USER_ROLES.STUDENT,
    };

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
        experience: '',
        certificates: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return { user, studentProfile };
    } else if (role === USER_ROLES.RECRUITER) {
      const recruiterProfile: RecruiterProfile = {
        id: `profile-${Date.now()}`,
        userId: user.id,
        companyName: '',
        industry: '',
        website: '',
        approved: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return { user, recruiterProfile };
    }

    return { user };
  }
};

/**
 * Profile Service
 */
export const profileService = {
  // Update student profile
  updateStudentProfile: async (profile: Partial<StudentProfile>): Promise<StudentProfile> => {
    await delay(800);
    
    // Simulating fetching the current profile from storage
    const currentProfileStr = localStorage.getItem('studentProfile');
    if (!currentProfileStr) {
      throw new Error('Student profile not found');
    }
    
    const currentProfile: StudentProfile = JSON.parse(currentProfileStr);
    const updatedProfile = { ...currentProfile, ...profile, updatedAt: new Date() };
    
    return updatedProfile;
  },
  
  // Update recruiter profile
  updateRecruiterProfile: async (profile: Partial<RecruiterProfile>): Promise<RecruiterProfile> => {
    await delay(800);
    
    // Simulating fetching the current profile from storage
    const currentProfileStr = localStorage.getItem('recruiterProfile');
    if (!currentProfileStr) {
      throw new Error('Recruiter profile not found');
    }
    
    const currentProfile: RecruiterProfile = JSON.parse(currentProfileStr);
    const updatedProfile = { ...currentProfile, ...profile, updatedAt: new Date() };
    
    return updatedProfile;
  },
  
  // Get all students (for recruiters to browse)
  getAllStudents: async (filters?: {
    search?: string;
    department?: string;
    workStatus?: WorkStatus | '';
  }): Promise<StudentProfile[]> => {
    await delay(1000);
    
    // For now, we'll just return dummy data from localStorage 
    // In a real backend, this would query a database
    const storedStudents = localStorage.getItem('dummyStudents');
    let students: any[] = storedStudents 
      ? JSON.parse(storedStudents) 
      : [];
    
    // If no students were found in localStorage, use the constant dummy data
    if (students.length === 0) {
      const { DUMMY_STUDENTS } = await import('../lib/constants');
      students = DUMMY_STUDENTS;
      localStorage.setItem('dummyStudents', JSON.stringify(students));
    }
    
    // Explicitly type the workStatus to ensure it's a valid WorkStatus value
    const typedStudents: StudentProfile[] = students.map(student => ({
      ...student,
      workStatus: student.workStatus as WorkStatus
    }));
    
    // Apply filters if provided
    if (filters) {
      const { search, department, workStatus } = filters;
      
      return typedStudents.filter(student => {
        const matchesSearch = !search || 
          student.firstName.toLowerCase().includes(search.toLowerCase()) ||
          student.lastName.toLowerCase().includes(search.toLowerCase()) ||
          student.experience.toLowerCase().includes(search.toLowerCase());
          
        const matchesDepartment = !department || student.department === department;
        const matchesWorkStatus = !workStatus || student.workStatus === workStatus;
        
        return matchesSearch && matchesDepartment && matchesWorkStatus;
      });
    }
    
    return typedStudents;
  },
  
  // Get student by ID
  getStudentById: async (id: string): Promise<StudentProfile> => {
    await delay(500);
    
    const students = await profileService.getAllStudents();
    const student = students.find(s => s.id === id);
    
    if (!student) {
      throw new Error('Student not found');
    }
    
    return student;
  }
};

/**
 * Job Offers Service
 */
export const jobOffersService = {
  // Create a job offer
  createJobOffer: async (offer: Omit<JobOffer, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<JobOffer> => {
    await delay(800);
    
    const newOffer: JobOffer = {
      ...offer,
      id: `offer-${Date.now()}`,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Save to localStorage for now
    const offersStr = localStorage.getItem('jobOffers');
    const offers: JobOffer[] = offersStr ? JSON.parse(offersStr) : [];
    offers.push(newOffer);
    localStorage.setItem('jobOffers', JSON.stringify(offers));
    
    return newOffer;
  },
  
  // Get job offers for student
  getStudentOffers: async (studentId: string): Promise<JobOffer[]> => {
    await delay(800);
    
    const offersStr = localStorage.getItem('jobOffers');
    const offers: JobOffer[] = offersStr ? JSON.parse(offersStr) : [];
    
    return offers.filter(offer => offer.studentId === studentId);
  },
  
  // Get job offers created by recruiter
  getRecruiterOffers: async (recruiterId: string): Promise<JobOffer[]> => {
    await delay(800);
    
    const offersStr = localStorage.getItem('jobOffers');
    const offers: JobOffer[] = offersStr ? JSON.parse(offersStr) : [];
    
    return offers.filter(offer => offer.recruiterId === recruiterId);
  },
  
  // Update job offer status
  updateOfferStatus: async (
    offerId: string, 
    status: 'pending' | 'accepted' | 'declined'
  ): Promise<JobOffer> => {
    await delay(500);
    
    const offersStr = localStorage.getItem('jobOffers');
    const offers: JobOffer[] = offersStr ? JSON.parse(offersStr) : [];
    
    const offerIndex = offers.findIndex(o => o.id === offerId);
    if (offerIndex === -1) {
      throw new Error('Offer not found');
    }
    
    const updatedOffer = {
      ...offers[offerIndex],
      status,
      updatedAt: new Date()
    };
    
    offers[offerIndex] = updatedOffer;
    localStorage.setItem('jobOffers', JSON.stringify(offers));
    
    return updatedOffer;
  }
};

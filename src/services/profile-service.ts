
import { StudentProfile, RecruiterProfile, WorkStatus } from '@/lib/types';
import { dbUtils } from './db-utils';

// Simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const profileService = {
  // Update student profile
  updateStudentProfile: async (profile: Partial<StudentProfile> & { id: string }): Promise<StudentProfile> => {
    await delay(800);
    
    const updatedProfile = dbUtils.update<StudentProfile>(
      dbUtils.collections.STUDENT_PROFILES,
      profile.id,
      { ...profile, updatedAt: new Date() }
    );
    
    if (!updatedProfile) {
      throw new Error('Student profile not found');
    }
    
    return updatedProfile;
  },
  
  // Update recruiter profile
  updateRecruiterProfile: async (profile: Partial<RecruiterProfile> & { id: string }): Promise<RecruiterProfile> => {
    await delay(800);
    
    const updatedProfile = dbUtils.update<RecruiterProfile>(
      dbUtils.collections.RECRUITER_PROFILES,
      profile.id,
      { ...profile, updatedAt: new Date() }
    );
    
    if (!updatedProfile) {
      throw new Error('Recruiter profile not found');
    }
    
    return updatedProfile;
  },
  
  // Get all students (for recruiters to browse)
  getAllStudents: async (filters?: {
    search?: string;
    department?: string;
    workStatus?: WorkStatus | '';
  }): Promise<StudentProfile[]> => {
    await delay(1000);
    
    let students = dbUtils.get<StudentProfile>(dbUtils.collections.STUDENT_PROFILES);
    
    // Apply filters if provided
    if (filters) {
      const { search, department, workStatus } = filters;
      
      students = students.filter(student => {
        const matchesSearch = !search || 
          student.firstName.toLowerCase().includes(search.toLowerCase()) ||
          student.lastName.toLowerCase().includes(search.toLowerCase()) ||
          student.experience.toLowerCase().includes(search.toLowerCase());
          
        const matchesDepartment = !department || student.department === department;
        const matchesWorkStatus = !workStatus || student.workStatus === workStatus;
        
        return matchesSearch && matchesDepartment && matchesWorkStatus;
      });
    }
    
    return students;
  },
  
  // Get student by ID
  getStudentById: async (id: string): Promise<StudentProfile> => {
    await delay(500);
    
    const student = dbUtils.getById<StudentProfile>(dbUtils.collections.STUDENT_PROFILES, id);
    
    if (!student) {
      throw new Error('Student not found');
    }
    
    return student;
  },

  // Get recruiter by ID
  getRecruiterById: async (id: string): Promise<RecruiterProfile> => {
    await delay(500);
    
    const recruiter = dbUtils.getById<RecruiterProfile>(dbUtils.collections.RECRUITER_PROFILES, id);
    
    if (!recruiter) {
      throw new Error('Recruiter not found');
    }
    
    return recruiter;
  }
};

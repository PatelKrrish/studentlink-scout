
// Navigation
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  STUDENT_PROFILE: '/student/profile',
  RECRUITER_DASHBOARD: '/recruiter/dashboard',
  SEARCH_STUDENTS: '/recruiter/students',
  ADMIN_PANEL: '/admin/panel',
} as const;

// User roles
export const USER_ROLES = {
  STUDENT: 'student',
  RECRUITER: 'recruiter',
  ADMIN: 'admin',
} as const;

// Form validation
export const VALIDATION = {
  EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  PHONE_REGEX: /^\+?[0-9]{10,15}$/,
};

// Student profile
export const WORK_STATUS_OPTIONS = [
  { value: 'available', label: 'Available for Work' },
  { value: 'employed', label: 'Currently Employed' },
  { value: 'not_available', label: 'Not Available' },
];

export const YEAR_OPTIONS = [
  { value: 1, label: '1st Year' },
  { value: 2, label: '2nd Year' },
  { value: 3, label: '3rd Year' },
  { value: 4, label: '4th Year' },
];

export const SEMESTER_OPTIONS = [
  { value: 1, label: '1st Semester' },
  { value: 2, label: '2nd Semester' },
  { value: 3, label: '3rd Semester' },
  { value: 4, label: '4th Semester' },
  { value: 5, label: '5th Semester' },
  { value: 6, label: '6th Semester' },
  { value: 7, label: '7th Semester' },
  { value: 8, label: '8th Semester' },
];

export const DEPARTMENT_OPTIONS = [
  { value: 'computer_science', label: 'Computer Science' },
  { value: 'information_technology', label: 'Information Technology' },
  { value: 'mechanical', label: 'Mechanical Engineering' },
  { value: 'electrical', label: 'Electrical Engineering' },
  { value: 'civil', label: 'Civil Engineering' },
  { value: 'business', label: 'Business Administration' },
  { value: 'finance', label: 'Finance' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'human_resources', label: 'Human Resources' },
];

// Job related
export const JOB_TYPE_OPTIONS = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'internship', label: 'Internship' },
  { value: 'contract', label: 'Contract' },
];

// Recruiter related
export const INDUSTRY_OPTIONS = [
  { value: 'technology', label: 'Technology' },
  { value: 'finance', label: 'Finance' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'retail', label: 'Retail' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'media', label: 'Media & Entertainment' },
];

// Dummy data for development
export const DUMMY_STUDENTS = [
  {
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
    communicationEmail: 'john.smith@gmail.com',
    profilePicture: 'https://i.pravatar.cc/300?img=1',
    workStatus: 'available',
    experience: 'I have 2 years of experience with React and TypeScript.',
    certificates: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    userId: 'usr2',
    firstName: 'Emma',
    lastName: 'Johnson',
    age: 20,
    department: 'business',
    year: 2,
    semester: 3,
    phoneNumber: '+1234567891',
    collegeEmail: 'emma.johnson@college.edu',
    communicationEmail: 'emma.johnson@gmail.com',
    profilePicture: 'https://i.pravatar.cc/300?img=5',
    workStatus: 'available',
    experience: 'Summer intern at ABC Corp.',
    certificates: ['Excel Advanced'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    userId: 'usr3',
    firstName: 'Michael',
    lastName: 'Brown',
    age: 22,
    department: 'information_technology',
    year: 4,
    semester: 7,
    phoneNumber: '+1234567892',
    collegeEmail: 'michael.brown@college.edu',
    communicationEmail: 'michael.brown@gmail.com',
    profilePicture: 'https://i.pravatar.cc/300?img=3',
    workStatus: 'employed',
    experience: 'Part-time web developer at XYZ Agency.',
    certificates: ['AWS Certified Developer', 'JavaScript Advanced'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const DUMMY_RECRUITERS = [
  {
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
  },
  {
    id: '2',
    userId: 'rec2',
    companyName: 'FinancePro',
    industry: 'finance',
    website: 'https://financepro.com',
    logoUrl: 'https://via.placeholder.com/150',
    description: 'Financial services and consultancy for businesses',
    approved: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    userId: 'rec3',
    companyName: 'MediHealth',
    industry: 'healthcare',
    website: 'https://medihealth.com',
    logoUrl: 'https://via.placeholder.com/150',
    description: 'Healthcare solutions and medical technology',
    approved: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

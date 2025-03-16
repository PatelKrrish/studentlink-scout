
import { User, StudentProfile, RecruiterProfile, JobOffer, WorkStatus } from '@/lib/types';

// Simulate a simple database using localStorage
export const dbUtils = {
  // Collection names
  collections: {
    USERS: 'db_users',
    STUDENT_PROFILES: 'db_student_profiles',
    RECRUITER_PROFILES: 'db_recruiter_profiles',
    JOB_OFFERS: 'db_job_offers',
  },

  // Initialize database with seed data if empty
  initDatabase: () => {
    // Check if database is already initialized
    const isInitialized = localStorage.getItem('db_initialized');
    if (isInitialized) return;

    // Import seed data
    import('../lib/constants').then(({ DUMMY_STUDENTS, DUMMY_USERS, DUMMY_RECRUITERS }) => {
      // Initialize collections
      localStorage.setItem(dbUtils.collections.USERS, JSON.stringify(DUMMY_USERS || []));
      localStorage.setItem(dbUtils.collections.STUDENT_PROFILES, JSON.stringify(DUMMY_STUDENTS || []));
      localStorage.setItem(dbUtils.collections.RECRUITER_PROFILES, JSON.stringify(DUMMY_RECRUITERS || []));
      localStorage.setItem(dbUtils.collections.JOB_OFFERS, JSON.stringify([]));
      
      // Mark as initialized
      localStorage.setItem('db_initialized', 'true');
    });
  },

  // Generic CRUD operations
  get: <T>(collection: string): T[] => {
    const data = localStorage.getItem(collection);
    return data ? JSON.parse(data) : [];
  },

  getById: <T extends { id: string }>(collection: string, id: string): T | null => {
    const items = dbUtils.get<T>(collection);
    return items.find(item => item.id === id) || null;
  },

  add: <T>(collection: string, item: T): T => {
    const items = dbUtils.get<T>(collection);
    const updatedItems = [...items, item];
    localStorage.setItem(collection, JSON.stringify(updatedItems));
    return item;
  },

  update: <T extends { id: string }>(collection: string, id: string, updates: Partial<T>): T | null => {
    const items = dbUtils.get<T>(collection);
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) return null;
    
    const updatedItem = { ...items[index], ...updates };
    items[index] = updatedItem;
    localStorage.setItem(collection, JSON.stringify(items));
    
    return updatedItem;
  },

  delete: <T extends { id: string }>(collection: string, id: string): boolean => {
    const items = dbUtils.get<T>(collection);
    const filteredItems = items.filter(item => item.id !== id);
    
    if (filteredItems.length === items.length) return false;
    
    localStorage.setItem(collection, JSON.stringify(filteredItems));
    return true;
  },

  // Specialized queries
  query: <T>(collection: string, predicate: (item: T) => boolean): T[] => {
    const items = dbUtils.get<T>(collection);
    return items.filter(predicate);
  }
};

// Initialize the database
dbUtils.initDatabase();

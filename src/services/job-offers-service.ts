
import { JobOffer } from '@/lib/types';
import { dbUtils } from './db-utils';
import { notificationService } from './notification-service';

// Simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const jobOffersService = {
  // Create a job offer
  createJobOffer: async (offer: Omit<JobOffer, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'companyName'>): Promise<JobOffer> => {
    await delay(800); // Simulate network latency
    
    // Get recruiter profile to attach company name
    const recruiterProfile = dbUtils.query(
      dbUtils.collections.RECRUITER_PROFILES, 
      profile => profile.userId === offer.recruiterId
    )[0];
    
    const newOffer: JobOffer = {
      ...offer,
      id: `offer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      status: 'pending',
      companyName: recruiterProfile?.companyName || 'Unknown Company',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Save to "database"
    dbUtils.add<JobOffer>(dbUtils.collections.JOB_OFFERS, newOffer);
    
    // Create notification
    notificationService.createJobOfferNotification(newOffer, 'created');
    
    return newOffer;
  },
  
  // Get job offers for student
  getStudentOffers: async (studentId: string): Promise<JobOffer[]> => {
    await delay(600);
    
    return dbUtils.query<JobOffer>(
      dbUtils.collections.JOB_OFFERS,
      offer => offer.studentId === studentId
    ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  
  // Get job offers created by recruiter
  getRecruiterOffers: async (recruiterId: string): Promise<JobOffer[]> => {
    await delay(600);
    
    return dbUtils.query<JobOffer>(
      dbUtils.collections.JOB_OFFERS,
      offer => offer.recruiterId === recruiterId
    ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  
  // Get job offer by id
  getOfferById: async (offerId: string): Promise<JobOffer | null> => {
    await delay(300);
    
    return dbUtils.getById<JobOffer>(dbUtils.collections.JOB_OFFERS, offerId);
  },
  
  // Update job offer status
  updateOfferStatus: async (
    offerId: string, 
    status: 'pending' | 'accepted' | 'declined'
  ): Promise<JobOffer> => {
    await delay(800);
    
    const offer = dbUtils.getById<JobOffer>(dbUtils.collections.JOB_OFFERS, offerId);
    if (!offer) {
      throw new Error('Offer not found');
    }
    
    const updatedOffer = dbUtils.update<JobOffer>(
      dbUtils.collections.JOB_OFFERS, 
      offerId, 
      { status, updatedAt: new Date() }
    );
    
    if (!updatedOffer) {
      throw new Error('Failed to update offer');
    }
    
    // Create notification
    notificationService.createJobOfferNotification(updatedOffer, status as 'accepted' | 'declined');
    
    return updatedOffer;
  },
  
  // Delete job offer
  deleteOffer: async (offerId: string): Promise<boolean> => {
    await delay(500);
    
    return dbUtils.delete<JobOffer>(dbUtils.collections.JOB_OFFERS, offerId);
  }
};

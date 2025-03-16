
import { useState, useEffect } from 'react';
import { JobOffer } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import { jobOffersService } from '@/services/job-offers-service';

export const useJobOffers = () => {
  const { user } = useAuth();
  const [offers, setOffers] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch job offers based on user role
  useEffect(() => {
    const fetchOffers = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        let fetchedOffers: JobOffer[] = [];
        
        if (user.role === 'student') {
          fetchedOffers = await jobOffersService.getStudentOffers(user.id);
        } else if (user.role === 'recruiter') {
          fetchedOffers = await jobOffersService.getRecruiterOffers(user.id);
        }
        
        setOffers(fetchedOffers);
        setError(null);
      } catch (err) {
        console.error('Error fetching job offers:', err);
        setError('Failed to load job offers');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOffers();
  }, [user]);
  
  // Create a new job offer
  const createOffer = async (offerData: Omit<JobOffer, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'companyName'>) => {
    try {
      setLoading(true);
      
      const newOffer = await jobOffersService.createJobOffer(offerData);
      
      // Update local state
      setOffers(prevOffers => [newOffer, ...prevOffers]);
      
      return newOffer;
    } catch (err) {
      console.error('Error creating job offer:', err);
      setError('Failed to create job offer');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Update job offer status
  const updateOfferStatus = async (offerId: string, status: 'pending' | 'accepted' | 'declined') => {
    try {
      setLoading(true);
      
      const updatedOffer = await jobOffersService.updateOfferStatus(offerId, status);
      
      // Update local state
      setOffers(prevOffers => 
        prevOffers.map(offer => 
          offer.id === offerId ? updatedOffer : offer
        )
      );
      
      return updatedOffer;
    } catch (err) {
      console.error('Error updating job offer:', err);
      setError('Failed to update job offer');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Delete a job offer
  const deleteOffer = async (offerId: string) => {
    try {
      setLoading(true);
      
      const success = await jobOffersService.deleteOffer(offerId);
      
      if (success) {
        // Update local state
        setOffers(prevOffers => 
          prevOffers.filter(offer => offer.id !== offerId)
        );
      }
      
      return success;
    } catch (err) {
      console.error('Error deleting job offer:', err);
      setError('Failed to delete job offer');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    offers,
    loading,
    error,
    createOffer,
    updateOfferStatus,
    deleteOffer,
  };
};

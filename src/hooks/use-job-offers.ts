
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { jobOffersService } from '@/services/job-offers-service';
import { JobOffer } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export function useJobOffers() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [offers, setOffers] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load job offers based on user role
  const fetchOffers = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      if (user.role === 'student') {
        const studentOffers = await jobOffersService.getStudentOffers(user.id);
        setOffers(studentOffers);
      } else if (user.role === 'recruiter') {
        const recruiterOffers = await jobOffersService.getRecruiterOffers(user.id);
        setOffers(recruiterOffers);
      }
    } catch (err) {
      setError('Failed to fetch job offers');
      toast({
        title: 'Error',
        description: 'Could not load job offers. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Get a single job offer by ID
  const getOfferById = async (offerId: string) => {
    try {
      setLoading(true);
      return await jobOffersService.getOfferById(offerId);
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Could not load job offer details',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create a new job offer (for recruiters)
  const createOffer = async (offerData: Omit<JobOffer, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'companyName'>) => {
    if (!user || user.role !== 'recruiter') {
      toast({
        title: 'Permission Denied',
        description: 'Only recruiters can create job offers',
        variant: 'destructive',
      });
      return null;
    }
    
    try {
      setLoading(true);
      const newOffer = await jobOffersService.createJobOffer(offerData);
      
      // Update local state with new offer
      setOffers(prev => [...prev, newOffer]);
      
      toast({
        title: 'Success',
        description: 'Job offer created successfully',
      });
      
      return newOffer;
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to create job offer',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update offer status (for students to accept/decline)
  const updateOfferStatus = async (offerId: string, status: 'pending' | 'accepted' | 'declined') => {
    if (!user || user.role !== 'student') {
      toast({
        title: 'Permission Denied',
        description: 'Only students can respond to job offers',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setLoading(true);
      const updatedOffer = await jobOffersService.updateOfferStatus(offerId, status);
      
      // Update local state
      setOffers(prev => 
        prev.map(offer => offer.id === offerId ? updatedOffer : offer)
      );
      
      toast({
        title: 'Success',
        description: `Offer ${status === 'accepted' ? 'accepted' : 'declined'} successfully`,
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update offer status',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete a job offer (for recruiters)
  const deleteOffer = async (offerId: string) => {
    if (!user || user.role !== 'recruiter') {
      toast({
        title: 'Permission Denied',
        description: 'Only recruiters can delete job offers',
        variant: 'destructive',
      });
      return false;
    }
    
    try {
      setLoading(true);
      const success = await jobOffersService.deleteOffer(offerId);
      
      if (success) {
        // Update local state
        setOffers(prev => prev.filter(offer => offer.id !== offerId));
        
        toast({
          title: 'Success',
          description: 'Job offer deleted successfully',
        });
      }
      
      return success;
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to delete job offer',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Load offers on component mount
  useEffect(() => {
    if (user) {
      fetchOffers();
    }
  }, [user]);

  return {
    offers,
    loading,
    error,
    fetchOffers,
    getOfferById,
    createOffer,
    updateOfferStatus,
    deleteOffer,
  };
}

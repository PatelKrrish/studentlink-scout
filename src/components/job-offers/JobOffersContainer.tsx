
import React, { useState, useEffect } from 'react';
import { useJobOffers } from '@/hooks/use-job-offers';
import { JobOffer } from '@/lib/types';
import { useAuth } from '@/context/auth';
import { useToast } from '@/hooks/use-toast';
import JobOffersGrid from './JobOffersGrid';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import JobOfferModal from './JobOfferModal';

const JobOffersContainer = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const isStudent = user?.role === 'student';
  
  const {
    offers,
    loading,
    error,
    updateOfferStatus,
    createOffer
  } = useJobOffers();
  
  const [selectedOffer, setSelectedOffer] = useState<JobOffer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Log offers for debugging
  useEffect(() => {
    console.log('Current job offers:', offers);
  }, [offers]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-800 rounded-md">
        <p>Error: {error}</p>
      </div>
    );
  }

  const handleAcceptOffer = async (offerId: string) => {
    try {
      await updateOfferStatus(offerId, 'accepted');
      toast({
        title: 'Offer Accepted',
        description: 'You have successfully accepted the job offer.',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to accept offer. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDeclineOffer = async (offerId: string) => {
    try {
      await updateOfferStatus(offerId, 'declined');
      toast({
        title: 'Offer Declined',
        description: 'You have declined the job offer.',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to decline offer. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleViewOffer = (offer: JobOffer) => {
    setSelectedOffer(offer);
    // In a real app, this might open a modal with more details
    toast({
      title: 'Viewing Offer',
      description: `Viewing details for ${offer.position} position`,
    });
  };
  
  const handleCreateOffer = async (data: any) => {
    if (!user) return;
    
    const offerData = {
      recruiterId: user.id,
      studentId: data.studentId || 'student-123', // Default for testing
      position: data.position,
      description: data.description,
      salary: data.salary,
      location: data.location,
      type: data.type as 'full-time' | 'part-time' | 'internship' | 'contract',
    };
    
    try {
      await createOffer(offerData);
      setIsModalOpen(false);
      toast({
        title: 'Success',
        description: 'Job offer created successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create job offer',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Job Offers</h2>
          <p className="text-muted-foreground">
            {isStudent
              ? 'Review and respond to your job offers from recruiters.'
              : 'Manage your job offers to students.'}
          </p>
        </div>
        
        {!isStudent && (
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Create Job Offer</span>
          </Button>
        )}
      </div>

      <JobOffersGrid
        offers={offers}
        loading={loading}
        onAcceptOffer={isStudent ? handleAcceptOffer : undefined}
        onDeclineOffer={isStudent ? handleDeclineOffer : undefined}
        onViewOffer={handleViewOffer}
        isStudent={isStudent}
      />
      
      <JobOfferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        studentId="student-123" // Default for testing
        onSubmit={handleCreateOffer}
      />
    </div>
  );
};

export default JobOffersContainer;

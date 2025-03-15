
import React, { useState } from 'react';
import { useJobOffers } from '@/hooks/use-job-offers';
import { JobOffer } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import JobOffersGrid from './JobOffersGrid';

const JobOffersContainer = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const isStudent = user?.role === 'student';
  
  const {
    offers,
    loading,
    error,
    updateOfferStatus,
  } = useJobOffers();
  
  const [selectedOffer, setSelectedOffer] = useState<JobOffer | null>(null);

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Job Offers</h2>
        <p className="text-muted-foreground">
          {isStudent
            ? 'Review and respond to your job offers from recruiters.'
            : 'Manage your job offers to students.'}
        </p>
      </div>

      <JobOffersGrid
        offers={offers}
        loading={loading}
        onAcceptOffer={isStudent ? handleAcceptOffer : undefined}
        onDeclineOffer={isStudent ? handleDeclineOffer : undefined}
        onViewOffer={handleViewOffer}
        isStudent={isStudent}
      />
    </div>
  );
};

export default JobOffersContainer;


import React from 'react';
import { JobOffer } from '@/lib/types';
import JobOfferCard from './JobOfferCard';
import JobOfferCardSkeleton from './JobOfferCardSkeleton';

interface JobOffersGridProps {
  offers: JobOffer[];
  loading: boolean;
  onAcceptOffer?: (offerId: string) => void;
  onDeclineOffer?: (offerId: string) => void;
  onViewOffer?: (offer: JobOffer) => void;
  isStudent: boolean;
}

const JobOffersGrid = ({
  offers,
  loading,
  onAcceptOffer,
  onDeclineOffer,
  onViewOffer,
  isStudent,
}: JobOffersGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[...Array(3)].map((_, i) => (
          <JobOfferCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (offers.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No job offers found</h3>
        <p className="text-muted-foreground">
          {isStudent 
            ? "You haven't received any job offers yet." 
            : "You haven't made any offers yet."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {offers.map((offer) => (
        <JobOfferCard
          key={offer.id}
          offer={offer}
          onAccept={onAcceptOffer}
          onDecline={onDeclineOffer}
          onView={onViewOffer}
          isStudent={isStudent}
        />
      ))}
    </div>
  );
};

export default JobOffersGrid;

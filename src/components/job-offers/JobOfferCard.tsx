
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { JobOffer } from '@/lib/types';
import { Briefcase, MapPin, Calendar, Clock } from 'lucide-react';

interface JobOfferCardProps {
  offer: JobOffer;
  onAccept?: (offerId: string) => void;
  onDecline?: (offerId: string) => void;
  onView?: (offer: JobOffer) => void;
  isStudent: boolean;
}

const JobOfferCard = ({ offer, onAccept, onDecline, onView, isStudent }: JobOfferCardProps) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    accepted: 'bg-green-100 text-green-800 border-green-200',
    declined: 'bg-red-100 text-red-800 border-red-200',
  };

  const offerTypeLabels = {
    'full-time': 'Full-time',
    'part-time': 'Part-time',
    'internship': 'Internship',
    'contract': 'Contract',
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{offer.position}</h3>
            <p className="text-sm text-muted-foreground mt-1">{offer.createdAt.toLocaleDateString()}</p>
          </div>
          <Badge
            className={`${statusColors[offer.status]} border`}
            variant="outline"
          >
            {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm mb-4 line-clamp-3">{offer.description}</p>
        
        <div className="space-y-2 mt-4">
          <div className="flex items-center text-sm">
            <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{offerTypeLabels[offer.type]}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{offer.location}</span>
          </div>
          
          {offer.salary && (
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{offer.salary}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        {isStudent ? (
          <div className="w-full flex gap-2">
            {offer.status === 'pending' && (
              <>
                <Button
                  variant="default"
                  className="flex-1"
                  onClick={() => onAccept?.(offer.id)}
                  disabled={offer.status !== 'pending'}
                >
                  Accept
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => onDecline?.(offer.id)}
                  disabled={offer.status !== 'pending'}
                >
                  Decline
                </Button>
              </>
            )}
            {offer.status !== 'pending' && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onView?.(offer)}
              >
                View Details
              </Button>
            )}
          </div>
        ) : (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onView?.(offer)}
          >
            View Details
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobOfferCard;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import JobOfferModal from './JobOfferModal';
import { useJobOffers } from '@/hooks/use-job-offers';
import { useAuth } from '@/context/AuthContext';

interface CreateJobOfferButtonProps {
  studentId: string;
  studentName?: string;
}

const CreateJobOfferButton = ({ studentId, studentName }: CreateJobOfferButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createOffer } = useJobOffers();
  const { user } = useAuth();
  
  // Ensure the current user is a recruiter
  if (!user || user.role !== 'recruiter') {
    return null;
  }

  const handleSubmit = async (data: any) => {
    if (!user) return;
    
    const offerData = {
      recruiterId: user.id,
      studentId: data.studentId,
      position: data.position,
      description: data.description,
      salary: data.salary,
      location: data.location,
      type: data.type as 'full-time' | 'part-time' | 'internship' | 'contract',
    };
    
    await createOffer(offerData);
  };

  return (
    <>
      <Button 
        onClick={() => setIsModalOpen(true)}
        className="gap-2"
      >
        <PlusCircle className="h-4 w-4" />
        <span>Create Job Offer{studentName ? ` for ${studentName}` : ''}</span>
      </Button>
      
      <JobOfferModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        studentId={studentId}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default CreateJobOfferButton;

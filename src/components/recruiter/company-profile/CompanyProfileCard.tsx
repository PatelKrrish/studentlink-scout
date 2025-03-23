
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CompanyAvatar from './CompanyAvatar';
import CompanyDetailsSection from './CompanyDetailsSection';
import EditProfileButton from './EditProfileButton';
import { RecruiterProfile } from '@/lib/types';

interface CompanyProfileCardProps {
  recruiterProfile: RecruiterProfile;
  updateRecruiterProfile: (profile: Partial<RecruiterProfile> & { id: string }) => Promise<void>;
}

const CompanyProfileCard = ({ recruiterProfile, updateRecruiterProfile }: CompanyProfileCardProps) => {
  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle>Company Profile</CardTitle>
        <CardDescription>Your company details</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <CompanyAvatar 
          logoUrl={recruiterProfile.logoUrl} 
          companyName={recruiterProfile.companyName} 
        />
        <h3 className="text-xl font-bold">{recruiterProfile.companyName}</h3>
        <Badge className="mt-2">{recruiterProfile.industry}</Badge>
        <p className="text-sm text-muted-foreground mt-4">
          {recruiterProfile.description || 'No company description provided.'}
        </p>
        <CompanyDetailsSection 
          website={recruiterProfile.website}
          approved={recruiterProfile.approved}
        />
      </CardContent>
      <CardFooter>
        <EditProfileButton 
          recruiterProfile={recruiterProfile}
          updateRecruiterProfile={updateRecruiterProfile}
        />
      </CardFooter>
    </Card>
  );
};

export default CompanyProfileCard;

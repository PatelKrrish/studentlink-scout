
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CompanyAvatarProps {
  logoUrl?: string;
  companyName: string;
}

const CompanyAvatar = ({ logoUrl, companyName }: CompanyAvatarProps) => {
  return (
    <Avatar className="h-24 w-24 mb-4">
      <AvatarImage src={logoUrl} alt={companyName} />
      <AvatarFallback>{companyName.charAt(0)}</AvatarFallback>
    </Avatar>
  );
};

export default CompanyAvatar;

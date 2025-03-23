
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CompanyAvatarProps {
  logoUrl?: string;
  companyName: string;
}

const CompanyAvatar = ({ logoUrl, companyName }: CompanyAvatarProps) => {
  // Get initials for the fallback
  const initials = companyName
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
    
  return (
    <Avatar className="h-24 w-24 mb-4 border-2 border-primary/10">
      <AvatarImage src={logoUrl} alt={companyName} />
      <AvatarFallback className="bg-primary/10 text-primary text-xl">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

export default CompanyAvatar;

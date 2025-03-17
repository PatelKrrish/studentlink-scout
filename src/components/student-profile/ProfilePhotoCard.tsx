
import React from 'react';
import { Upload, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { StudentProfile } from '@/lib/types';

interface ProfilePhotoCardProps {
  studentProfile: StudentProfile | undefined;
}

const ProfilePhotoCard = ({ studentProfile }: ProfilePhotoCardProps) => {
  return (
    <Card className="md:col-span-1 animate-fade-in">
      <CardHeader>
        <CardTitle>Profile Photo</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          {studentProfile?.profilePicture ? (
            <img
              src={studentProfile.profilePicture}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-2 border-primary"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center border-2 border-border">
              <UserIcon className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
        </div>
        <Button variant="outline" size="sm" className="w-full">
          <Upload className="w-4 h-4 mr-2" />
          Upload Photo
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfilePhotoCard;

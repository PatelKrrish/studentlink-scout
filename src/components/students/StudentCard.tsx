
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants';
import { StudentProfile } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import CreateJobOfferButton from '@/components/job-offers/CreateJobOfferButton';

interface StudentCardProps {
  student: StudentProfile;
}

const StudentCard = ({ student }: StudentCardProps) => {
  const { user } = useAuth();
  const isRecruiter = user?.role === 'recruiter';
  
  const workStatusColors = {
    available: 'bg-green-100 text-green-800 border-green-200',
    employed: 'bg-blue-100 text-blue-800 border-blue-200',
    not_available: 'bg-red-100 text-red-800 border-red-200',
  };

  const departmentDisplay = student.department.replace('_', ' ');
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={student.profilePicture} alt={`${student.firstName} ${student.lastName}`} />
            <AvatarFallback>{student.firstName.charAt(0)}{student.lastName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="font-semibold leading-none">{student.firstName} {student.lastName}</h3>
            <p className="text-sm text-muted-foreground">{departmentDisplay}</p>
            <div className="flex flex-wrap gap-1 pt-1">
              <Badge 
                variant="outline" 
                className={`text-xs ${workStatusColors[student.workStatus]}`}
              >
                {student.workStatus.replace('_', ' ')}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Year {student.year}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm line-clamp-4 mt-1">{student.experience}</p>
        {student.certificates && student.certificates.length > 0 && (
          <div className="mt-3">
            <p className="text-xs text-muted-foreground mb-1">Certifications:</p>
            <div className="flex flex-wrap gap-1">
              {student.certificates.slice(0, 3).map((cert, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {cert}
                </Badge>
              ))}
              {student.certificates.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{student.certificates.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 flex-col gap-2">
        <Button asChild variant="outline" className="w-full">
          <Link to={`${ROUTES.STUDENT_PROFILE}/${student.id}`}>
            View Profile
          </Link>
        </Button>
        
        {isRecruiter && student.workStatus === 'available' && (
          <CreateJobOfferButton 
            studentId={student.id} 
            studentName={`${student.firstName} ${student.lastName}`}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default StudentCard;

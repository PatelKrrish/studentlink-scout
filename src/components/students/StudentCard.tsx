
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StudentProfile, WorkStatus } from '@/lib/types';
import { DEPARTMENT_OPTIONS, WORK_STATUS_OPTIONS } from '@/lib/constants';

interface StudentCardProps {
  student: StudentProfile;
  onViewProfile: (student: StudentProfile) => void;
  onConnect: (student: StudentProfile) => void;
  isRecruiter: boolean;
}

const StudentCard = ({ student, onViewProfile, onConnect, isRecruiter }: StudentCardProps) => {
  const getDepartmentLabel = (value: string) => {
    const option = DEPARTMENT_OPTIONS.find(option => option.value === value);
    return option ? option.label : value;
  };
  
  const getWorkStatusLabel = (value: WorkStatus) => {
    const option = WORK_STATUS_OPTIONS.find(option => option.value === value);
    return option ? option.label : value;
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={student.profilePicture} alt={`${student.firstName} ${student.lastName}`} />
          <AvatarFallback>{student.firstName[0]}{student.lastName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{student.firstName} {student.lastName}</h3>
          <p className="text-sm text-muted-foreground">{getDepartmentLabel(student.department)}</p>
          <Badge 
            variant={student.workStatus === 'available' ? 'default' : 
              student.workStatus === 'employed' ? 'secondary' : 'outline'}
            className="mt-1"
          >
            {getWorkStatusLabel(student.workStatus)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="line-clamp-3 text-sm">{student.experience}</p>
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-1">Year {student.year}, Semester {student.semester}</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {student.certificates && student.certificates.map((cert, index) => (
              <Badge key={index} variant="outline">{cert}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={() => onViewProfile(student)}
          className="flex-1"
        >
          View Profile
        </Button>
        <Button 
          onClick={() => onConnect(student)}
          className="flex-1"
          disabled={!isRecruiter}
        >
          Connect
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StudentCard;

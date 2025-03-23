
import React from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StudentProfile } from '@/lib/types';
import { Star } from 'lucide-react';

interface EngineerCardProps {
  student: StudentProfile;
  onViewProfile: (student: StudentProfile) => void;
}

const EngineerCard = ({ student, onViewProfile }: EngineerCardProps) => {
  // Generate a random rating between 4.3 and 5.0 for demo purposes
  const rating = (4.3 + Math.random() * 0.7).toFixed(1);
  
  // Map department names to job titles
  const getTitleFromDepartment = (dept: string) => {
    const titles: Record<string, string> = {
      'computer_science': 'Software Engineer',
      'information_technology': 'IT Specialist',
      'mechanical': 'Mechanical Engineer',
      'electrical': 'Electrical Engineer',
      'civil': 'Civil Engineer',
      'business': 'Business Analyst',
      'finance': 'Financial Analyst',
      'marketing': 'Marketing Specialist',
      'human_resources': 'HR Specialist'
    };
    
    return titles[dept] || 'Engineer';
  };
  
  // Generate mock skills based on department
  const getSkillsFromDepartment = (dept: string) => {
    const skillSets: Record<string, string[]> = {
      'computer_science': ['React', 'JavaScript', 'Python', 'AWS'],
      'information_technology': ['Networks', 'Cloud', 'Security', 'Linux'],
      'mechanical': ['CAD', 'Simulation', 'Materials', 'Thermal'],
      'electrical': ['Circuits', 'PCB', 'Electronics', 'Power'],
      'civil': ['Structures', 'CAD', 'Materials', 'Design'],
      'business': ['Excel', 'Data Analysis', 'Presentations', 'Strategy'],
      'finance': ['Financial Modeling', 'Excel', 'Analysis', 'Reporting'],
      'marketing': ['Branding', 'Analytics', 'Social Media', 'SEO'],
      'human_resources': ['Recruiting', 'Training', 'HR Systems', 'Policy']
    };
    
    // Return skills based on department, or default skills
    return skillSets[dept] || ['Communication', 'Teamwork', 'Problem Solving'];
  };
  
  const jobTitle = getTitleFromDepartment(student.department);
  const skills = getSkillsFromDepartment(student.department);
  
  const workStatusLabels = {
    'available': 'Full-time',
    'employed': 'Part-time',
    'not_available': 'Not available'
  };
  
  const departmentDisplay = student.department.replace('_', ' ');
  
  return (
    <Card className="h-full p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 mb-3">
        <Avatar className="h-14 w-14 border border-primary/10">
          <AvatarImage 
            src={student.profilePicture || `https://i.pravatar.cc/150?u=${student.id}`} 
            alt={`${student.firstName} ${student.lastName}`} 
          />
          <AvatarFallback>
            {student.firstName.charAt(0)}{student.lastName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{student.firstName} {student.lastName}</h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm">{jobTitle}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1.5 my-3">
        {skills.slice(0, 4).map((skill, index) => (
          <Badge 
            key={index}
            variant="outline" 
            className="bg-muted/50 hover:bg-muted"
          >
            {skill}
          </Badge>
        ))}
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-muted-foreground">
          {workStatusLabels[student.workStatus]}
        </span>
        
        <Button 
          variant="outline" 
          className="font-medium"
          onClick={() => onViewProfile(student)}
        >
          View Profile
        </Button>
      </div>
    </Card>
  );
};

export default EngineerCard;

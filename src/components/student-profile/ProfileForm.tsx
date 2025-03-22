
import React from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { StudentProfile } from '@/lib/types';
import { useProfileForm } from './useProfileForm';
import PersonalInfoForm from './PersonalInfoForm';
import EmailForm from './EmailForm';
import AcademicForm from './AcademicForm';
import WorkStatusForm from './WorkStatusForm';

interface ProfileFormProps {
  studentProfile: StudentProfile | undefined;
  isLoading: boolean;
  onSubmit: (formData: any) => void;
}

const ProfileForm = ({ studentProfile, isLoading, onSubmit }: ProfileFormProps) => {
  const { formData, formErrors, handleChange, validateForm, processFormData } = useProfileForm(studentProfile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm() && studentProfile) {
      const processedData = processFormData(studentProfile);
      onSubmit(processedData);
    }
  };

  return (
    <Card className="md:col-span-2 animate-fade-in">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="profileForm" onSubmit={handleSubmit} className="space-y-4">
          <PersonalInfoForm
            firstName={formData.firstName}
            lastName={formData.lastName}
            age={formData.age}
            phoneNumber={formData.phoneNumber}
            communicationEmail={formData.communicationEmail}
            errors={formErrors}
            handleChange={handleChange}
          />

          <EmailForm
            collegeEmail={studentProfile?.collegeEmail}
            communicationEmail={formData.communicationEmail}
            errors={formErrors}
            handleChange={handleChange}
          />

          <AcademicForm
            department={formData.department}
            year={formData.year}
            semester={formData.semester}
            handleChange={handleChange}
          />

          <WorkStatusForm
            workStatus={formData.workStatus}
            experience={formData.experience}
            handleChange={handleChange}
          />
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="profileForm" disabled={isLoading}>
          <Save className="w-4 h-4 mr-2" />
          Save Profile
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileForm;

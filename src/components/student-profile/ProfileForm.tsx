
import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { StudentProfile, WorkStatus } from '@/lib/types';
import { 
  WORK_STATUS_OPTIONS, 
  DEPARTMENT_OPTIONS,
  YEAR_OPTIONS,
  SEMESTER_OPTIONS,
  VALIDATION
} from '@/lib/constants';

interface ProfileFormProps {
  studentProfile: StudentProfile | undefined;
  isLoading: boolean;
  onSubmit: (formData: any) => void;
}

const ProfileForm = ({ studentProfile, isLoading, onSubmit }: ProfileFormProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    department: '',
    year: '',
    semester: '',
    phoneNumber: '',
    communicationEmail: '',
    workStatus: 'available' as WorkStatus,
    experience: '',
  });

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    age: '',
    phoneNumber: '',
    communicationEmail: '',
  });

  // Update form data when studentProfile changes
  useEffect(() => {
    if (studentProfile) {
      setFormData({
        firstName: studentProfile.firstName || '',
        lastName: studentProfile.lastName || '',
        age: studentProfile.age ? String(studentProfile.age) : '',
        department: studentProfile.department || '',
        year: studentProfile.year ? String(studentProfile.year) : '',
        semester: studentProfile.semester ? String(studentProfile.semester) : '',
        phoneNumber: studentProfile.phoneNumber || '',
        communicationEmail: studentProfile.communicationEmail || '',
        workStatus: studentProfile.workStatus || 'available',
        experience: studentProfile.experience || '',
      });
    }
  }, [studentProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Convert numeric string inputs to numbers when appropriate
    if (name === 'age' || name === 'year' || name === 'semester') {
      const numericValue = value === '' ? '' : parseInt(value, 10);
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Clear error when user types
    if (name in formErrors) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {
      firstName: '',
      lastName: '',
      age: '',
      phoneNumber: '',
      communicationEmail: '',
    };
    let isValid = true;

    // Name validation
    if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
      isValid = false;
    }

    if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
      isValid = false;
    }

    // Age validation
    if (formData.age !== '' && (Number(formData.age) < 16 || Number(formData.age) > 100)) {
      newErrors.age = 'Age must be between 16 and 100';
      isValid = false;
    }

    // Phone validation
    if (formData.phoneNumber && !VALIDATION.PHONE_REGEX.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
      isValid = false;
    }

    // Email validation
    if (formData.communicationEmail && !VALIDATION.EMAIL_REGEX.test(formData.communicationEmail)) {
      newErrors.communicationEmail = 'Please enter a valid email address';
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm() && studentProfile) {
      // Convert string values to appropriate types before updating
      const processedData = {
        ...formData,
        id: studentProfile.id, // Add the required id property
        age: formData.age === '' ? 0 : Number(formData.age),
        year: formData.year === '' ? 0 : Number(formData.year),
        semester: formData.semester === '' ? 0 : Number(formData.semester),
      };
      
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={!!formErrors.firstName}
                helperText={formErrors.firstName}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={!!formErrors.lastName}
                helperText={formErrors.lastName}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <Input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                error={!!formErrors.age}
                helperText={formErrors.age}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <Input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                error={!!formErrors.phoneNumber}
                helperText={formErrors.phoneNumber}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">College Email</label>
              <Input
                type="email"
                value={studentProfile?.collegeEmail || ''}
                disabled
                helperText="Your verified college email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Communication Email (Optional)</label>
              <Input
                type="email"
                name="communicationEmail"
                value={formData.communicationEmail}
                onChange={handleChange}
                error={!!formErrors.communicationEmail}
                helperText={formErrors.communicationEmail}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40"
              >
                <option value="">Select Department</option>
                {DEPARTMENT_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Year</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40"
              >
                <option value="">Select Year</option>
                {YEAR_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Semester</label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40"
              >
                <option value="">Select Semester</option>
                {SEMESTER_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Work Status</label>
            <select
              name="workStatus"
              value={formData.workStatus}
              onChange={handleChange}
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40"
            >
              {WORK_STATUS_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Experience (Optional)</label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40 resize-none"
              placeholder="Describe your past work experience, skills, and projects..."
            />
          </div>
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

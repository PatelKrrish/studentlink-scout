
import { useState, useEffect } from 'react';
import { StudentProfile, WorkStatus } from '@/lib/types';
import { VALIDATION } from '@/lib/constants';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  age: string;
  department: string;
  year: string;
  semester: string;
  phoneNumber: string;
  communicationEmail: string;
  workStatus: WorkStatus;
  experience: string;
}

interface ProfileFormErrors {
  firstName: string;
  lastName: string;
  age: string;
  phoneNumber: string;
  communicationEmail: string;
}

export const useProfileForm = (studentProfile: StudentProfile | undefined) => {
  const [formData, setFormData] = useState<ProfileFormData>({
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

  const [formErrors, setFormErrors] = useState<ProfileFormErrors>({
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

  const processFormData = (studentProfile: StudentProfile) => {
    // Convert string values to appropriate types before updating
    return {
      ...formData,
      id: studentProfile.id, // Add the required id property
      age: formData.age === '' ? 0 : Number(formData.age),
      year: formData.year === '' ? 0 : Number(formData.year),
      semester: formData.semester === '' ? 0 : Number(formData.semester),
    };
  };

  return {
    formData,
    formErrors,
    handleChange,
    validateForm,
    processFormData
  };
};

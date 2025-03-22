
import React from 'react';
import { Input } from '@/components/ui/input';
import { VALIDATION } from '@/lib/constants';

interface PersonalInfoFormProps {
  firstName: string;
  lastName: string;
  age: string;
  phoneNumber: string;
  communicationEmail: string;
  errors: {
    firstName: string;
    lastName: string;
    age: string;
    phoneNumber: string;
    communicationEmail: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  firstName,
  lastName,
  age,
  phoneNumber,
  communicationEmail,
  errors,
  handleChange,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <Input
            name="firstName"
            value={firstName}
            onChange={handleChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <Input
            name="lastName"
            value={lastName}
            onChange={handleChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
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
            value={age}
            onChange={handleChange}
            error={!!errors.age}
            helperText={errors.age}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <Input
            type="tel"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
          />
        </div>
      </div>
    </>
  );
};

export default PersonalInfoForm;

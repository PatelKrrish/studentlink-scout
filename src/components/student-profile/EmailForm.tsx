
import React from 'react';
import { Input } from '@/components/ui/input';

interface EmailFormProps {
  collegeEmail: string | undefined;
  communicationEmail: string;
  errors: {
    communicationEmail: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const EmailForm: React.FC<EmailFormProps> = ({
  collegeEmail,
  communicationEmail,
  errors,
  handleChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">College Email</label>
        <Input
          type="email"
          value={collegeEmail || ''}
          disabled
          helperText="Your verified college email"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Communication Email (Optional)</label>
        <Input
          type="email"
          name="communicationEmail"
          value={communicationEmail}
          onChange={handleChange}
          error={!!errors.communicationEmail}
          helperText={errors.communicationEmail}
        />
      </div>
    </div>
  );
};

export default EmailForm;

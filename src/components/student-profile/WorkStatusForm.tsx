
import React from 'react';
import { WORK_STATUS_OPTIONS } from '@/lib/constants';
import { WorkStatus } from '@/lib/types';

interface WorkStatusFormProps {
  workStatus: WorkStatus;
  experience: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const WorkStatusForm: React.FC<WorkStatusFormProps> = ({
  workStatus,
  experience,
  handleChange,
}) => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium mb-1">Work Status</label>
        <select
          name="workStatus"
          value={workStatus}
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
          value={experience}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40 resize-none"
          placeholder="Describe your past work experience, skills, and projects..."
        />
      </div>
    </>
  );
};

export default WorkStatusForm;

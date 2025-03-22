
import React from 'react';
import { DEPARTMENT_OPTIONS, YEAR_OPTIONS, SEMESTER_OPTIONS } from '@/lib/constants';

interface AcademicFormProps {
  department: string;
  year: string;
  semester: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const AcademicForm: React.FC<AcademicFormProps> = ({
  department,
  year,
  semester,
  handleChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Department</label>
        <select
          name="department"
          value={department}
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
          value={year}
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
          value={semester}
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
  );
};

export default AcademicForm;

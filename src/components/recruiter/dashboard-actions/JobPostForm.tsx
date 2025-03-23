
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { JOB_TYPE_OPTIONS } from '@/lib/constants/jobs';

// Currency options
const CURRENCY_OPTIONS = [
  { value: 'INR', label: 'Indian Rupee (₹)' },
  { value: 'USD', label: 'US Dollar ($)' },
  { value: 'EUR', label: 'Euro (€)' },
  { value: 'GBP', label: 'British Pound (£)' },
];

interface JobPostFormProps {
  onJobSubmitted: () => void;
}

const JobPostForm = ({ onJobSubmitted }: JobPostFormProps) => {
  const [jobForm, setJobForm] = useState({
    jobTitle: '',
    jobType: '',
    location: '',
    salary: '',
    currency: 'INR', // Default to INR
    description: '',
    skills: '',
    applyUrl: '',
  });

  const handleJobFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setJobForm(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setJobForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitJob = () => {
    // Format salary with currency
    const formattedSalary = `${jobForm.currency} ${jobForm.salary}`;
    
    // In a real app, this would save to the database
    console.log("Job posting data:", { ...jobForm, salary: formattedSalary });
    
    onJobSubmitted();
  };

  return (
    <>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="jobTitle" className="text-right">
            Job Title
          </Label>
          <Input
            id="jobTitle"
            placeholder="e.g. Software Engineer Intern"
            className="col-span-3"
            value={jobForm.jobTitle}
            onChange={handleJobFormChange}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="jobType" className="text-right">
            Job Type
          </Label>
          <Select 
            value={jobForm.jobType} 
            onValueChange={(value) => handleSelectChange('jobType', value)}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              {JOB_TYPE_OPTIONS.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="location" className="text-right">
            Location
          </Label>
          <Input
            id="location"
            placeholder="e.g. New Delhi, India or Remote"
            className="col-span-3"
            value={jobForm.location}
            onChange={handleJobFormChange}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="salary" className="text-right">
            Salary Range
          </Label>
          <div className="col-span-3 flex gap-2">
            <Select 
              value={jobForm.currency} 
              onValueChange={(value) => handleSelectChange('currency', value)}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                {CURRENCY_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              id="salary"
              placeholder="e.g. 50,000 - 70,000"
              className="flex-1"
              value={jobForm.salary}
              onChange={handleJobFormChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="description" className="text-right pt-2">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Job description, responsibilities, and requirements..."
            className="col-span-3"
            rows={6}
            value={jobForm.description}
            onChange={handleJobFormChange}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="skills" className="text-right">
            Required Skills
          </Label>
          <Input
            id="skills"
            placeholder="e.g. React, Node.js, SQL (comma separated)"
            className="col-span-3"
            value={jobForm.skills}
            onChange={handleJobFormChange}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="applyUrl" className="text-right">
            Apply URL
          </Label>
          <Input
            id="applyUrl"
            placeholder="https://your-company.com/careers/job-id"
            className="col-span-3"
            value={jobForm.applyUrl}
            onChange={handleJobFormChange}
          />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={handleSubmitJob}>
          Post Job
        </Button>
      </DialogFooter>
    </>
  );
};

export default JobPostForm;

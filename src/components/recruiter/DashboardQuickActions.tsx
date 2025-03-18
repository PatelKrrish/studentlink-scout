
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ROUTES } from '@/lib/constants';
import { toast } from 'sonner';
import { JOB_TYPE_OPTIONS } from '@/lib/constants/jobs';

// Add currency options
const CURRENCY_OPTIONS = [
  { value: 'INR', label: 'Indian Rupee (₹)' },
  { value: 'USD', label: 'US Dollar ($)' },
  { value: 'EUR', label: 'Euro (€)' },
  { value: 'GBP', label: 'British Pound (£)' },
];

const DashboardQuickActions = () => {
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);
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
    
    toast.success("Job posted successfully!");
    setIsJobDialogOpen(false);
    
    // Reset form
    setJobForm({
      jobTitle: '',
      jobType: '',
      location: '',
      salary: '',
      currency: 'INR',
      description: '',
      skills: '',
      applyUrl: '',
    });
  };

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Recruiter Dashboard</CardTitle>
        <CardDescription>Manage your recruitment activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Button asChild className="h-24 flex flex-col justify-center">
            <Link to={ROUTES.SEARCH_STUDENTS}>
              <span className="text-lg">Browse Students</span>
              <span className="text-xs opacity-80">Find and connect with students</span>
            </Link>
          </Button>
          <Dialog open={isJobDialogOpen} onOpenChange={setIsJobDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-24 flex flex-col justify-center">
                <span className="text-lg">Post Job</span>
                <span className="text-xs opacity-80">Create a new job posting</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Job Posting</DialogTitle>
                <DialogDescription>
                  Fill out the details below to post a new job or internship opportunity.
                </DialogDescription>
              </DialogHeader>
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
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-muted rounded-lg p-4 text-center">
            <span className="text-2xl font-bold">0</span>
            <p className="text-xs text-muted-foreground">Active Jobs</p>
          </div>
          <div className="bg-muted rounded-lg p-4 text-center">
            <span className="text-2xl font-bold">0</span>
            <p className="text-xs text-muted-foreground">Applications</p>
          </div>
          <div className="bg-muted rounded-lg p-4 text-center">
            <span className="text-2xl font-bold">0</span>
            <p className="text-xs text-muted-foreground">Interviews</p>
          </div>
          <div className="bg-muted rounded-lg p-4 text-center">
            <span className="text-2xl font-bold">0</span>
            <p className="text-xs text-muted-foreground">Hired</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardQuickActions;

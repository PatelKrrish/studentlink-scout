
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { JOB_TYPE_OPTIONS } from '@/lib/constants/jobs';
import JobPostForm from './JobPostForm';

const JobPostButton = () => {
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);
  
  const handleJobSubmitted = () => {
    setIsJobDialogOpen(false);
    toast.success("Job posted successfully!");
  };

  return (
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
        <JobPostForm onJobSubmitted={handleJobSubmitted} />
      </DialogContent>
    </Dialog>
  );
};

export default JobPostButton;

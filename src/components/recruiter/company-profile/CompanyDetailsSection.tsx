
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface CompanyDetailsSectionProps {
  website: string;
  approved: boolean;
}

const CompanyDetailsSection = ({ website, approved }: CompanyDetailsSectionProps) => {
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  
  return (
    <div className="w-full mt-4">
      <div className="flex justify-between text-sm mb-1">
        <span>Website:</span>
        <a href={website} target="_blank" rel="noopener noreferrer" className="text-primary">
          {website}
        </a>
      </div>
      <div className="flex justify-between text-sm">
        <span>Status:</span>
        {approved ? (
          <span className="text-green-500">Approved</span>
        ) : (
          <button 
            onClick={() => setApprovalDialogOpen(true)}
            className="text-amber-500 hover:text-amber-600 hover:underline"
          >
            Pending Approval
          </button>
        )}
      </div>
      
      {/* Approval Dialog */}
      <Dialog open={approvalDialogOpen} onOpenChange={setApprovalDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pending Approval</DialogTitle>
            <DialogDescription>
              Your recruiter account is pending approval from the college administrators.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">For quicker approval, please contact the college admin team with your company details:</p>
            <div className="bg-muted p-4 rounded-md">
              <p><strong>Email:</strong> admin@talentbridge.edu</p>
              <p><strong>Phone:</strong> +1 (555) 987-6543</p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setApprovalDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompanyDetailsSection;

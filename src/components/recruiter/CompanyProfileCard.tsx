
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { INDUSTRY_OPTIONS } from '@/lib/constants';
import { RecruiterProfile } from '@/lib/types';
import { useState } from 'react';

interface CompanyProfileCardProps {
  recruiterProfile: RecruiterProfile;
  updateRecruiterProfile: (profile: Partial<RecruiterProfile> & { id: string }) => Promise<void>;
}

const CompanyProfileCard = ({ recruiterProfile, updateRecruiterProfile }: CompanyProfileCardProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  
  // Profile edit form state
  const [profileForm, setProfileForm] = useState({
    companyName: recruiterProfile?.companyName || '',
    industry: recruiterProfile?.industry || '',
    website: recruiterProfile?.website || '',
    description: recruiterProfile?.description || '',
  });
  
  // Handle form change
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm({ ...profileForm, [name]: value });
  };
  
  // Handle select change
  const handleIndustryChange = (value: string) => {
    setProfileForm({ ...profileForm, industry: value });
  };
  
  // Handle form submission
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await updateRecruiterProfile({
        ...profileForm,
        id: recruiterProfile.id
      });
      
      setDialogOpen(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error('Failed to update profile', error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle>Company Profile</CardTitle>
        <CardDescription>Your company details</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={recruiterProfile.logoUrl} alt={recruiterProfile.companyName} />
          <AvatarFallback>{recruiterProfile.companyName.charAt(0)}</AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-bold">{recruiterProfile.companyName}</h3>
        <Badge className="mt-2">{recruiterProfile.industry}</Badge>
        <p className="text-sm text-muted-foreground mt-4">{recruiterProfile.description || 'No company description provided.'}</p>
        <div className="w-full mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Website:</span>
            <a href={recruiterProfile.website} target="_blank" rel="noopener noreferrer" className="text-primary">
              {recruiterProfile.website}
            </a>
          </div>
          <div className="flex justify-between text-sm">
            <span>Status:</span>
            {recruiterProfile.approved ? (
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
        </div>
      </CardContent>
      <CardFooter>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Company Profile</DialogTitle>
              <DialogDescription>
                Update your company information here.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleProfileSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="companyName" className="text-right">
                    Company Name
                  </Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={profileForm.companyName}
                    onChange={handleProfileChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="industry" className="text-right">
                    Industry
                  </Label>
                  <Select 
                    value={profileForm.industry} 
                    onValueChange={handleIndustryChange}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDUSTRY_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="website" className="text-right">
                    Website
                  </Label>
                  <Input
                    id="website"
                    name="website"
                    value={profileForm.website}
                    onChange={handleProfileChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={profileForm.description}
                    onChange={handleProfileChange}
                    className="col-span-3"
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        
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
      </CardFooter>
    </Card>
  );
};

export default CompanyProfileCard;

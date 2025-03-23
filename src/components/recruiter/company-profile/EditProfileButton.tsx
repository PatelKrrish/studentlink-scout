
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RecruiterProfile } from '@/lib/types';
import { INDUSTRY_OPTIONS } from '@/lib/constants';
import { toast } from 'sonner';

interface EditProfileButtonProps {
  recruiterProfile: RecruiterProfile;
  updateRecruiterProfile: (profile: Partial<RecruiterProfile> & { id: string }) => Promise<void>;
}

const EditProfileButton = ({ recruiterProfile, updateRecruiterProfile }: EditProfileButtonProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  
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
      toast("Profile updated successfully");
    } catch (error) {
      console.error('Failed to update profile', error);
      toast("Failed to update profile", {
        description: "An error occurred while updating your profile.",
        action: {
          label: "Try Again",
          onClick: () => setDialogOpen(true)
        }
      });
    }
  };

  return (
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
  );
};

export default EditProfileButton;

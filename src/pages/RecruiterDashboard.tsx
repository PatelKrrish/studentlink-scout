
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ROUTES } from '@/lib/constants';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { INDUSTRY_OPTIONS } from '@/lib/constants';
import { toast } from 'sonner';

const RecruiterDashboard = () => {
  const { user, recruiterProfile, updateRecruiterProfile } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  
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
    
    if (!recruiterProfile) return;
    
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
  
  // Filter students based on search term
  const filteredStudents = searchTerm.trim() === ''
    ? [] // No longer using mock data, will be fetched from backend
    : [];
      
  if (!user || !recruiterProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Company Profile Card */}
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
                  <span className={recruiterProfile.approved ? 'text-green-500' : 'text-amber-500'}>
                    {recruiterProfile.approved ? 'Approved' : 'Pending Approval'}
                  </span>
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
            </CardFooter>
          </Card>

          {/* Quick Actions and Stats */}
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
                <Button variant="outline" className="h-24 flex flex-col justify-center">
                  <span className="text-lg">Post Job</span>
                  <span className="text-xs opacity-80">Create a new job posting</span>
                </Button>
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
        </div>

        {/* Student Search Preview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Student Talent Pool</CardTitle>
              <CardDescription>Preview of available students</CardDescription>
            </div>
            <Button asChild>
              <Link to={ROUTES.SEARCH_STUDENTS}>View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                placeholder="Search students by name or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredStudents.length > 0 ? (
                filteredStudents.map(student => (
                  // ... student card rendering (will be empty since we've removed mock data)
                  <div key={student.id}></div>
                ))
              ) : (
                <div className="col-span-3 text-center py-10">
                  <p className="text-muted-foreground">No students found matching your search criteria.</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">Showing {filteredStudents.length} students</p>
            <Button variant="link" asChild>
              <Link to={ROUTES.SEARCH_STUDENTS}>View all students</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default RecruiterDashboard;

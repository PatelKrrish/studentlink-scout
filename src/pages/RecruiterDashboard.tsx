
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DUMMY_STUDENTS, ROUTES } from '@/lib/constants';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const RecruiterDashboard = () => {
  const { user, recruiterProfile } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter students based on search term (simplified version)
  const filteredStudents = searchTerm.trim() === ''
    ? DUMMY_STUDENTS.slice(0, 3) // Show only first 3 in dashboard
    : DUMMY_STUDENTS.filter(student =>
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.experience.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 3);
      
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
              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
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
                  <Card key={student.id}>
                    <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                      <Avatar className="h-10 w-10 mr-2">
                        <AvatarImage src={student.profilePicture} alt={`${student.firstName} ${student.lastName}`} />
                        <AvatarFallback>{student.firstName[0]}{student.lastName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{student.firstName} {student.lastName}</CardTitle>
                        <CardDescription>{student.department.replace('_', ' ')}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm line-clamp-2">{student.experience}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {student.certificates && student.certificates.slice(0, 2).map((cert, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{cert}</Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">View Profile</Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 text-center py-10">
                  <p className="text-muted-foreground">No students found matching your search criteria.</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">Showing {filteredStudents.length} of {DUMMY_STUDENTS.length} students</p>
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

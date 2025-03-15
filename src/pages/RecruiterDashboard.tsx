
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Search, UserIcon } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ROUTES, DUMMY_STUDENTS } from '@/lib/constants';
import { StudentProfile } from '@/lib/types';

// Helper function to ensure the correct workStatus type
const formatWorkStatus = (status: string): 'available' | 'employed' | 'not_available' => {
  if (status === 'available' || status === 'employed' || status === 'not_available') {
    return status;
  }
  return 'available'; // Default fallback
};

const RecruiterDashboard = () => {
  const { user, recruiterProfile } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Format the dummy data to match the StudentProfile type
  const [students, setStudents] = useState<StudentProfile[]>(
    DUMMY_STUDENTS.map(student => ({
      ...student,
      workStatus: formatWorkStatus(student.workStatus || 'available'),
      experience: student.experience || '',
      certificates: student.certificates || []
    }) as StudentProfile[])
  );
  
  const [filteredStudents, setFilteredStudents] = useState<StudentProfile[]>(students);

  // Redirect if not logged in or not a recruiter
  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (user.role !== 'recruiter') {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  // If recruiter isn't approved yet, show pending approval message
  if (!recruiterProfile?.approved) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-bold mb-4">Approval Pending</h1>
            <p className="text-muted-foreground mb-6">
              Your recruiter account is currently awaiting approval by our admin team. 
              You'll be notified once your account is approved.
            </p>
            <Button variant="outline" asChild>
              <a href={`mailto:admin@college.edu`}>Contact Admin</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setFilteredStudents(students);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = students.filter(student => {
      return (
        student.firstName.toLowerCase().includes(searchLower) ||
        student.lastName.toLowerCase().includes(searchLower) ||
        student.department.toLowerCase().includes(searchLower) ||
        (student.experience && student.experience.toLowerCase().includes(searchLower))
      );
    });
    
    setFilteredStudents(filtered);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Find Talent</h1>
              <p className="text-muted-foreground">Browse verified student profiles from our college</p>
            </div>
            
            <form onSubmit={handleSearch} className="w-full md:w-auto flex gap-2">
              <Input
                type="text"
                placeholder="Search by name, skill, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-80"
              />
              <Button type="submit">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <Card key={student.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full overflow-hidden bg-muted">
                          {student.profilePicture ? (
                            <img src={student.profilePicture} alt={`${student.firstName} ${student.lastName}`} className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center">
                              <UserIcon className="h-6 w-6 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">{student.firstName} {student.lastName}</h3>
                          <p className="text-sm text-muted-foreground">Year {student.year}, {student.department.replace('_', ' ')}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <p className="text-sm"><span className="font-medium">Status:</span> {student.workStatus.replace('_', ' ')}</p>
                        <p className="text-sm truncate"><span className="font-medium">Email:</span> {student.collegeEmail}</p>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <Button variant="outline" size="sm" className="w-full">View Profile</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No students match your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RecruiterDashboard;

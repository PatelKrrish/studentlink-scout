
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Search, BookmarkPlus, Building, Filter, Mail } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/Card';
import { useAuth } from '@/context/AuthContext';
import { ROUTES, DUMMY_STUDENTS } from '@/lib/constants';
import { toast } from 'sonner';
import { StudentProfile } from '@/lib/types';

const RecruiterDashboard = () => {
  const { user, recruiterProfile } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStudents, setFilteredStudents] = useState<StudentProfile[]>(DUMMY_STUDENTS);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Redirect if not logged in or not a recruiter
  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (user.role !== 'recruiter') {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  if (!recruiterProfile?.approved) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <Card className="max-w-xl w-full animate-scale-in">
            <CardHeader>
              <CardTitle className="text-2xl">Approval Pending</CardTitle>
              <CardDescription>
                Your recruiter account is awaiting approval from college administrators.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                To ensure the security of our student community, all recruiter accounts must be
                verified before accessing student profiles. This process typically takes 1-2 business days.
              </p>
              <p>
                You'll receive an email notification once your account has been approved.
              </p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate API search delay
    setTimeout(() => {
      let results = [...DUMMY_STUDENTS];
      
      // Apply text search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        results = results.filter(student => 
          student.firstName.toLowerCase().includes(query) ||
          student.lastName.toLowerCase().includes(query) ||
          (student.experience && student.experience.toLowerCase().includes(query))
        );
      }
      
      // Apply department filter
      if (selectedDepartment) {
        results = results.filter(student => student.department === selectedDepartment);
      }
      
      // Apply year filter
      if (selectedYear) {
        results = results.filter(student => student.year === parseInt(selectedYear));
      }
      
      setFilteredStudents(results);
      setIsSearching(false);
    }, 800);
  };

  const handleBookmark = (studentId: string) => {
    toast.success('Student profile bookmarked');
  };

  const handleSendOffer = (studentId: string) => {
    toast.success('Offer sent successfully');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Recruiter Dashboard</h1>
              <p className="text-muted-foreground">
                Find and connect with talented students
              </p>
            </div>
            <Card className="w-full md:w-auto p-4 flex items-center space-x-4">
              <Building className="w-6 h-6 text-primary" />
              <div>
                <p className="font-medium">{recruiterProfile?.companyName || 'Your Company'}</p>
                <p className="text-sm text-muted-foreground">Approved Recruiter</p>
              </div>
            </Card>
          </div>

          {/* Search Section */}
          <Card className="mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="w-5 h-5 mr-2" />
                Find Students
              </CardTitle>
              <CardDescription>
                Search for students by keywords, skills, or use natural language
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search students (e.g., 'Computer Science student with web development skills')"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button onClick={handleSearch} loading={isSearching}>
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>

              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 pt-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Filter className="w-4 h-4 mr-1" />
                  Filters:
                </div>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40"
                >
                  <option value="">All Departments</option>
                  <option value="computer_science">Computer Science</option>
                  <option value="information_technology">Information Technology</option>
                  <option value="business">Business Administration</option>
                  <option value="finance">Finance</option>
                </select>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40"
                >
                  <option value="">All Years</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">
              {isSearching ? 'Searching...' : `${filteredStudents.length} Student Profiles`}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.map((student) => (
                <Card key={student.id} hover="lift" className="animate-fade-in">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          {student.profilePicture ? (
                            <img
                              src={student.profilePicture}
                              alt={`${student.firstName} ${student.lastName}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <User className="w-6 h-6 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {student.firstName} {student.lastName}
                          </CardTitle>
                          <CardDescription>
                            {student.year}rd Year, {student.department?.split('_').map(word => 
                              word.charAt(0).toUpperCase() + word.slice(1)
                            ).join(' ')}
                          </CardDescription>
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleBookmark(student.id)}
                        className="h-8 w-8"
                        title="Bookmark profile"
                      >
                        <BookmarkPlus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                        {student.workStatus === 'available'
                          ? '🟢 Available for Work'
                          : student.workStatus === 'employed'
                          ? '🟠 Currently Employed'
                          : '🔴 Not Available'}
                      </div>
                      
                      {student.experience && (
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {student.experience}
                        </p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full text-sm"
                      onClick={() => handleSendOffer(student.id)}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Send Offer
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              {filteredStudents.length === 0 && !isSearching && (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No students match your search criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RecruiterDashboard;

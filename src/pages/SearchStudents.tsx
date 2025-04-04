
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/auth';
import { StudentProfile, WorkStatus } from '@/lib/types';
import { profileService } from '@/services/profile-service';
import { jobOffersService } from '@/services/job-offers-service';

// Import components
import StudentSearchFilters from '@/components/students/StudentSearchFilters';
import StudentResults from '@/components/students/StudentResults';
import StudentPagination from '@/components/students/StudentPagination';
import StudentResultsInfo from '@/components/students/StudentResultsInfo';

const SearchStudents = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 6;
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [workStatusFilter, setWorkStatusFilter] = useState<'' | WorkStatus>('');
  
  // Data fetching state
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch students with filters
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const data = await profileService.getAllStudents({
          search: searchTerm,
          department: departmentFilter,
          workStatus: workStatusFilter
        });
        setStudents(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch students');
        toast({
          title: "Error",
          description: "Failed to load students. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchStudents();
  }, [searchTerm, departmentFilter, workStatusFilter, toast]);
  
  // Calculate pagination
  const totalPages = Math.ceil(students.length / studentsPerPage);
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, departmentFilter, workStatusFilter]);
  
  // Handlers
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const handleViewProfile = (student: StudentProfile) => {
    // In a real app, this would navigate to the student's profile
    toast({
      title: "Profile Access",
      description: `Viewing ${student.firstName} ${student.lastName}'s profile`,
    });
  };
  
  const handleConnect = async (student: StudentProfile) => {
    if (!user || user.role !== 'recruiter') {
      toast({
        title: "Access Denied",
        description: "Only recruiters can connect with students",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // This would normally create a connection or job offer
      await jobOffersService.createJobOffer({
        recruiterId: user.id,
        studentId: student.id,
        position: "Software Developer", // Default position, would be customizable in real app
        description: "We would like to connect regarding a potential opportunity",
        location: "Remote",
        type: "full-time",
      });
      
      toast({
        title: "Connection Request",
        description: `Request sent to ${student.firstName} ${student.lastName}`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to send connection request",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Find Students</h1>
          <p className="text-muted-foreground">Browse through our verified student profiles and connect with potential candidates.</p>
        </div>
        
        {/* Search and Filters */}
        <StudentSearchFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          departmentFilter={departmentFilter}
          setDepartmentFilter={setDepartmentFilter}
          workStatusFilter={workStatusFilter}
          setWorkStatusFilter={setWorkStatusFilter}
        />
        
        {/* Results Count */}
        <StudentResultsInfo 
          loading={loading}
          totalStudents={students.length}
          currentPage={currentPage}
          studentsPerPage={studentsPerPage}
        />
        
        {/* Student Grid */}
        <StudentResults 
          loading={loading}
          students={students}
          currentPage={currentPage}
          studentsPerPage={studentsPerPage}
          onViewProfile={handleViewProfile}
          onConnect={handleConnect}
          isRecruiter={user?.role === 'recruiter'}
        />
        
        {/* Pagination */}
        {!loading && students.length > 0 && (
          <StudentPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SearchStudents;

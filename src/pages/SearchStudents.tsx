
import React, { useState, useEffect } from 'react';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { DEPARTMENT_OPTIONS, WORK_STATUS_OPTIONS } from '@/lib/constants';
import { StudentProfile, WorkStatus } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { profileService, jobOffersService } from '@/services/api';
import { useAuth } from '@/context/AuthContext';

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
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);
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
  
  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page, last page, current page, and neighbors
      const leftNeighbor = Math.max(1, currentPage - 1);
      const rightNeighbor = Math.min(totalPages, currentPage + 1);
      
      if (currentPage > 2) {
        pages.push(1);
        if (currentPage > 3) {
          pages.push('ellipsis1');
        }
      }
      
      for (let i = leftNeighbor; i <= rightNeighbor; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 1) {
        if (currentPage < totalPages - 2) {
          pages.push('ellipsis2');
        }
        pages.push(totalPages);
      }
    }
    
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => handlePageChange(currentPage - 1)}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
          
          {pages.map((page, index) => {
            if (page === 'ellipsis1' || page === 'ellipsis2') {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationLink>...</PaginationLink>
                </PaginationItem>
              );
            }
            
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={currentPage === page}
                  onClick={() => handlePageChange(Number(page))}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => handlePageChange(currentPage + 1)}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };
  
  const getDepartmentLabel = (value: string) => {
    const option = DEPARTMENT_OPTIONS.find(option => option.value === value);
    return option ? option.label : value;
  };
  
  const getWorkStatusLabel = (value: WorkStatus) => {
    const option = WORK_STATUS_OPTIONS.find(option => option.value === value);
    return option ? option.label : value;
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <Input
              placeholder="Search by name or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Departments</SelectItem>
                {DEPARTMENT_OPTIONS.map((dept) => (
                  <SelectItem key={dept.value} value={dept.value}>
                    {dept.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select 
              value={workStatusFilter} 
              onValueChange={(value: '' | WorkStatus) => setWorkStatusFilter(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                {WORK_STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status.value} value={status.value as WorkStatus}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Results Count */}
        <div className="mb-4 text-sm text-muted-foreground">
          {loading ? (
            "Loading students..."
          ) : (
            `Showing ${indexOfFirstStudent + 1}-${Math.min(indexOfLastStudent, students.length)} of ${students.length} results`
          )}
        </div>
        
        {/* Student Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="flex flex-col h-full">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : currentStudents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentStudents.map((student) => (
              <Card key={student.id} className="flex flex-col h-full">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={student.profilePicture} alt={`${student.firstName} ${student.lastName}`} />
                    <AvatarFallback>{student.firstName[0]}{student.lastName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{student.firstName} {student.lastName}</h3>
                    <p className="text-sm text-muted-foreground">{getDepartmentLabel(student.department)}</p>
                    <Badge 
                      variant={student.workStatus === 'available' ? 'default' : 
                        student.workStatus === 'employed' ? 'secondary' : 'outline'}
                      className="mt-1"
                    >
                      {getWorkStatusLabel(student.workStatus)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="line-clamp-3 text-sm">{student.experience}</p>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-1">Year {student.year}, Semester {student.semester}</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {student.certificates && student.certificates.map((cert, index) => (
                        <Badge key={index} variant="outline">{cert}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => handleViewProfile(student)}
                    className="flex-1"
                  >
                    View Profile
                  </Button>
                  <Button 
                    onClick={() => handleConnect(student)}
                    className="flex-1"
                    disabled={!user || user.role !== 'recruiter'}
                  >
                    Connect
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No students found</h3>
            <p className="text-muted-foreground">Try adjusting your search filters</p>
          </div>
        )}
        
        {/* Pagination */}
        {!loading && students.length > 0 && renderPagination()}
      </main>
      <Footer />
    </div>
  );
};

export default SearchStudents;

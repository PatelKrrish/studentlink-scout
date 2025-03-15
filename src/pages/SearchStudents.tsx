
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { DEPARTMENT_OPTIONS, DUMMY_STUDENTS, WORK_STATUS_OPTIONS } from '@/lib/constants';
import { StudentProfile } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const SearchStudents = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 6;
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [workStatusFilter, setWorkStatusFilter] = useState('');
  
  // Placeholder data from constants
  const allStudents = DUMMY_STUDENTS;
  
  // Filter students based on search and filter criteria
  const filteredStudents = allStudents.filter((student) => {
    const matchesSearch = searchTerm === '' || 
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.experience.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesDepartment = departmentFilter === '' || student.department === departmentFilter;
    const matchesWorkStatus = workStatusFilter === '' || student.workStatus === workStatusFilter;
    
    return matchesSearch && matchesDepartment && matchesWorkStatus;
  });
  
  // Calculate pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  
  // Handlers
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const handleViewProfile = (student: StudentProfile) => {
    // In a real app, this would navigate to the student's profile
    // For now, just show a toast
    toast({
      title: "Profile Access",
      description: `Viewing ${student.firstName} ${student.lastName}'s profile`,
    });
  };
  
  const handleConnect = (student: StudentProfile) => {
    toast({
      title: "Connection Request",
      description: `Request sent to ${student.firstName} ${student.lastName}`,
    });
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
  
  const getWorkStatusLabel = (value: string) => {
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
            <Select value={workStatusFilter} onValueChange={setWorkStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                {WORK_STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Results Count */}
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {indexOfFirstStudent + 1}-{Math.min(indexOfLastStudent, filteredStudents.length)} of {filteredStudents.length} results
        </div>
        
        {/* Student Grid */}
        {currentStudents.length > 0 ? (
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
        {filteredStudents.length > 0 && renderPagination()}
      </main>
      <Footer />
    </div>
  );
};

export default SearchStudents;

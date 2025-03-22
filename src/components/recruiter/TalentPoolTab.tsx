
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import StudentSearchFilters from '@/components/students/StudentSearchFilters';
import StudentResults from '@/components/students/StudentResults';
import StudentResultsInfo from '@/components/students/StudentResultsInfo';
import StudentPagination from '@/components/students/StudentPagination';
import { StudentProfile, WorkStatus } from '@/lib/types';
import { profileService } from '@/services/profile-service';
import { useToast } from '@/hooks/use-toast';

const TalentPoolTab = () => {
  // Student search state
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [workStatusFilter, setWorkStatusFilter] = useState<'' | WorkStatus>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  const studentsPerPage = 6;
  
  // Load student data
  useEffect(() => {
    const loadStudents = async () => {
      try {
        setLoading(true);
        const fetchedStudents = await profileService.getAllStudents({
          search: searchTerm,
          department: departmentFilter,
          workStatus: workStatusFilter
        });
        setStudents(fetchedStudents);
      } catch (error) {
        console.error('Error loading students:', error);
        toast({
          title: 'Error',
          description: 'Failed to load student data. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadStudents();
  }, [searchTerm, departmentFilter, workStatusFilter, toast]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, departmentFilter, workStatusFilter]);

  const handleViewProfile = (student: StudentProfile) => {
    window.open(`/student/profile/${student.id}`, '_blank');
  };

  const handleConnect = (student: StudentProfile) => {
    toast({
      title: 'Connection Request Sent',
      description: `Request sent to ${student.firstName} ${student.lastName}`,
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Card className="p-6">
      <StudentSearchFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        workStatusFilter={workStatusFilter}
        setWorkStatusFilter={setWorkStatusFilter}
      />
      
      <StudentResultsInfo
        loading={loading}
        totalStudents={students.length}
        currentPage={currentPage}
        studentsPerPage={studentsPerPage}
      />
      
      <StudentResults
        loading={loading}
        students={students}
        currentPage={currentPage}
        studentsPerPage={studentsPerPage}
        onViewProfile={handleViewProfile}
        onConnect={handleConnect}
        isRecruiter={true}
      />
      
      {students.length > studentsPerPage && (
        <StudentPagination
          currentPage={currentPage}
          totalItems={students.length}
          itemsPerPage={studentsPerPage}
          onPageChange={handlePageChange}
        />
      )}
    </Card>
  );
};

export default TalentPoolTab;

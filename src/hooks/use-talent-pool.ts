
import { useState, useEffect } from 'react';
import { StudentProfile, WorkStatus } from '@/lib/types';
import { profileService } from '@/services/profile-service';
import { useToast } from '@/hooks/use-toast';

export const useTalentPool = () => {
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

  // Calculate total pages for pagination
  const totalPages = Math.ceil(students.length / studentsPerPage);

  return {
    searchTerm,
    setSearchTerm,
    departmentFilter,
    setDepartmentFilter,
    workStatusFilter,
    setWorkStatusFilter,
    currentPage,
    students,
    loading,
    studentsPerPage,
    totalPages,
    handleViewProfile,
    handleConnect,
    handlePageChange
  };
};

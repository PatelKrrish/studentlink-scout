
import React from 'react';
import { Card } from '@/components/ui/card';
import StudentSearchFilters from '@/components/students/StudentSearchFilters';
import StudentResultsInfo from '@/components/students/StudentResultsInfo';
import { WorkStatus } from '@/lib/types';

interface StudentSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  departmentFilter: string;
  setDepartmentFilter: (value: string) => void;
  workStatusFilter: '' | WorkStatus;
  setWorkStatusFilter: (value: '' | WorkStatus) => void;
  loading: boolean;
  totalStudents: number;
  currentPage: number;
  studentsPerPage: number;
}

const StudentSearch = ({
  searchTerm,
  setSearchTerm,
  departmentFilter,
  setDepartmentFilter,
  workStatusFilter,
  setWorkStatusFilter,
  loading,
  totalStudents,
  currentPage,
  studentsPerPage
}: StudentSearchProps) => {
  return (
    <Card className="p-6 mb-6">
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
        totalStudents={totalStudents}
        currentPage={currentPage}
        studentsPerPage={studentsPerPage}
      />
    </Card>
  );
};

export default StudentSearch;

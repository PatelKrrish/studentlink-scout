
import React from 'react';
import { Card } from '@/components/ui/card';
import StudentResults from '@/components/students/StudentResults';
import StudentPagination from '@/components/students/StudentPagination';
import { StudentProfile } from '@/lib/types';

interface StudentListViewProps {
  loading: boolean;
  students: StudentProfile[];
  currentPage: number;
  studentsPerPage: number;
  totalPages: number;
  onViewProfile: (student: StudentProfile) => void;
  onConnect: (student: StudentProfile) => void;
  onPageChange: (page: number) => void;
}

const StudentListView = ({
  loading,
  students,
  currentPage,
  studentsPerPage,
  totalPages,
  onViewProfile,
  onConnect,
  onPageChange
}: StudentListViewProps) => {
  return (
    <Card className="p-6">
      <StudentResults
        loading={loading}
        students={students}
        currentPage={currentPage}
        studentsPerPage={studentsPerPage}
        onViewProfile={onViewProfile}
        onConnect={onConnect}
        isRecruiter={true}
      />
      
      {students.length > studentsPerPage && (
        <StudentPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </Card>
  );
};

export default StudentListView;

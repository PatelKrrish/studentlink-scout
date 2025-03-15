
import React from 'react';
import { StudentProfile } from '@/lib/types';
import StudentCard from './StudentCard';
import StudentCardSkeleton from './StudentCardSkeleton';

interface StudentResultsProps {
  loading: boolean;
  students: StudentProfile[];
  currentPage: number;
  studentsPerPage: number;
  onViewProfile: (student: StudentProfile) => void;
  onConnect: (student: StudentProfile) => void;
  isRecruiter: boolean;
}

const StudentResults = ({
  loading,
  students,
  currentPage,
  studentsPerPage,
  onViewProfile,
  onConnect,
  isRecruiter,
}: StudentResultsProps) => {
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[...Array(6)].map((_, i) => (
          <StudentCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (currentStudents.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No students found</h3>
        <p className="text-muted-foreground">Try adjusting your search filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {currentStudents.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          onViewProfile={onViewProfile}
          onConnect={onConnect}
          isRecruiter={isRecruiter}
        />
      ))}
    </div>
  );
};

export default StudentResults;

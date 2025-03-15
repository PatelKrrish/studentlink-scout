
import React from 'react';

interface StudentResultsInfoProps {
  loading: boolean;
  totalStudents: number;
  currentPage: number;
  studentsPerPage: number;
}

const StudentResultsInfo = ({ loading, totalStudents, currentPage, studentsPerPage }: StudentResultsInfoProps) => {
  const indexOfFirstStudent = (currentPage - 1) * studentsPerPage + 1;
  const indexOfLastStudent = Math.min(currentPage * studentsPerPage, totalStudents);

  return (
    <div className="mb-4 text-sm text-muted-foreground">
      {loading ? (
        "Loading students..."
      ) : (
        `Showing ${indexOfFirstStudent}-${indexOfLastStudent} of ${totalStudents} results`
      )}
    </div>
  );
};

export default StudentResultsInfo;

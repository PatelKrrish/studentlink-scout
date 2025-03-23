
import React from 'react';
import StudentSearch from './talent-pool/StudentSearch';
import StudentListView from './talent-pool/StudentListView';
import { useTalentPool } from '@/hooks/use-talent-pool';

const TalentPoolTab = () => {
  const {
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
  } = useTalentPool();

  return (
    <div className="space-y-6">
      <StudentSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        workStatusFilter={workStatusFilter}
        setWorkStatusFilter={setWorkStatusFilter}
        loading={loading}
        totalStudents={students.length}
        currentPage={currentPage}
        studentsPerPage={studentsPerPage}
      />
      
      <StudentListView
        loading={loading}
        students={students}
        currentPage={currentPage}
        studentsPerPage={studentsPerPage}
        totalPages={totalPages}
        onViewProfile={handleViewProfile}
        onConnect={handleConnect}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TalentPoolTab;

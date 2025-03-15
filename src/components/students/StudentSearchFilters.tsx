
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DEPARTMENT_OPTIONS, WORK_STATUS_OPTIONS } from '@/lib/constants';
import { WorkStatus } from '@/lib/types';

interface StudentSearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  departmentFilter: string;
  setDepartmentFilter: (value: string) => void;
  workStatusFilter: '' | WorkStatus;
  setWorkStatusFilter: (value: '' | WorkStatus) => void;
}

const StudentSearchFilters = ({
  searchTerm,
  setSearchTerm,
  departmentFilter,
  setDepartmentFilter,
  workStatusFilter,
  setWorkStatusFilter,
}: StudentSearchFiltersProps) => {
  return (
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
  );
};

export default StudentSearchFilters;

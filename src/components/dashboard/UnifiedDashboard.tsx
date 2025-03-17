
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import StudentSearchFilters from '@/components/students/StudentSearchFilters';
import StudentResults from '@/components/students/StudentResults';
import { StudentProfile, WorkStatus } from '@/lib/types';
import { JobOffersContainer } from '@/components/job-offers/JobOffersContainer';
import { Search } from 'lucide-react';

const UnifiedDashboard = () => {
  // Student search state
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [workStatusFilter, setWorkStatusFilter] = useState<'' | WorkStatus>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState<StudentProfile[]>([]); // This would be loaded from an API
  const [loading, setLoading] = useState(false);
  
  // General dashboard state
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  const handleViewProfile = (student: StudentProfile) => {
    console.log('View profile of student:', student);
    // Navigate to student profile or open modal
  };

  const handleConnect = (student: StudentProfile) => {
    console.log('Connect with student:', student);
    // Open connection modal or send connection request
  };

  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Global search for:', globalSearchQuery);
    // Perform search across both students and jobs
  };

  return (
    <div className="container py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-3">100xEngineers Community</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Connect with talented engineers, mentors, and collaborators from the Applied AI cohort.
        </p>
      </div>

      <div className="mb-8">
        <form onSubmit={handleGlobalSearch} className="max-w-3xl mx-auto relative">
          <Input
            type="text"
            placeholder="Find engineers by skills, interests, or availability..."
            value={globalSearchQuery}
            onChange={(e) => setGlobalSearchQuery(e.target.value)}
            className="h-12 pr-12 text-lg"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <Search size={20} />
          </button>
        </form>
      </div>

      <Tabs defaultValue="students" className="w-full">
        <TabsList className="w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="students" className="flex-1">Engineers</TabsTrigger>
          <TabsTrigger value="jobs" className="flex-1">Jobs & Internships</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="mt-6">
          <Card className="p-6">
            <StudentSearchFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              departmentFilter={departmentFilter}
              setDepartmentFilter={setDepartmentFilter}
              workStatusFilter={workStatusFilter}
              setWorkStatusFilter={setWorkStatusFilter}
            />
            <StudentResults
              loading={loading}
              students={students}
              currentPage={currentPage}
              studentsPerPage={6}
              onViewProfile={handleViewProfile}
              onConnect={handleConnect}
              isRecruiter={true}
            />
          </Card>
        </TabsContent>

        <TabsContent value="jobs" className="mt-6">
          <JobOffersContainer />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UnifiedDashboard;

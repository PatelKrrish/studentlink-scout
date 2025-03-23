
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/hooks/use-toast';
import { profileService } from '@/services/profile-service';
import { StudentProfile, WorkStatus } from '@/lib/types';
import { useTalentPool } from '@/hooks/use-talent-pool';
import EngineerCard from '@/components/community/EngineerCard';

const CommunityBrowse = () => {
  const { toast } = useToast();
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [loading, setLoading] = useState(true);
  
  const {
    searchTerm,
    setSearchTerm,
    departmentFilter,
    setDepartmentFilter,
    workStatusFilter,
    setWorkStatusFilter,
    currentPage
  } = useTalentPool();
  
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const data = await profileService.getAllStudents({
          search: globalSearchQuery || searchTerm,
          department: departmentFilter,
          workStatus: workStatusFilter
        });
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
        toast({
          title: 'Error',
          description: 'Failed to load student data. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchStudents();
  }, [globalSearchQuery, searchTerm, departmentFilter, workStatusFilter, toast]);
  
  const handleViewProfile = (student: StudentProfile) => {
    window.open(`/student/profile/${student.id}`, '_blank');
  };
  
  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Global search is immediately applied through the effect
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container py-12 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-3">100xEngineers Community</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with talented engineers, mentors, and collaborators from the Applied AI cohort.
          </p>
        </div>

        <div className="mb-10">
          <form onSubmit={handleGlobalSearch} className="max-w-3xl mx-auto relative">
            <Input
              type="text"
              placeholder="Find engineers by skills, interests, or availability..."
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              className="h-14 px-4 text-lg pr-12 rounded-full border-muted-foreground/20"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Search size={22} />
            </button>
          </form>
        </div>

        <Tabs defaultValue="engineers" className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-8">
            <TabsTrigger value="engineers" className="flex-1">Engineers</TabsTrigger>
            <TabsTrigger value="jobs" className="flex-1">Jobs & Internships</TabsTrigger>
          </TabsList>

          <TabsContent value="engineers" className="mt-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="h-64 animate-pulse bg-muted" />
                ))}
              </div>
            ) : students.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No engineers found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {students.map(student => (
                  <EngineerCard 
                    key={student.id}
                    student={student}
                    onViewProfile={handleViewProfile}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="jobs" className="mt-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">Coming Soon</h3>
              <p className="text-muted-foreground">Job listings will be available shortly</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default CommunityBrowse;

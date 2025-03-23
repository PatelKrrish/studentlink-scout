
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { StudentProfile } from '@/lib/types';
import EngineerProfileCard from './EngineerProfileCard';
import { useToast } from '@/hooks/use-toast';

interface CommunitySectionProps {
  students: StudentProfile[];
  loading: boolean;
}

const CommunitySection = ({ students, loading }: CommunitySectionProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // In a real app, this would filter students or fetch from API
  };
  
  const handleViewProfile = (student: StudentProfile) => {
    // In a real app, this would navigate to the student profile page
    toast({
      title: "Viewing Profile",
      description: `Opening ${student.firstName} ${student.lastName}'s profile`,
    });
    window.open(`/student/profile/${student.id}`, '_blank');
  };
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-3">100xEngineers Community</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Connect with talented engineers, mentors, and collaborators from the Applied AI cohort.
        </p>
      </div>

      <div className="mb-8">
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative">
          <Input
            type="text"
            placeholder="Find engineers by skills, interests, or availability..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="p-6 h-[200px] animate-pulse">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-muted"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-5 bg-muted rounded w-2/3"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-6 bg-muted rounded w-16"></div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-6">
                <div className="h-4 bg-muted rounded w-20"></div>
                <div className="h-10 bg-muted rounded w-28"></div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <EngineerProfileCard
              key={student.id}
              student={student}
              onViewProfile={handleViewProfile}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunitySection;

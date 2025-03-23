
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/auth';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/lib/constants';
import CompanyProfileCard from '@/components/recruiter/company-profile/CompanyProfileCard';
import DashboardQuickActions from '@/components/recruiter/dashboard-actions/DashboardQuickActions';
import TalentPoolTab from '@/components/recruiter/TalentPoolTab';
import JobOffersTab from '@/components/recruiter/JobOffersTab';
import CommunitySection from '@/components/recruiter/community/CommunitySection';
import { StudentProfile } from '@/lib/types';
import { profileService } from '@/services/profile-service';

const RecruiterDashboard = () => {
  const { user, recruiterProfile, updateRecruiterProfile } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!user) {
      navigate(ROUTES.LOGIN);
    } else if (user && user.role !== 'recruiter') {
      navigate(ROUTES.DASHBOARD);
    }
  }, [user, navigate]);
  
  // Fetch students for the community section
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const fetchedStudents = await profileService.getAllStudents({});
        setStudents(fetchedStudents);
      } catch (error) {
        console.error('Error loading students:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user && user.role === 'recruiter') {
      fetchStudents();
    }
  }, [user]);
  
  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container py-8">
          <div className="text-center py-12">
            <Skeleton className="h-12 w-48 mx-auto mb-4" />
            <Skeleton className="h-4 w-72 mx-auto" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!recruiterProfile) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container py-8">
          <Alert>
            <AlertDescription>
              Loading recruiter profile data...
            </AlertDescription>
          </Alert>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-6">Recruiter Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <CompanyProfileCard 
            recruiterProfile={recruiterProfile} 
            updateRecruiterProfile={updateRecruiterProfile} 
          />

          <DashboardQuickActions />
        </div>

        <Tabs defaultValue="community" className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-6">
            <TabsTrigger value="community" className="flex-1">Community</TabsTrigger>
            <TabsTrigger value="students" className="flex-1">Talent Pool</TabsTrigger>
            <TabsTrigger value="jobs" className="flex-1">My Job Postings</TabsTrigger>
          </TabsList>

          <TabsContent value="community" className="mt-6">
            <CommunitySection students={students} loading={loading} />
          </TabsContent>

          <TabsContent value="students" className="mt-6">
            <TalentPoolTab />
          </TabsContent>

          <TabsContent value="jobs" className="mt-6">
            <JobOffersTab />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default RecruiterDashboard;

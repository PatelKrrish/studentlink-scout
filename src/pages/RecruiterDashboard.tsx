
import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/auth';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/lib/constants';
import CompanyProfileCard from '@/components/recruiter/CompanyProfileCard';
import DashboardQuickActions from '@/components/recruiter/DashboardQuickActions';
import TalentPoolTab from '@/components/recruiter/TalentPoolTab';
import JobOffersTab from '@/components/recruiter/JobOffersTab';

const RecruiterDashboard = () => {
  const { user, recruiterProfile, updateRecruiterProfile } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not logged in or not a recruiter
  useEffect(() => {
    if (!user) {
      navigate(ROUTES.LOGIN);
    } else if (user && user.role !== 'recruiter') {
      navigate(ROUTES.DASHBOARD);
    }
  }, [user, navigate]);
  
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Company Profile Card */}
          <CompanyProfileCard 
            recruiterProfile={recruiterProfile} 
            updateRecruiterProfile={updateRecruiterProfile} 
          />

          {/* Quick Actions and Stats */}
          <DashboardQuickActions />
        </div>

        <Tabs defaultValue="students" className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-6">
            <TabsTrigger value="students" className="flex-1">Talent Pool</TabsTrigger>
            <TabsTrigger value="jobs" className="flex-1">My Job Postings</TabsTrigger>
          </TabsList>

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

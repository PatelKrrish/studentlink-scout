
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CompanyProfileCard from '@/components/recruiter/CompanyProfileCard';
import DashboardQuickActions from '@/components/recruiter/DashboardQuickActions';
import TalentPoolTab from '@/components/recruiter/TalentPoolTab';
import JobOffersTab from '@/components/recruiter/JobOffersTab';

const RecruiterDashboard = () => {
  const { user, recruiterProfile, updateRecruiterProfile } = useAuth();
  
  if (!user || !recruiterProfile) {
    return <div>Loading...</div>;
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

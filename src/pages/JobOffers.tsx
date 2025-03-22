
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import JobOffersContainer from '@/components/job-offers/JobOffersContainer';
import { useAuth } from '@/context/auth';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/lib/constants';

const JobOffers = () => {
  const { user, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  // Redirect unauthenticated users to login
  if (!user) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container py-8">
        <JobOffersContainer />
      </main>
      <Footer />
    </div>
  );
};

export default JobOffers;

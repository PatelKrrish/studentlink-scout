
import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import UnifiedDashboard from '@/components/dashboard/UnifiedDashboard';
import { useAuth } from '@/context/auth';
import { ROUTES } from '@/lib/constants';

const Dashboard = () => {
  const { user } = useAuth();

  // Redirect if not logged in
  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16 pb-12">
        <UnifiedDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

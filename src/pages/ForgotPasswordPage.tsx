
import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ForgotPassword from '@/components/auth/ForgotPassword';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/lib/constants';

const ForgotPasswordPage = () => {
  const { user } = useAuth();

  // Redirect if already logged in
  if (user) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <ForgotPassword />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;


import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ResetPassword from '@/components/auth/ResetPassword';
import { useAuth } from '@/context/auth';
import { ROUTES } from '@/lib/constants';

const ResetPasswordPage = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <ResetPassword />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPasswordPage;

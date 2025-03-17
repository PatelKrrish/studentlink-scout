
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VerifyEmail from '@/components/auth/VerifyEmail';

const VerifyEmailPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <VerifyEmail />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VerifyEmailPage;

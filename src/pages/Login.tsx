
import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/lib/constants';

const Login = () => {
  const { user } = useAuth();

  // Redirect if already logged in
  if (user) {
    if (user.role === 'student') {
      return <Navigate to={ROUTES.STUDENT_PROFILE} replace />;
    } else if (user.role === 'recruiter') {
      return <Navigate to={ROUTES.RECRUITER_DASHBOARD} replace />;
    } else if (user.role === 'admin') {
      return <Navigate to={ROUTES.ADMIN_PANEL} replace />;
    }
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <AuthForm type="login" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;

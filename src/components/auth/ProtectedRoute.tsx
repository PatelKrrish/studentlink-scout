
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { ROUTES } from '@/lib/constants';

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  // Check for recruiter only routes
  if (location.pathname === ROUTES.RECRUITER_DASHBOARD && user.role !== 'recruiter') {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  // Check for student only routes
  if (location.pathname === ROUTES.STUDENT_PROFILE && user.role !== 'student') {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

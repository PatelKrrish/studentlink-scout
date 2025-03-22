
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/auth';
import ProfilePhotoCard from '@/components/student-profile/ProfilePhotoCard';
import ProfileForm from '@/components/student-profile/ProfileForm';
import ResumeUploadCard from '@/components/student-profile/ResumeUploadCard';
import { ROUTES } from '@/lib/constants';
import { toast } from 'sonner';

const StudentProfile = () => {
  const { user, studentProfile, updateStudentProfile, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in or not a student
  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (user.role !== 'student') {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  const handleSubmitProfile = async (formData: any) => {
    try {
      await updateStudentProfile(formData);
      toast.success("Profile updated successfully");
      
      // Redirect to the job offers page after profile completion
      navigate(ROUTES.JOB_OFFERS);
    } catch (error) {
      console.error('Failed to update profile', error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Student Profile</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProfilePhotoCard studentProfile={studentProfile} />
            <ProfileForm 
              studentProfile={studentProfile}
              isLoading={isLoading}
              onSubmit={handleSubmitProfile}
            />
            <ResumeUploadCard />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudentProfile;

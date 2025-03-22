
import { StudentProfile, RecruiterProfile } from '@/lib/types';
import { profileService } from '@/services/profile-service';
import { toast } from 'sonner';
import { AuthState } from './types';

export const useProfileMethods = (state: AuthState, setState: React.Dispatch<React.SetStateAction<AuthState>>) => {
  const updateStudentProfile = async (profile: Partial<StudentProfile> & { id: string }) => {
    try {
      setState({ ...state, isLoading: true });

      const updatedProfile = await profileService.updateStudentProfile(profile);
      localStorage.setItem('studentProfile', JSON.stringify(updatedProfile));

      setState({
        ...state,
        studentProfile: updatedProfile,
        isLoading: false,
      });

      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Profile update failed', error);
      setState({ 
        ...state, 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to update profile' 
      });
      toast.error(error instanceof Error ? error.message : 'Failed to update profile');
    }
  };

  const updateRecruiterProfile = async (profile: Partial<RecruiterProfile> & { id: string }) => {
    try {
      setState({ ...state, isLoading: true });

      const updatedProfile = await profileService.updateRecruiterProfile(profile);
      localStorage.setItem('recruiterProfile', JSON.stringify(updatedProfile));

      setState({
        ...state,
        recruiterProfile: updatedProfile,
        isLoading: false,
      });

      toast.success('Company profile updated successfully');
    } catch (error) {
      console.error('Profile update failed', error);
      setState({ 
        ...state, 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to update company profile' 
      });
      toast.error(error instanceof Error ? error.message : 'Failed to update company profile');
    }
  };

  return { updateStudentProfile, updateRecruiterProfile };
};

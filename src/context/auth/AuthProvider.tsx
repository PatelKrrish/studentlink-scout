
import React, { useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useAuthSession } from './useAuthSession';
import { useAuthMethods } from './useAuthMethods';
import { useProfileMethods } from './useProfileMethods';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state, setState } = useAuthSession();
  const { login, register, logout } = useAuthMethods(state, setState);
  const { updateStudentProfile, updateRecruiterProfile } = useProfileMethods(state, setState);

  // For debugging purposes
  useEffect(() => {
    if (state.error) {
      console.error('Auth error:', state.error);
    }
    
    console.log('Auth state changed:', {
      isLoading: state.isLoading,
      user: state.user ? {
        id: state.user.id,
        email: state.user.email,
        verified: state.user.verified
      } : null
    });
  }, [state]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        updateStudentProfile,
        updateRecruiterProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

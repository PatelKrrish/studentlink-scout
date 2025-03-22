
import React from 'react';
import { AuthContext } from './AuthContext';
import { useAuthSession } from './useAuthSession';
import { useAuthMethods } from './useAuthMethods';
import { useProfileMethods } from './useProfileMethods';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state, setState } = useAuthSession();
  const { login, register, logout } = useAuthMethods(state, setState);
  const { updateStudentProfile, updateRecruiterProfile } = useProfileMethods(state, setState);

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

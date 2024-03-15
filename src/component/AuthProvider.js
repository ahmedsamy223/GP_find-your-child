import React from 'react';
// import { AuthContext } from './src/context/auth-context';
import { AuthContext } from './../context/auth-context';
import { useAuth } from './../context/auth-context';

export const AuthProvider = ({ children }) => {
 const auth = useAuth();

 return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
 );
};
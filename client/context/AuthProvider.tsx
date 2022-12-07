import React, { createContext, useState } from 'react';
import { AuthContextType, AuthStateType } from '../types/authContextType';

const AuthContext = createContext<AuthContextType | null>(null);

interface ChildrenComps {
  children: React.ReactElement<any>;
}

export const AuthProvider = ({ children }: ChildrenComps) => {
  const [auth, setAuth] = useState<AuthStateType>({ accessToken: null, firstName: 'Admin', lastName: 'Admin', validLogin: false });

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;

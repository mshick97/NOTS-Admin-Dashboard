export interface AuthStateType {
  accessToken: string | null;
  firstName: string;
  lastName: string;
  validLogin: boolean;
  setAuth?: React.Dispatch<React.SetStateAction<AuthStateType>>;
}

export interface AuthContextType {
  auth: AuthStateType;
  setAuth: React.Dispatch<React.SetStateAction<AuthStateType>>;
}

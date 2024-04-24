import React from 'react';

type UserDataTypes = {
  name: string | null;
  email: string | null;
};

interface User {
  jwt: string | null;
  data: UserDataTypes;
  isLoggedIn: boolean;
}

interface IAuthContext {
  signIn: (data: User) => Promise<void>;
}

export const AuthContext = React.createContext<IAuthContext>({
  signIn: async () => {},
});

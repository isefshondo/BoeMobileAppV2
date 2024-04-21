import React from 'react';
import {AuthReducer, UserStorageTypes} from '../../reducers/Auth/index.reducer';

const AuthStateContext = React.createContext<UserStorageTypes>({
  jwt: null,
  data: null,
});

const AuthDispatchContext = React.createContext<(d: AuthReducer) => void>(
  () => {},
);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = React.memo(
  ({children}) => {
    const [state, dispatch] = React.useReducer(AuthReducer, {
      jwt: null,
      data: null,
    });

    return ();
  },
);

import React from 'react';
import {IAuthContext} from './types';

interface IAuthProvider {
  children: React.ReactNode;
}

export const AuthContext = React.createContext<IAuthContext>({
  signIn: async () => {},
  signOut: () => {},
  isLoggedIn: false,
});

function contextReducer(state, action) {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        isLoggedIn: true,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isLoggedIn: false,
      };
  }
}

export const AuthProvider: React.FC<IAuthProvider> = ({children}) => {
  const [state, dispatch] = React.useReducer(contextReducer, {
    jwt: null,
    data: {
      name: null,
      email: null,
    },
    isLoggedIn: false,
  });

  const contextAuth = React.useMemo(
    () => ({
      signIn: async data => {
        dispatch({type: 'SIGN_IN'});
      },
      signOut: () => {
        dispatch({type: 'SIGN_OUT'});
      },
      isLoggedIn: state.isLoggedIn,
    }),
    [state.isLoggedIn],
  );

  return (
    <AuthContext.Provider value={contextAuth}>{children}</AuthContext.Provider>
  );
};

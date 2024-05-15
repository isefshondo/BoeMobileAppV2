import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthScreenStack} from './src/navigation/AuthStack';
import {RootScreensStack} from './src/navigation/RootStack';
import {AuthContext} from './src/context/Auth';
import {CowInfosCard} from '@/components/CowInfosCard';

function contextReducer(state, action) {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        isLoggedIn: true,
      };
  }
}

function renderRoutesByLoginStatus(isLoggedIn: boolean): React.JSX.Element {
  if (!isLoggedIn) {
    return <AuthScreenStack />;
  }
  return <RootScreensStack />;
}

function App(): React.JSX.Element {
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
    }),
    [],
  );
  return (
    <AuthContext.Provider value={contextAuth}>
      <NavigationContainer>
        {renderRoutesByLoginStatus(state.isLoggedIn)}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;

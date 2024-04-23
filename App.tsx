import React from 'react';
import {storageInstance} from './src/utils/storage/index.utils';
import {NavigationContainer} from '@react-navigation/native';
import {AuthScreenStack} from './src/navigation/AuthStack';
import {RootScreensStack} from './src/navigation/RootStack';

function renderRoutesByLoginStatus(isLoggedIn: boolean): React.JSX.Element {
  if (!isLoggedIn) {
    return <AuthScreenStack />;
  }
  return <RootScreensStack />;
}

function App(): React.JSX.Element {
  const loggedInData = storageInstance.getString('loggedInData');
  const loggedInDataJSON = loggedInData ? JSON.parse(loggedInData) : false;
  const isLoggedIn = loggedInDataJSON ? loggedInDataJSON.isLoggedIn : false;

  return (
    <NavigationContainer>
      {renderRoutesByLoginStatus(isLoggedIn)}
    </NavigationContainer>
  );
}

export default App;

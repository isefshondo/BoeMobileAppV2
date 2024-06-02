import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthScreenStack} from './src/navigation/AuthStack';
import {RootScreensStack} from './src/navigation/RootStack';
import {AuthContext, AuthProvider} from './src/context/Auth';
import {AnalysisResultsProvider} from '@/context/AnalysisResults';

function renderRoutesByLoginStatus(isLoggedIn: boolean): React.JSX.Element {
  if (!isLoggedIn) {
    return <AuthScreenStack />;
  }
  return <RootScreensStack />;
}

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <AnalysisResultsProvider>
        <NavigationContainer>
          <AuthContext.Consumer>
            {({isLoggedIn}) => renderRoutesByLoginStatus(isLoggedIn)}
          </AuthContext.Consumer>
        </NavigationContainer>
      </AnalysisResultsProvider>
    </AuthProvider>
  );
}

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
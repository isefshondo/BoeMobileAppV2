import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignInScreen} from './src/screens/SignInScreen';
import {SignUpScreen} from './src/screens/SignUpScreen';
import {HomeScreen} from './src/screens/HomeScreen';
import {CowAnalysisListScreen} from './src/screens/CowAnalysisListScreen';
import {CowAnalysisScreen} from './src/screens/CowAnalysisScreen';

export type RootStackParams = {
  CowAnalysisScreen: {
    id: string;
  };
};

export type AuthStackParams = {
  SignIn: undefined;
  SignUp: undefined;
};

const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

function AuthScreensStack(): React.JSX.Element {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
}

function renderRoutesByLoginStatus(isLoggedIn: boolean): React.JSX.Element {
  if (!isLoggedIn) {
    return <RootStack.Screen name="AuthStack" component={AuthScreensStack} />;
  }
  return (
    <>
      <RootStack.Screen name="Home" component={HomeScreen} />
      <RootStack.Screen
        name="CowAnalysisList"
        component={CowAnalysisListScreen}
      />
      <RootStack.Screen name="CowAnalysis" component={CowAnalysisScreen} />
    </>
  );
}

function App(): React.JSX.Element {
  const isLoggedIn = false;
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {renderRoutesByLoginStatus(isLoggedIn)}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;

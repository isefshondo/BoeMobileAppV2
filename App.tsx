import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignInScreen} from './src/screens/SignInScreen';
import {SignUpScreen} from './src/screens/SignUpScreen';
import {HomeScreen} from './src/screens/HomeScreen';
import {CowAnalysisListScreen} from './src/screens/CowAnalysisListScreen';
import {CowAnalysisScreen} from './src/screens/CowAnalysisScreen';

export type RootStackParams = {
  Home: undefined;
  CowAnalysisList: undefined;
  CowAnalysis: {
    id: string;
  };
  AuthStack: undefined;
};

export type AuthStackParams = {
  SignIn: undefined;
  SignUp: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParams>();
const AuthStack = createNativeStackNavigator<AuthStackParams>();

function AuthScreensStack(): React.JSX.Element {
  return (
    <AuthStack.Navigator initialRouteName="SignIn">
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
}

function renderRoutesByLoginStatus(isLoggedIn: boolean): React.JSX.Element {
  if (!isLoggedIn) {
    return <AuthScreensStack />;
  }
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name="Home" component={HomeScreen} />
      <RootStack.Screen
        name="CowAnalysisList"
        component={CowAnalysisListScreen}
      />
      <RootStack.Screen name="CowAnalysis" component={CowAnalysisScreen} />
    </RootStack.Navigator>
  );
}

function App(): React.JSX.Element {
  const isLoggedIn = false;
  return (
    <NavigationContainer>
      {renderRoutesByLoginStatus(isLoggedIn)}
    </NavigationContainer>
  );
}

export default App;

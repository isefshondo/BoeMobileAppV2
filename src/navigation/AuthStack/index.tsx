import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SignInScreen} from '../../screens/SignInScreen';
import {SignUpScreen} from '../../screens/SignUpScreen';

export type AuthStackParams = {
  SignIn: null;
  SignUp: null;
};

const AuthStack = createNativeStackNavigator<AuthStackParams>();

export function AuthScreenStack(): React.JSX.Element {
  return (
    <AuthStack.Navigator
      initialRouteName="SignIn"
      screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
}

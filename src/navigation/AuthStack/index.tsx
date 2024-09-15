import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SignInScreen} from '../../screens/SignInScreen';
import {SignUpScreen} from '../../screens/SignUpScreen';
import { SignInController } from '@/screens/sign-in/controller/sign-in.controller';
import { SignUpController } from '@/screens/sign-up/controller/sign-up.controller';

export type AuthStackParams = {
  SignIn: undefined;
  SignUp: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParams>();

export function AuthScreenStack(): React.JSX.Element {
  return (
    <AuthStack.Navigator
      initialRouteName="SignIn"
      screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="SignIn" component={SignInController} />
      <AuthStack.Screen name="SignUp" component={SignUpController} />
    </AuthStack.Navigator>
  );
}

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HomeScreen} from '../../screens/HomeScreen';
import {EditProfileScreen} from '../../screens/EditProfileScreen';

import {CowAnalysisScreen} from '../../screens/CowAnalysisScreen';

export type HomeStackParams = {
  Home: null;
  CowAnalysisList: null;
  CowAnalysisDetails: {id: string};
};

export type RootStackParams = {
  Home: null;
  EditProfile: null;
  ProcessAnalysisCamera: {id?: string};
  ProcessAnalysisResults: {id?: string};
  ProcessAnalysisRegister: {id?: string};
  AuthStack: null;
};

const BottomTab = createNativeStackNavigator<HomeStackParams>();
const RootStack = createNativeStackNavigator<RootStackParams>();

export function HomeScreensStack(): React.JSX.Element {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <BottomTab.Screen name="Home" component={HomeScreen} />
    
      <BottomTab.Screen
        name="CowAnalysisDetails"
        component={CowAnalysisScreen}
      />
    </BottomTab.Navigator>
  );
}

export function RootScreensStack(): React.JSX.Element {
  return (
    <RootStack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <RootStack.Screen name="Home" component={HomeScreen} />
      <RootStack.Screen name="EditProfile" component={EditProfileScreen} />
    </RootStack.Navigator>
  );
}

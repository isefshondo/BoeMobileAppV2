import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HomeScreen} from '../../screens/HomeScreen';
import {EditProfileScreen} from '../../screens/EditProfileScreen';
import {CowAnalysisListScreen} from '../../screens/CowAnalysisListScreen';
import {CowAnalysisScreen} from '../../screens/CowAnalysisScreen';

export type RootStackParams = {
  Home: undefined;
  EditProfile: undefined;
  CowAnalysisList: undefined;
  CowAnalysis: {
    id: string;
  };
  ProcessAnalysisCamera: {
    id?: string;
  };
  ProcessAnalysisResults: {
    id?: string;
  };
  ProcessAnalysisRegistration: {
    id?: string;
  };
  AuthStack: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParams>();

export function RootScreensStack(): React.JSX.Element {
  return (
    <RootStack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <RootStack.Screen name="Home" component={HomeScreen} />
      <RootStack.Screen name="EditProfile" component={EditProfileScreen} />
      <RootStack.Screen
        name="CowAnalysisList"
        component={CowAnalysisListScreen}
      />
      <RootStack.Screen name="CowAnalysis" component={CowAnalysisScreen} />
    </RootStack.Navigator>
  );
}

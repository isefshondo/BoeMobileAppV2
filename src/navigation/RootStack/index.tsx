import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HomeScreen} from '../../screens/HomeScreen';
import {EditProfileScreen} from '../../screens/EditProfileScreen';
import {CowAnalysisListScreen} from '../../screens/CowAnalysisListScreen';
import {CowAnalysisScreen} from '../../screens/CowAnalysisScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DefaultBottomTab} from '@/components/DefaultBottomTab';

export type HomeStackParams = {
  MainHome: null;
  CowAnalysisList: null;
};

export type RootStackParams = {
  Home: null;
  EditProfile: null;
  ProcessAnalysisCamera: {id?: string};
  ProcessAnalysisResults: {id?: string};
  ProcessAnalysisRegister: {id?: string};
  AuthStack: null;
};

const BottomTab = createBottomTabNavigator<HomeStackParams>();
const RootStack = createNativeStackNavigator<RootStackParams>();

const DefaultBottomTabBar = props => <DefaultBottomTab {...props} />;

export function HomeScreensStack(): React.JSX.Element {
  return (
    <BottomTab.Navigator
      initialRouteName="MainHome"
      screenOptions={{headerShown: false}}
      tabBar={DefaultBottomTabBar}>
      <BottomTab.Screen name="MainHome" component={HomeScreen} />
      <BottomTab.Screen
        name="CowAnalysisList"
        component={CowAnalysisListScreen}
      />
    </BottomTab.Navigator>
  );
}

export function RootScreensStack(): React.JSX.Element {
  return (
    <RootStack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <RootStack.Screen name="Home" component={HomeScreensStack} />
      <RootStack.Screen name="EditProfile" component={EditProfileScreen} />
    </RootStack.Navigator>
  );
}

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {DefaultBottomTab} from '../../components/DefaultBottomTab';
import { HomeScreen } from '@/screens/HomeScreen';
import { CowAnalysisListScreen } from '@/screens/CowAnalysisListScreen';
import { EditProfileScreen } from '@/screens/EditProfileScreen';
import { CowAnalysisScreen } from '@/screens/CowAnalysisScreen';

export type BottomTabsParams = {
  InitialRoute: null;
  CowDataListing: null;
};
export type DrawerTabsParams = {
  MainRoutes: null;
  EditProfile: null;
};
export type RootStackParams = {
  Home: null;
  CowDetails: {id: string};
  ProcessAnalysisCamera: {id?: string};
  ProcessAnalysisResults: {id?: string};
  ProcessAnalysisRegister: {id?: string};
};

const BottomTabs = createBottomTabNavigator<BottomTabsParams>();
const DrawerTabs = createDrawerNavigator<DrawerTabsParams>();
const RootStack = createNativeStackNavigator<RootStackParams>();

const MainBottomTab = props => <DefaultBottomTab {...props} />

function BottomTabsScreenStack(): React.JSX.Element {
  return (
    <BottomTabs.Navigator initialRouteName='InitialRoute' screenOptions={{headerShown: false}} tabBar={MainBottomTab}>
      <BottomTabs.Screen name='InitialRoute' component={HomeScreen} />
      <BottomTabs.Screen name='CowDataListing' component={CowAnalysisListScreen} />
    </BottomTabs.Navigator>
  );
}

function DrawerTabsScreenStack(): React.JSX.Element {
  return (
    <DrawerTabs.Navigator>
      <DrawerTabs.Screen name='MainRoutes' component={BottomTabsScreenStack} />
      <DrawerTabs.Screen name='EditProfile' component={EditProfileScreen} />
    </DrawerTabs.Navigator>
  );
}

export function RootScreensStack(): React.JSX.Element {
  return (
    <RootStack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
      <RootStack.Screen name='Home' component={DrawerTabsScreenStack} />
      <RootStack.Screen name='CowDetails' component={CowAnalysisScreen} />
    </RootStack.Navigator>
  );
}
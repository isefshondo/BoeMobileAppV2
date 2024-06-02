import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthScreenStack} from './src/navigation/AuthStack';
import {RootScreensStack} from './src/navigation/RootStack';
import {AuthContext} from './src/context/Auth';
import {CowInfosCard} from '@/components/CowInfosCard';
import { createStackNavigator } from '@react-navigation/stack';
import DiagnosticScreen from 'src/screens/AnaliseProcessScreen/';
import CadastroBovinoScreen from 'src/screens/AnaliseNew';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CowAnalysisListScreen from 'src/screens/CowAnalysisListScreen';

export type RootStackParamList = {
  CowAnalysisListScreen: undefined; 
  DiagnosticScreen: undefined;
  CadastroBovino: undefined;
  


};

const Stack = createStackNavigator();

function contextReducer(state, action) {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        isLoggedIn: true,
      };
  }
}

function renderRoutesByLoginStatus(isLoggedIn: boolean): React.JSX.Element {
  if (!isLoggedIn) {
    return <AuthScreenStack />;
  }
  return <RootScreensStack />;
}

function App(): React.JSX.Element {
  const [state, dispatch] = React.useReducer(contextReducer, {
    jwt: null,
    data: {
      name: null,
      email: null,
    },
    isLoggedIn: false,
  });
  const contextAuth = React.useMemo(
    () => ({
      signIn: async data => {
        dispatch({type: 'SIGN_IN'});
      },
    }),
    [],
  );
  return (
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName="CowAnalysisListScreen">
      <Stack.Screen name="CowAnalysisListScreen" component={CowAnalysisListScreen} />
      <Stack.Screen name="DiagnosticScreen" component={DiagnosticScreen} />
        <Stack.Screen name="CadastroBovino" component={CadastroBovinoScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
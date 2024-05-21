import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {RootStackParams} from '../../navigation/RootStack';

type Props = NativeStackScreenProps<RootStackParams, 'CowDetails'>;

export const CowAnalysisScreen = ({route}: Props) => {
  async function fetchCowData() {
    try {
      // O ID vai aqui
      const res = await fetch('');
      const data = await res.json();
    } catch (error) {}
  }
  return (
    <SafeAreaView>
      <Text>Cow Analysis Screen</Text>
      <Text>Cow ID: {route.params.id}</Text>
    </SafeAreaView>
  );
};

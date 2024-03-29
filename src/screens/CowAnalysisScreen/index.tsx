import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {RootStackParams} from '../../../App';

type Props = NativeStackScreenProps<RootStackParams, 'CowAnalysis'>;

export const CowAnalysisScreen = ({route}: Props) => {
  return (
    <SafeAreaView>
      <Text>Cow Analysis Screen</Text>
      <Text>Cow ID: {route.params.id}</Text>
    </SafeAreaView>
  );
};

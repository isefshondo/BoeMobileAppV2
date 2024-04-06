import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {RootStackParams} from '../../../App';

// TODO: Define the correct type
export type CowAnalysisListDataTypes = ReadonlyArray<any>;

export const CowAnalysisListScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [cowAnalysisListData, setCowAnalysisListData] =
    React.useState<CowAnalysisListDataTypes>();

  const fetchCowAnalysisList = async () => {
    const res = await fetch('');
    const data = await res.json();
    setCowAnalysisListData(data);
  };

  React.useEffect(() => {
    fetchCowAnalysisList();
  }, []);

  const handleCardPress = (id: string) => {
    navigation.navigate('CowAnalysis', {
      id,
    });
  };

  return (
    <SafeAreaView>
      <Text>Cow Analysis List Screen</Text>
    </SafeAreaView>
  );
};

import React from 'react';
import {TreatmentStatus} from '../../components/CowInfosCard/enums/status.enum';
import {Illness} from '../../components/CowInfosCard/enums/illness.enum';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface ICowAnalysisListData {
  id: string;
  numberIdentification: string;
  name: string;
  treatmentStatus: TreatmentStatus;
  illness: Illness;
  chancePercentage: number;
}

export type CowAnalysisListDataTypes = ReadonlyArray<ICowAnalysisListData>;

export const CowAnalysisListScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [cowAnalysisListData, setCowAnalysisListData] =
    React.useState<CowAnalysisListDataTypes>();

  const fetchCowAnalysisList = async () => {
    const res = await fetch('../../utils/mocks/Cow.json');
    const data = await res.json();
    console.log(data);
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

// import {useNavigation} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import React from 'react';
// import {SafeAreaView, Text} from 'react-native';
// import {RootStackParams} from '../../../App';

// // TODO: Define the correct type
// export type CowAnalysisListDataTypes = ReadonlyArray<any>;

// export const CowAnalysisListScreen: React.FC = () => {
//   const navigation =
//     useNavigation<NativeStackNavigationProp<RootStackParams>>();
//   const [cowAnalysisListData, setCowAnalysisListData] =
//     React.useState<CowAnalysisListDataTypes>();

//   const fetchCowAnalysisList = async () => {
//     const res = await fetch('../../utils/mocks/Cow.json');
//     const data = await res.json();
//     console.log(data);
//     setCowAnalysisListData(data);
//   };

//   React.useEffect(() => {
//     fetchCowAnalysisList();
//   }, []);

//   const handleCardPress = (id: string) => {
//     navigation.navigate('CowAnalysis', {
//       id,
//     });
//   };

//   return (
//     <SafeAreaView>
//       <Text>Cow Analysis List Screen</Text>
//     </SafeAreaView>
//   );
// };

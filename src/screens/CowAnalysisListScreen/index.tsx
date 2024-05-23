import {DrawerActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {CowAnalysisListDataTypes} from './types';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SearchBar} from '@/components/SearchBar';
import {styles} from './styles';
import NotificationIcon from '../../assets/bell_icon.svg';
import SideMenuIcon from '../../assets/menu.svg';
import FiltersIcon from '../../assets/filters_icon.svg';
import {TreatmentStatus} from '@/components/CowInfosCard/enums/status.enum';
import {Illness} from '@/components/CowInfosCard/enums/illness.enum';
import { CowInfosCard } from '@/components/CowInfosCard';

const DUMMY_COW_ANALYSIS_LIST_DATA = [
  {
    id: 1,
    numberIdentification: 'AU0278',
    name: 'Chica',
    treatmentStatus: TreatmentStatus.NO_TREATMENT,
    illness: Illness.BOVINE_DERMATOPHYTOSIS,
    chancePercentage: 20,
  },
  {
    id: 2,
    numberIdentification: 'AU0279',
    name: 'Mimosa',
    treatmentStatus: TreatmentStatus.IN_TREATMENT,
    illness: Illness.BOVINE_DERMATOPHILOSIS,
    chancePercentage: 50,
  },
  {
    id: 3,
    numberIdentification: 'AU0280',
    name: 'Bela',
    treatmentStatus: TreatmentStatus.CONCLUDED_TREATMENT,
    illness: Illness.BOVINE_DERMATOPHYTOSIS,
    chancePercentage: 80,
  },
  {
    id: 4,
    numberIdentification: 'AU0281',
    name: 'Pérola',
    treatmentStatus: TreatmentStatus.NO_TREATMENT,
    illness: Illness.BOVINE_DERMATOPHILOSIS,
    chancePercentage: 10,
  },
  {
    id: 4,
    numberIdentification: 'AU0281',
    name: 'Piranha',
    treatmentStatus: TreatmentStatus.NO_TREATMENT,
    illness: Illness.BOVINE_DERMATOPHILOSIS,
    chancePercentage: 10,
  },
];

export const CowAnalysisListScreen: React.FC = () => {
  const navigation = useNavigation();

  const [searchInputValue, setSearchInputValue] = React.useState<string>('');
  const [fetchedCowListData, setFetchedCowListData] =
    React.useState<CowAnalysisListDataTypes>(DUMMY_COW_ANALYSIS_LIST_DATA);
  const [cowAnalysisListData, setCowAnalysisListData] =
    React.useState<CowAnalysisListDataTypes>(DUMMY_COW_ANALYSIS_LIST_DATA);

  const handlePressCowInfosCard = (id: string) => {
    navigation.navigate('CowDetailsListing', {id});
  };

  const fetchCowAnalysisListData = async () => {
    const res = await fetch('');
    const data = await res.json();
    setFetchedCowListData(data);
  };

  // React.useEffect(() => {
  //   fetchCowAnalysisListData();
  // }, []);

  React.useEffect(() => {
    if (fetchedCowListData.length !== 0) {
      if (searchInputValue?.length !== 0) {
        const fetchedDataBySearchInput = fetchedCowListData.filter(data => {
          return Object.values(data).some(value => {
            const searchableValue = value.toString().toLowerCase();
            return searchableValue.includes(searchInputValue.toLowerCase());
          });
        });
        setCowAnalysisListData(fetchedDataBySearchInput);
      } else {
        setCowAnalysisListData(fetchedCowListData);
      }
    }
  }, [fetchedCowListData, searchInputValue]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <SideMenuIcon
            style={styles.sideMenuIcon}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <NotificationIcon style={styles.notificationBellIcon} />
        </TouchableOpacity>
      </View>
      {/* Main Container Data */}
      <View>
        <View style={styles.searchBarContainer}>
          {/* Page's title */}
          <View>
            <View
              style={{
                width: 294,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 32}}>Registro de</Text>
              <Text style={{fontSize: 32, fontWeight: '700'}}>análises</Text>
            </View>
            <Text style={{fontSize: 32, fontWeight: '700'}}>de imagem</Text>
          </View>
          {/* Page's content */}
          <SearchBar setSearchInputValue={setSearchInputValue} />
        </View>
        <View>
          <View style={styles.filtersRow}>
            <Text>Filtros</Text>
            <FiltersIcon style={styles.filtersIcon} />
          </View>
          <FlatList
            data={cowAnalysisListData}
            renderItem={({item, index}) => (
              <CowInfosCard name={item.name} numberIdentification={item.numberIdentification} treatmentStatus={item.treatmentStatus} illness={item.illness} chancePercentage={item.chancePercentage} />
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

import {
  DrawerActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
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
import {CowInfosCard} from '@/components/CowInfosCard';
import * as StorageInstance from '../../utils/storage/index.utils';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '@/navigation/RootStack';

type NavigationProps = NativeStackNavigationProp<RootStackParams>;

export const CowAnalysisListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  const [searchInputValue, setSearchInputValue] = React.useState<string>('');
  const [fetchedCowListData, setFetchedCowListData] =
    React.useState<CowAnalysisListDataTypes>([]);
  const [cowAnalysisListData, setCowAnalysisListData] =
    React.useState<CowAnalysisListDataTypes>([]);
  const [jwt, setJwt] = React.useState<string>('');

  async function getJWTFromStorage() {
    const loggedInData = await StorageInstance.getFromStorage('loggedInData');
    const userJWT = loggedInData ? JSON.parse(loggedInData).jwt : '';
    setJwt(userJWT);
  }

  async function fetchCowAnalysisListData() {
    try {
      const res = await fetch('http://192.168.3.105:3000/api/animal', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!res.ok) {
        throw new Error(
          `HTTP ERROR! Status: ${res.status}; Message: ${res.statusText}`,
        );
      }

      const data = await res.json();

      console.log(data);

      const cowListData = data.map(item => ({
        id: item.animal._id,
        numberIdentification: item.animal.number_identification,
        name: item.animal.name,
        treatmentStatus: item.lastAnalysis?.treatment_status,
        illness: item.lastAnalysis?.disease_class,
        chancePercentage: item.lastAnalysis?.accuracy,
      }));

      setFetchedCowListData(cowListData);
    } catch (error) {
      console.error(error);
    }
  }

  function handlePressCowInfosCard(id: any) {
    navigation.navigate('CowDetails', {id});
  }

  useFocusEffect(
    React.useCallback(() => {
      getJWTFromStorage();
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      fetchCowAnalysisListData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jwt]),
  );

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
      <View style={styles.bodyContainer}>
        <View style={styles.searchBarContainer}>
          <View>
            <View style={styles.screenTitleContainer}>
              <Text style={styles.screenTitleNonBold}>Registro de</Text>
              <Text style={styles.screenTitleBold}>análises</Text>
            </View>
            <Text style={styles.screenTitleBold}>de imagem</Text>
          </View>
          <SearchBar setSearchInputValue={setSearchInputValue} />
        </View>
        <View>
          <View style={styles.filtersRow}>
            <Text>Filtros</Text>
            <FiltersIcon style={styles.filtersIcon} />
          </View>
          <View style={styles.registeredAnimalsContainer}>
            <FlatList
              style={styles.flatListContainer}
              data={cowAnalysisListData}
              renderItem={({item}) => (
                <>
                  <CowInfosCard
                    name={item.name}
                    numberIdentification={item.numberIdentification}
                    treatmentStatus={item.treatmentStatus}
                    illness={item.illness}
                    chancePercentage={item.chancePercentage ?? 50}
                    onPress={() => handlePressCowInfosCard(item.id)}
                  />
                  <View style={styles.itemSeparatorComponent} />
                </>
              )}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

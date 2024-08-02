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
import CowSkeletonIcon from '../../assets/loading_cow.svg';
import {arrayToBase64} from '../../utils/array-to-base64/index.utils';

type NavigationProps = NativeStackNavigationProp<RootStackParams>;

export const CowAnalysisListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  const [searchInputValue, setSearchInputValue] = React.useState<string>('');
  const [fetchedCowListData, setFetchedCowListData] =
    React.useState<CowAnalysisListDataTypes>([]);
  const [cowAnalysisListData, setCowAnalysisListData] =
    React.useState<CowAnalysisListDataTypes>([]);
  const [jwt, setJwt] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  async function getJWTFromStorage() {
    const loggedInData = await StorageInstance.getFromStorage('loggedInData');
    const userJWT = loggedInData ? JSON.parse(loggedInData).jwt : '';
    setJwt(userJWT);
  }

  async function fetchCowAnalysisListData() {
    try {
      // const res = await fetch('http://192.168.3.105:3000/api/animal', {
      //   method: 'GET',
      //   headers: {
      //     Authorization: `Bearer ${jwt}`,
      //   },
      // });

      // if (!res.ok) {
      //   throw new Error(
      //     `HTTP ERROR! Status: ${res.status}; Message: ${res.statusText}`,
      //   );
      // }

      const data = [
        {
          animal: {
            _id: '66ac2c450206d3ff098d8dbc',
            number_identification: 'AU0123',
            user_id: '66ac25df0044baaefefa3a59',
            name: 'Mimosa',
            created_at: '2024-08-02T00:46:37.238Z',
            disease_class: 'Dermatite',
            result: 'positivo',
            treatment_status: 'Sem tratamento',
          },
          lastAnalysis: {
            treatment_status: 'Sem tratamento',
            disease_class: 'Dermatite',
            accuracy: 0.5094009041786194,
          },
        },
      ];

      const cowListData = data.map(item => ({
        id: item.animal._id,
        numberIdentification: item.animal.number_identification,
        name: item.animal.name,
        treatmentStatus: item.lastAnalysis?.treatment_status,
        illness: item.lastAnalysis?.disease_class,
        chancePercentage: item.lastAnalysis?.accuracy * 100,
        // animalProfilePicture: arrayToBase64(item.animal.image.data),
      }));

      setFetchedCowListData(cowListData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
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
            if (!value) {
              return false;
            }
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
            {isLoading ? (
              <View style={styles.loadingFlatList}>
                <CowSkeletonIcon style={styles.skeletonCowIcon} />
                <Text style={styles.loadingText}>Carregando...</Text>
              </View>
            ) : (
              <FlatList
                style={styles.flatListContainer}
                data={cowAnalysisListData}
                renderItem={({item}) => {
                  if (
                    !item.illness ||
                    !item.treatmentStatus ||
                    !item.chancePercentage
                  ) {
                    return null;
                  }
                  return (
                    <>
                      <CowInfosCard
                        name={item.name}
                        numberIdentification={item.numberIdentification}
                        treatmentStatus={item.treatmentStatus}
                        illness={item.illness}
                        chancePercentage={item.chancePercentage}
                        onPress={() => handlePressCowInfosCard(item.id)}
                        image={item.animalProfilePicture}
                      />
                      <View style={styles.itemSeparatorComponent} />
                    </>
                  );
                }}
                keyExtractor={item => item.id.toString()}
              />
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

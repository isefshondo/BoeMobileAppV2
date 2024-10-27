import React, {useCallback, useEffect} from 'react';
import {AnimalListing} from '../view/animal-listing.view';
import {
  DrawerActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import * as StorageInstance from '../../../utils/storage/index.utils';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParams} from '@/navigation/RootStack';

export function AnimalListingController() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [jwt, setJwt] = React.useState('');
  const [searchBarValue, setSearchBarValue] = React.useState('');
  const [animals, setAnimals] = React.useState([]);
  const [filteredAnimals, setFilteredAnimals] = React.useState([]);

  function handleMenuPress() {
    navigation.dispatch(DrawerActions.openDrawer());
  }

  function navigateToAnimalProfile(id: string) {
    navigation.navigate('CowDetails', {id});
  }

  async function getJwtFromStorage() {
    try {
      const loggedInData = await StorageInstance.getFromStorage('loggedInData');
      const userJwt = loggedInData ? JSON.parse(loggedInData).jwt : '';
      setJwt(userJwt);
    } catch (error) {
      setIsError(true);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getJwtFromStorage();
    }, []),
  );

  async function fetchAnimals() {
    try {
      const res = await fetch('/api/animal', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const data = await res.json();
      const animalListing = data.map(({animal, lastAnalysis}) => ({
        id: animal.id,
        name: animal.name,
        identifier: animal.number_identification,
        treatmentStatus: lastAnalysis.treatment_status,
        illness: lastAnalysis.disease_class,
        chancePercentage: lastAnalysis.accuracy * 100,
        animalProfilePicture: '',
      }));
      setAnimals(animalListing);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      // if (jwt) {
      fetchAnimals();
      // }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jwt]),
  );

  function filterAnimalsBySearchBarValue() {
    if (!searchBarValue.length) {
    } else {
      setFilteredAnimals(animals);
    }
  }

  useEffect(() => {
    filterAnimalsBySearchBarValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchBarValue]);

  return (
    <AnimalListing
      isLoading={isLoading}
      isError={isError}
      animals={filteredAnimals}
      handleMenuPress={handleMenuPress}
      handleSearchBarChange={setSearchBarValue}
      navigateToAnimalProfile={navigateToAnimalProfile}
    />
  );
}

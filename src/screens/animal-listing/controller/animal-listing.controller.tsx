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
import axios from 'axios';
import {arrayToBase64} from '@/utils/array-to-base64/index.utils';

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
    const loggedInData = await StorageInstance.getFromStorage('loggedInData');
    const userJwt = loggedInData ? JSON.parse(loggedInData).jwt : '';
    setJwt(userJwt);
  }

  useFocusEffect(
    useCallback(() => {
      getJwtFromStorage();
    }, []),
  );

  async function fetchAnimals() {
    try {
      const res = await axios.get('http://192.168.3.118:3000/api/animal', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const data = await res.data;
      const animalListing = data.map(({animal, lastAnalysis}) => ({
        id: animal.id,
        name: animal.name,
        identifier: animal.number_identification,
        treatmentStatus: lastAnalysis?.treatment_status,
        illness: lastAnalysis?.disease_class,
        chancePercentage: lastAnalysis
          ? lastAnalysis.accuracy * 100
          : undefined,
        animalProfilePicture: arrayToBase64(animal.image.data),
      }));
      setAnimals(animalListing);
      setFilteredAnimals(animalListing);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchAnimals();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jwt]),
  );

  function filterAnimalsBySearchBarValue() {
    if (!searchBarValue.length) {
      setFilteredAnimals(animals);
    } else {
      const filterAnimalBySearchValue = animals.filter((animal) => {
        return animal.name.includes(searchBarValue) || animal.identifier.includes(searchBarValue);
      });
      setFilteredAnimals(filterAnimalBySearchValue);
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

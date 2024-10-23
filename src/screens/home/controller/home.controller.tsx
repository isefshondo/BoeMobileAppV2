import React, {useCallback} from 'react';
import {Home} from '../view/home.view';
import {
  DrawerActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import * as StorageInstance from '../../../utils/storage/index.utils';

export type RequestsErrors = {
  hasAnalyticsFailed: boolean;
  hasGraphicsFailed: boolean;
};
export type RequestsLoading = {
  analytics: boolean;
  graphics: boolean;
};
export type AnimalAnalytics = {
  allRegisteredAnimal: number | null;
  currentPositiveCases: number | null;
  sickAnimals: number | null;
  curedAnimals: number | null;
};

export function HomeController() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = React.useState<RequestsLoading>({
    analytics: true,
    graphics: true,
  });
  const [name, setName] = React.useState('');
  const [jwt, setJwt] = React.useState('');
  const [analytics, setAnalytics] = React.useState<AnimalAnalytics>({
    allRegisteredAnimal: null,
    currentPositiveCases: null,
    sickAnimals: null,
    curedAnimals: null,
  });
  const [graphics, setGraphics] = React.useState<any[]>([]);
  const [error, setError] = React.useState<RequestsErrors>({
    hasAnalyticsFailed: false,
    hasGraphicsFailed: false,
  });

  function handleMenuPress() {
    navigation.dispatch(DrawerActions.openDrawer());
  }

  async function getDataFromStorage() {
    try {
      const loggedInData = await StorageInstance.getFromStorage('loggedInData');
      const parsedLoggedInData = JSON.parse(loggedInData);
      const storagedName = parsedLoggedInData.data.name.split(' ')[0] ?? '';
      const userJwt = parsedLoggedInData.jwt ?? '';
      setName(storagedName);
      setJwt(userJwt);
    } catch (error) {
      // TODO: Handle Error with components or a new screen
    }
  }

  useFocusEffect(
    useCallback(() => {
      getDataFromStorage();
    }, []),
  );

  async function fetchAnalytics() {
    try {
      const res = await fetch('', {
        method: 'GET',
        headers: {Authorization: `Bearer ${jwt}`},
      });
      const data = await res.json();
      setAnalytics({
        allRegisteredAnimal: data.registered_animals,
        currentPositiveCases: data.current_positive_cases_percentage,
        sickAnimals: data.current_positive_cases,
        curedAnimals: data.current_negative_cases,
      });
    } catch (error) {
      // TODO: Verify if it will handle everything in the same view or redirect to an specific error page
      setError(previousState => ({...previousState, hasAnalyticsFailed: true}));
    } finally {
      setIsLoading(previousState => ({...previousState, analytics: false}));
    }
  }

  async function fetchGraphics() {
    try {
      const res = await fetch('', {
        method: 'GET',
        headers: {Authorization: `Bearer ${jwt}`},
      });
      const data = await res.json();
      setGraphics([]);
    } catch (error) {
      setError(previousState => ({...previousState, hasGraphicsFailed: true}));
    } finally {
      setIsLoading(previousState => ({...previousState, graphics: false}));
    }
  }

  useFocusEffect(
    useCallback(() => {
      // if (jwt) {
      fetchAnalytics();
      fetchGraphics();
      // }
    }, [jwt]),
  );

  return (
    <Home
      isLoading={isLoading}
      name={name}
      handleMenuPress={handleMenuPress}
      analytics={analytics}
      graphics={graphics}
      error={{hasAnalyticsFailed: error.hasAnalyticsFailed, hasGraphicsFailed: error.hasGraphicsFailed}}
    />
  );
}

import React, {useCallback} from 'react';
import {Home} from '../view/home.view';
import {
  DrawerActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import * as StorageInstance from '../../../utils/storage/index.utils';
import axios from 'axios';

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
type GraphicsData = {
  data: number[];
  color: () => string;
  labels: string;
};
export type Graphics = {
  labels: string[];
  datasets: GraphicsData[];
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
  const [graphics, setGraphics] = React.useState<Graphics>({
    labels: [],
    datasets: [],
  });
  const [error, setError] = React.useState<RequestsErrors>({
    hasAnalyticsFailed: false,
    hasGraphicsFailed: false,
  });
  const currentDay = new Date();
  const initialGraphicsDate = new Date();
  initialGraphicsDate.setDate(currentDay.getDate() - 30);
  const [startDate, setStartDate] = React.useState(initialGraphicsDate);
  const [endDate, setEndDate] = React.useState(currentDay);

  function handleMenuPress() {
    navigation.dispatch(DrawerActions.openDrawer());
  }

  async function getDataFromStorage() {
    const loggedInData = await StorageInstance.getFromStorage('loggedInData');
    const parsedLoggedInData = JSON.parse(loggedInData);
    const storagedName = parsedLoggedInData.data.name.split(' ')[0] ?? '';
    const userJwt = parsedLoggedInData.jwt ?? '';
    setName(storagedName);
    setJwt(userJwt);
  }

  async function fetchAnalytics() {
    try {
      const res = await axios.get('http://192.168.3.118:4000/api/analytics', {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      });
      const {
        registered_animals,
        current_positive_cases_percentage,
        current_positive_cases,
        current_negative_cases,
      } = res.data;
      setAnalytics({
        allRegisteredAnimal: registered_animals,
        currentPositiveCases: current_positive_cases_percentage,
        sickAnimals: current_positive_cases,
        curedAnimals: current_negative_cases,
      });
    } catch (error) {
      setError(previousState => ({...previousState, hasAnalyticsFailed: true}));
    } finally {
      setIsLoading(previousState => ({...previousState, analytics: false}));
    }
  }

  async function fetchGraphics() {
    try {
      const res = await axios.post(
        'http://192.168.3.118:4000/api/analytics/graphics',
        {
          earliest_date: startDate,
          most_recent_date: endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const data = res.data;
      const formattedGraphicsData = data.datasets.map(item => {
        return {
          data: item.data,
          color: () => `${item.color}`,
          labels: item.labels,
        };
      });
      setGraphics({
        labels: data.labels,
        datasets: formattedGraphicsData,
      });
    } catch (error) {
      console.log(error);
      setError(previousState => ({...previousState, hasGraphicsFailed: true}));
    } finally {
      setIsLoading(previousState => ({...previousState, graphics: false}));
    }
  }

  useFocusEffect(
    useCallback(() => {
      const fetchAllData = async () => {
        await getDataFromStorage();
        if (jwt) {
          await fetchAnalytics();
          await fetchGraphics();
        }
      };
      fetchAllData();
    }, [jwt]),
  );

  return (
    <Home
      isLoading={isLoading}
      name={name}
      handleMenuPress={handleMenuPress}
      analytics={analytics}
      graphics={graphics}
      error={{
        hasAnalyticsFailed: error.hasAnalyticsFailed,
        hasGraphicsFailed: error.hasGraphicsFailed,
      }}
      startGraphicDate={startDate}
      endGraphicDate={endDate}
    />
  );
}

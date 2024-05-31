import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import * as StorageInstance from '../../utils/storage/index.utils';
import {
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '../../utils/metrics/index.utils';
import SideMenuIcon from '../../assets/menu.svg';
import NotificationIcon from '../../assets/bell_icon.svg';
import {styles} from './styles';
import {CowAnalyticsCard} from '@/components/CowAnalyticsCard';
import {
  DrawerActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';

export type CowHerdAnalyticsTypes = {
  animalsCount: number | null;
  currentPositiveCasesPercentage: number | null;
  sickAnimalsCount: number | null;
  curedAnimalsCount: number | null;
};

export const HomeScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = React.useState<string>('');
  const [jwt, setJwt] = React.useState<string>('');
  const [cowHerdAnalytics, setCowHerdAnalytics] =
    React.useState<CowHerdAnalyticsTypes>({
      animalsCount: null,
      currentPositiveCasesPercentage: null,
      sickAnimalsCount: null,
      curedAnimalsCount: null,
    });
  const [graphics, setGraphics] = React.useState<any[]>([]);

  async function getDataFromStorage() {
    const loggedInData = await StorageInstance.getFromStorage('loggedInData');
    const storagedName = loggedInData
      ? JSON.parse(loggedInData).data.name.split(' ')[0]
      : '';
    const userJWT = loggedInData ? JSON.parse(loggedInData).jwt : '';
    setName(storagedName);
    setJwt(userJWT);
  }

  async function genericFetch(url: string) {
    const res = await fetch(url, {
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
    return res.json();
  }

  async function fetchAnalyticsAndGraphics() {
    try {
      const [cowHerdAnalyticsRes, graphicsRes] = await Promise.all([
        genericFetch('http://192.168.3.118:3000/api/analytics'),
        genericFetch('http://192.168.3.118:3000/api/analytics/graphics'),
      ]);
      setCowHerdAnalytics({
        animalsCount: cowHerdAnalyticsRes.animals_count,
        currentPositiveCasesPercentage:
          cowHerdAnalyticsRes.current_positive_cases_percentage,
        sickAnimalsCount: cowHerdAnalyticsRes.sick_animals_count,
        curedAnimalsCount: cowHerdAnalyticsRes.cured_animals_count,
      });
      setGraphics(graphicsRes);
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getDataFromStorage();
    }, []),
  );

  React.useEffect(() => {
    fetchAnalyticsAndGraphics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt]);

  useFocusEffect(
    React.useCallback(() => {
      fetchAnalyticsAndGraphics();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jwt]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <SideMenuIcon
          width={responsiveHorizontalScale(34)}
          height={responsiveVerticalScale(34)}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
        <NotificationIcon
          width={responsiveHorizontalScale(34)}
          height={responsiveVerticalScale(36)}
        />
      </View>
      <View style={styles.dataMainContainer}>
        <View style={styles.greetingsContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 32, fontWeight: 'bold'}}>Olá, </Text>
            <Text style={{fontSize: 32}}>{name}</Text>
          </View>
          <View style={styles.statisticsNumbersContainer}>
            <CowAnalyticsCard
              type="CURRENT_REGISTERED_COWS"
              value={cowHerdAnalytics.animalsCount}
            />
            <CowAnalyticsCard
              type="CURRENT_POSITIVE_CASES"
              value={cowHerdAnalytics.currentPositiveCasesPercentage}
              increasedCasesValue={cowHerdAnalytics.sickAnimalsCount}
              decreasedCasesValue={cowHerdAnalytics.curedAnimalsCount}
            />
          </View>
        </View>
        <View style={styles.graphicsContainer}>
          <View style={styles.graphicsContainerText}>
            <Text style={styles.graphicsContainerTitle}>Gráfico geral</Text>
            <Text style={styles.graphicsContainerText}>últimos 30 dias</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

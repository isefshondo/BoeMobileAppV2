import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import * as StorageInstance from '../../utils/storage/index.utils';
import {
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '../../utils/metrics/index.utils';
import SideMenuIcon from '../../assets/menu.svg';
import NotificationIcon from '../../assets/bell_icon.svg';
import UpGreenIcon from '../../assets/up_green.svg';
import DownRedIcon from '../../assets/down_red.svg';
import {styles} from './styles';

export type CowHerdAnalyticsTypes = {
  animalsCount: number | null;
  currentPositiveCasesPercentage: number | null;
  sickAnimalsCount: number | null;
  curedAnimalsCount: number | null;
};

export const HomeScreen = () => {
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
    const userJWT = loggedInData ? JSON.parse(loggedInData).data.jwt : '';
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
        genericFetch(''),
        genericFetch(''),
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

  React.useEffect(() => {
    getDataFromStorage();
  }, []);

  React.useEffect(() => {
    if (jwt) {
      fetchAnalyticsAndGraphics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <SideMenuIcon
          width={responsiveHorizontalScale(34)}
          height={responsiveVerticalScale(34)}
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
            <View
              style={{
                borderRadius: 10,
                backgroundColor: '#fff',
                width: responsiveHorizontalScale(164),
                height: responsiveVerticalScale(152),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <Text style={{fontSize: 43, fontWeight: '500'}}>
                  {cowHerdAnalytics.animalsCount}
                </Text>
                <Text style={{fontSize: 18, fontWeight: '500'}}>
                  Registrados
                </Text>
              </View>
            </View>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: '#fff',
                width: responsiveHorizontalScale(164),
                height: responsiveVerticalScale(152),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <View
                  style={{
                    width: responsiveHorizontalScale(140),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 43,
                      fontWeight: '500',
                    }}>{`${cowHerdAnalytics.currentPositiveCasesPercentage}%`}</Text>
                  <View style={{justifyContent: 'space-evenly'}}>
                    <View
                      style={{
                        width: responsiveHorizontalScale(39),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <UpGreenIcon
                        width={responsiveHorizontalScale(17)}
                        height={responsiveVerticalScale(17)}
                      />
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: '500',
                          color: '#73ff00',
                        }}>
                        10
                      </Text>
                    </View>
                    <View
                      style={{
                        width: responsiveHorizontalScale(39),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <DownRedIcon
                        width={responsiveHorizontalScale(17)}
                        height={responsiveVerticalScale(17)}
                      />
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: '500',
                          color: '#ff0000',
                        }}>
                        17
                      </Text>
                    </View>
                  </View>
                </View>
                <Text style={{fontSize: 18, fontWeight: '500'}}>
                  Casos positivos
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

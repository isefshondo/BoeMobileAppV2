import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import * as StorageInstance from '../../utils/storage/index.utils';
import {
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '../../utils/metrics/index.utils';
import BoeSymbol from '../../assets/boe_symbol.svg';
import NotificationIcon from '../../assets/bell_icon.svg';
import UpGreenIcon from '../../assets/up_green.svg';
import DownRedIcon from '../../assets/down_red.svg';
import {styles} from './styles';
import {DefaultBottomTab} from '@/components/DefaultBottomTab';

export type AnalyticsDataInfo = {
  animalsCount: number | null;
  currentPositiveCasesPercentage: number | null;
  sickAnimalsCount: number | null;
  curedAnimalsCount: number | null;
  graphics: number[] | null;
};

export const HomeScreen = () => {
  const [getName, setName] = React.useState<string>('');
  const [analyticsDataInfo, setAnalyticsDataInfo] =
    React.useState<AnalyticsDataInfo>({
      animalsCount: null,
      currentPositiveCasesPercentage: null,
      sickAnimalsCount: null,
      curedAnimalsCount: null,
      graphics: null,
    });

  async function fetchHomeData() {
    try {
      const res = await fetch('../../utils/mocks/Analytics.json');
      if (!res.ok) {
        throw new Error(
          `HTTP ERROR! Status: ${res.status}; Message: ${res.statusText}`,
        );
      }
      const data = await res.json();
      setAnalyticsDataInfo({
        animalsCount: data.animals_count,
        currentPositiveCasesPercentage: data.current_positive_cases_percentage,
        sickAnimalsCount: data.sick_animals_count,
        curedAnimalsCount: data.cured_animals_count,
        graphics: data.graphics,
      });
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    const getNameFromStorage = async () => {
      const loggedInData = await StorageInstance.getFromStorage('loggedInData');
      const storagedName = loggedInData
        ? JSON.parse(loggedInData).data.name.split(' ')[0]
        : '';
      setName(storagedName);
    };

    getNameFromStorage();
  }, []);

  React.useEffect(() => {
    fetchHomeData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BoeSymbol
          width={responsiveHorizontalScale(25)}
          height={responsiveVerticalScale(33)}
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
            <Text style={{fontSize: 32}}>{getName}</Text>
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
                <Text style={{fontSize: 43, fontWeight: '500'}}>70</Text>
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
                  <Text style={{fontSize: 43, fontWeight: '500'}}>30%</Text>
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
      <DefaultBottomTab />
    </SafeAreaView>
  );
};

import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {storageInstance} from '../../utils/storage/index.utils';
import {
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '../../utils/metrics/index.utils';
import BoeSymbol from '../../assets/boe_symbol.svg';
import NotificationIcon from '../../assets/bell_icon.svg';
import UpGreenIcon from '../../assets/up_green.svg';
import DownRedIcon from '../../assets/down_red.svg';

export type AnalyticsDataInfo = {
  animalsCount: number | null;
  currentPositiveCasesPercentage: number | null;
  sickAnimalsCount: number | null;
  curedAnimalsCount: number | null;
  graphics: number[] | null;
};

export const HomeScreen: React.FC = () => {
  const storagedName = storageInstance.getString('loggedInData');
  const name = storagedName
    ? JSON.parse(storagedName).data.name.split(' ')[0]
    : '';
  const [analyticsDataInfo, setAnalyticsDataInfo] =
    React.useState<AnalyticsDataInfo>({
      animalsCount: null,
      currentPositiveCasesPercentage: null,
      sickAnimalsCount: null,
      curedAnimalsCount: null,
      graphics: null,
    });
  // TODO: Change the initial value of the filter to the default selected value of the design
  const [graphicsFilter, setGraphicsFilter] = React.useState<string | null>(
    null,
  );

  React.useEffect(() => {
    async function fetchHomeData() {
      try {
        const res = await fetch('../../utils/mocks/Analytics.json');
        if (!res.ok) {
          throw new Error(
            `HTTP ERROR! Status: ${res.status}; Message: ${res.statusText}`,
          );
        }
        const data = await res.json();
        console.log(data);

        setAnalyticsDataInfo({
          animalsCount: data.animals_count,
          currentPositiveCasesPercentage:
            data.current_positive_cases_percentage,
          sickAnimalsCount: data.sick_animals_count,
          curedAnimalsCount: data.cured_animals_count,
          graphics: data.graphics,
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchHomeData();
  }, [graphicsFilter]);

  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#ff0000',
        paddingHorizontal: responsiveHorizontalScale(31.5),
        paddingTop: responsiveVerticalScale(55),
      }}>
      <View
        style={{
          width: '100%',
          height: responsiveVerticalScale(36),
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <BoeSymbol
          width={responsiveHorizontalScale(25)}
          height={responsiveVerticalScale(33)}
        />
        <NotificationIcon
          width={responsiveHorizontalScale(34)}
          height={responsiveVerticalScale(36)}
        />
      </View>
      <View
        style={{
          width: '100%',
          height: responsiveVerticalScale(609),
          backgroundColor: '#00ff00',
        }}>
        <View
          style={{
            width: '100%',
            height: responsiveVerticalScale(219),
            backgroundColor: '#0000ff',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 32, fontWeight: 'bold'}}>Olá, </Text>
            <Text style={{fontSize: 32}}>{name}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#ff0ff0',
            }}>
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
    </SafeAreaView>
  );
};

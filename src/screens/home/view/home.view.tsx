import React from 'react';
import Menu from '../../../assets/menu.svg';
import BoeSymbol from '../../../assets/boe_symbol.svg';
import AnimalIcon from '../../../assets/loading_cow.svg';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CowAnalyticsCard} from '@/components/CowAnalyticsCard';
import {
  responsiveFontSize,
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '@/utils/metrics/index.utils';
import {colors} from '@/themes/colors/index.themes';
import {
  AnimalAnalytics,
  RequestsErrors,
  RequestsLoading,
} from '../controller/home.controller';
import {LineGraphics} from '@/components/line-graphics.component';
import {Skeleton} from '@/components/skeleton.component';
import CalendarAsset from '../../../assets/calendar.svg';
import {Calendar} from 'react-native-calendars';
import {Button} from '@/components/button.component';
import {ScrollView} from 'react-native-gesture-handler';

interface Home {
  isLoading: RequestsLoading;
  name: string;
  handleMenuPress: () => void;
  analytics: AnimalAnalytics;
  graphics: any[];
  error: RequestsErrors;
  startDate: string;
  endDate: string;
}

export const Home: React.FC<Home> = ({
  isLoading,
  name,
  handleMenuPress,
  analytics,
  graphics,
  error,
  startDate,
  endDate,
}) => {
  function renderGraphicsComponent() {
    return graphics.length > 0 ? (
      <View>
        <LineGraphics labels={["a", "Negativos"]} datasets={graphics} />
      </View>
    ) : (
      <View style={styles.graphics}>
        <AnimalIcon width={41} height={34.81} />
        <View style={styles.thirdSpace} />
        <Text style={styles.textLabel}>Nenhum registro foi feito ainda</Text>
      </View>
    );
  }
  function renderGraphics() {
    if (isLoading.graphics)
      return <Skeleton width={361} height={259} borderRadius={20} />;
    return error.hasGraphicsFailed ? (
      <View style={styles.graphicsErrorContainer}>
        <View style={styles.graphicsErrorComponents}>
          <Text style={styles.graphicsErrorText}>
            Algo deu errado ao tentar carregar os dados
          </Text>
        </View>
      </View>
    ) : (
      renderGraphicsComponent()
    );
  }
  function renderCard(
    type: any,
    value: number,
    increasedCasesValue?: number,
    decreasedCasesValue?: number,
  ) {
    const isBiggerCard = type === 'CURRENT_POSITIVE_CASE';
    const width = isBiggerCard ? 182 : 164;
    if (isLoading.analytics) {
      return <Skeleton width={width} height={164} borderRadius={10} />;
    }
    return error.hasAnalyticsFailed ? (
      <Text>Futuro componente de erro</Text>
    ) : (
      <CowAnalyticsCard
        type={type}
        value={value}
        increasedCasesValue={increasedCasesValue}
        decreasedCasesValue={decreasedCasesValue}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Menu width={34} height={34} onPress={handleMenuPress} />
        <BoeSymbol width={25} height={34} />
      </View>
      <View style={styles.main}>
        <View>
          <View style={styles.row}>
            <Text style={styles.textPrimaryBold}>Olá, </Text>
            <Text style={styles.textPrimaryLight}>{name}</Text>
          </View>
          <View style={styles.firstSpace} />
          <View style={styles.justifiedRow}>
            {renderCard(
              'CURRENT_REGISTERED_COWS',
              analytics.allRegisteredAnimal,
            )}
            {renderCard(
              'CURRENT_POSITIVE_CASES',
              analytics.currentPositiveCases,
              analytics.sickAnimals,
              analytics.curedAnimals,
            )}
          </View>
        </View>
        <View style={styles.secondSpace} />
        <View style={styles.graphicsContainer}>
          <View style={[styles.justifiedRow, {alignItems: 'center'}]}>
            <Text style={styles.textSecondary}>Gráfico geral</Text>
            <TouchableOpacity
              style={{
                width: responsiveHorizontalScale(165),
                height: responsiveVerticalScale(30),
                backgroundColor: '#fff',
                elevation: 12,
                borderRadius: 5,
                paddingHorizontal: responsiveHorizontalScale(9),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 10,
                  color: colors.LIGHT_GRAY,
                  fontWeight: '600',
                }}>{`${startDate} à ${endDate}`}</Text>
              <CalendarAsset />
            </TouchableOpacity>
          </View>
          {renderGraphics()}
        </View>
      </View>
      {/* <View style={{position: 'absolute'}}>
        <Calendar theme={{
          weekVerticalMargin: responsiveHorizontalScale(16.67),
          'stylesheet': {
            'day': {
              'basic': {
                width: responsiveHorizontalScale(15),
                height: responsiveVerticalScale(15),
                alignItems: 'center',
                base: {
                  width: responsiveHorizontalScale(15),
                  height: responsiveVerticalScale(15),
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  margin: 0,
                },
              },
              'period': {
                wrapper: {
                  alignItems: 'center',
                  alignSelf: 'stretch',
                  marginLeft: -1,
                },
                base: {
                  width: responsiveHorizontalScale(15),
                  height: responsiveVerticalScale(15),
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              },
            },
            'calendar': {
              'header': {
                dayHeader: {
                  fontSize: 12,
                  paddingBottom: 3,
                },
              },
              'main': {
                container: {
                  padding: 0,
                  margin: 0,
                },
                week: {
                  marginVertical: 0,
                },
              },
            },
          }
        }} style={{paddingVertical: 0}} />
      </View> */}
      {/* <View style={{width: responsiveHorizontalScale(252), height: responsiveVerticalScale(355), borderRadius: 10, backgroundColor: '#ff0000', gap: responsiveVerticalScale(20), alignItems: 'center', justifyContent: 'center', position: 'absolute', right: responsiveHorizontalScale(32), bottom: 0}}>
        <View style={{width: responsiveHorizontalScale(205), height: responsiveVerticalScale(258), backgroundColor: '#fff000', justifyContent: 'space-between'}}>
          <View style={{width: '100%', height: responsiveVerticalScale(25), backgroundColor: '#000'}} />
          <View style={{width: '100%', height: responsiveVerticalScale(210), overflow: 'hidden'}}>
            <ScrollView>
            <Calendar style={{width: '100%', height: '100%'}} />
            </ScrollView>
          </View>
        </View>
        <Button width={205} height={36} isSmall>Aplicar</Button>
      </View> */}
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: responsiveHorizontalScale(38),
    paddingRight: responsiveHorizontalScale(34),
    marginBottom: responsiveVerticalScale(84),
  },
  main: {
    width: '100%',
    paddingLeft: responsiveHorizontalScale(31),
    paddingRight: responsiveHorizontalScale(32),
  },
  row: {
    flexDirection: 'row',
  },
  textPrimaryBold: {
    fontSize: 32,
    fontWeight: '600',
  },
  textPrimaryLight: {
    fontSize: 32,
    fontWeight: '300',
  },
  firstSpace: {
    width: '100%',
    height: responsiveVerticalScale(33),
  },
  justifiedRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondSpace: {
    width: '100%',
    height: responsiveVerticalScale(75),
  },
  graphicsContainer: {
    width: '100%',
    height: responsiveVerticalScale(315),
    justifyContent: 'space-between',
  },
  textSecondary: {
    fontSize: 22,
    fontWeight: '600',
  },
  graphics: {
    width: '100%',
    backgroundColor: '#fff',
    height: responsiveVerticalScale(259),
    borderRadius: 20,
    elevation: 8,
    shadowColor: '#006277',
    shadowRadius: 21,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLabel: {
    fontSize: 17,
    color: colors.LIGHT_GRAY,
  },
  thirdSpace: {
    width: '100%',
    height: responsiveVerticalScale(17),
  },
  graphicsErrorContainer: {
    width: '100%',
    height: responsiveVerticalScale(259),
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  graphicsErrorComponents: {
    width: responsiveHorizontalScale(250),
    height: responsiveVerticalScale(92),
    gap: responsiveVerticalScale(17),
    alignItems: 'center',
    justifyContent: 'center',
  },
  graphicsErrorText: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.GRAY,
    textAlign: 'center',
  },
});

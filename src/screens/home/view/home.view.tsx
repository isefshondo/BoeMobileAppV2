import React from 'react';
import Menu from '../../../assets/menu.svg';
import BoeSymbol from '../../../assets/boe_symbol.svg';
import AnimalIcon from '../../../assets/loading_cow.svg';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CowAnalyticsCard} from '@/components/CowAnalyticsCard';
import {
  responsiveFontSize,
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '@/utils/metrics/index.utils';
import {colors} from '@/themes/colors/index.themes';
import {
  AnimalAnalytics,
  Graphics,
  RequestsErrors,
  RequestsLoading,
} from '../controller/home.controller';
import {LineGraphics} from '@/components/line-graphics.component';
import {Skeleton} from '@/components/skeleton.component';
import { useTranslation } from 'react-i18next';
import { formatDate } from '@/utils/format-date/format-date.util';
import CalendarAsset from '../../../assets/calendar.svg';

interface Home {
  isLoading: RequestsLoading;
  name: string;
  handleMenuPress: () => void;
  analytics: AnimalAnalytics;
  graphics: Graphics[];
  error: RequestsErrors;
  startGraphicDate: Date;
  endGraphicDate: Date;
}

export const Home: React.FC<Home> = ({
  isLoading,
  name,
  handleMenuPress,
  analytics,
  graphics,
  error,
  startGraphicDate,
  endGraphicDate,
}) => {
  const {t} = useTranslation();
  function renderGraphicsComponent() {
    return graphics[0].data.length > 0 || graphics[1].data.length > 0 ? (
      <View>
        <LineGraphics labels={['Positivos', 'Negativos']} datasets={graphics} />
      </View>
    ) : (
      <View style={styles.graphics}>
        <AnimalIcon width={41} height={34.81} />
        <View style={styles.thirdSpace} />
        <Text style={styles.textLabel}>{t('home.graphics.exception')}</Text>
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
          {t('home.graphics.error')}
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
    label: string,
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
        label={label}
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
            <Text style={styles.textPrimaryBold}>{t('home.greeting')}, </Text>
            <Text style={styles.textPrimaryLight}>{name}</Text>
          </View>
          <View style={styles.firstSpace} />
          <View style={styles.justifiedRow}>
            {renderCard(
              'CURRENT_REGISTERED_COWS',
              analytics.allRegisteredAnimal,
              t('home.statistical_card.first_label'),
            )}
            {renderCard(
              'CURRENT_POSITIVE_CASES',
              analytics.currentPositiveCases,
              t('home.statistical_card.second_label'),
              analytics.sickAnimals,
              analytics.curedAnimals,
            )}
          </View>
        </View>
        <View style={styles.secondSpace} />
        <View style={styles.graphicsContainer}>
          <View style={[styles.justifiedRow, {alignItems: 'center'}]}>
            <Text style={styles.textSecondary}>{t('home.graphics.title')}</Text>
            <TouchableOpacity style={styles.graphicsSelectDateButton}>
              <Text style={styles.graphicsSelectDateText}>{`${formatDate(startGraphicDate)} ${t('home.graphics.cycle_connective')} ${formatDate(endGraphicDate)}`}</Text>
              <CalendarAsset />
            </TouchableOpacity>
          </View>
          {renderGraphics()}
        </View>
      </View>
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
  graphicsSelectDateButton: {
    width: responsiveHorizontalScale(165),
    height: responsiveVerticalScale(30),
    backgroundColor: '#fff',
    elevation: 12,
    borderRadius: 5,
    paddingHorizontal: responsiveHorizontalScale(9),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  graphicsSelectDateText: {
    fontSize: responsiveFontSize(12),
    color: colors.LIGHT_GRAY,
    fontWeight: '600',
  },
});

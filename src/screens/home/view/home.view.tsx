import React from 'react';
import Menu from '../../../assets/menu.svg';
import BoeSymbol from '../../../assets/boe_symbol.svg';
import AnimalIcon from '../../../assets/loading_cow.svg';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {CowAnalyticsCard} from '@/components/CowAnalyticsCard';
import {
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

interface Home {
  isLoading: RequestsLoading;
  name: string;
  handleMenuPress: () => void;
  analytics: AnimalAnalytics;
  graphics: any[];
  error: RequestsErrors;
}

export const Home: React.FC<Home> = ({
  isLoading,
  name,
  handleMenuPress,
  analytics,
  graphics,
  error,
}) => {
  function renderGraphicsComponent() {
    return graphics.length > 0 ? (
      <View>
        <LineGraphics labels={[]} datasets={[]} />
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
          <View style={styles.justifiedRow}>
            <Text style={styles.textSecondary}>Gráfico geral</Text>
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
});

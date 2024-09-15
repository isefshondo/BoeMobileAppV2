import React from "react";
import Menu from '../../../assets/menu.svg';
import BoeSymbol from '../../../assets/boe_symbol.svg';
import AnimalIcon from '../../../assets/loading_cow.svg';
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { CowAnalyticsCard } from "@/components/CowAnalyticsCard";
import { responsiveHorizontalScale, responsiveVerticalScale } from "@/utils/metrics/index.utils";
import { colors } from "@/themes/colors/index.themes";
import { AnimalAnalytics, RequestsLoading } from "../controller/home.controller";
import { LineGraphics } from "@/components/line-graphics.component";

interface Home {
  isLoading: RequestsLoading;
  name: string;
  handleMenuPress: () => void;
  analytics: AnimalAnalytics;
  graphics: any[];
}

export const Home: React.FC<Home> = ({isLoading, name, handleMenuPress, analytics, graphics}) => {
  function renderGraphics() {
    return graphics.length > 0 ? <View><LineGraphics labels={[]} datasets={[]} /></View> : <View style={styles.graphics}>
      <AnimalIcon width={41} height={34.81} />
      <View style={styles.thirdSpace} />
      <Text style={styles.textLabel}>Nenhum registro foi feito ainda</Text>
    </View>;
  }

  if (isLoading.analytics || isLoading.graphics) return <Text>Futuro Skeleton</Text>;
  return <SafeAreaView style={styles.container}>
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
          <CowAnalyticsCard type="CURRENT_REGISTERED_COWS" value={analytics.allRegisteredAnimal} />
          <CowAnalyticsCard type="CURRENT_POSITIVE_CASES" value={analytics.currentPositiveCases} increasedCasesValue={analytics.sickAnimals} decreasedCasesValue={analytics.curedAnimals} />
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
    shadowOpacity: .1,
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
})
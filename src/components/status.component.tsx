import { colors } from "@/themes/colors/index.themes";
import { responsiveHorizontalScale, responsiveVerticalScale } from "@/utils/metrics/index.utils";
import { StyleSheet, Text, View } from "react-native";

type StatusTypes = 'Tratamento concluído' | 'Em tratamento' | 'Sem tratamento';
interface Status {
  label: StatusTypes;
  isBoxedStatusDisplay?: boolean;
}

export const Status: React.FC<Status> = ({label, isBoxedStatusDisplay}) => {
  function renderVisualStatusLabel() {
    const visualStatusLabel = {
      'Tratamento concluído': <View  style={[styles.visualStatusLabel, {backgroundColor: colors.LIGHT_BLUE}]} />,
      'Em tratamento': <View style={[styles.visualStatusLabel, {backgroundColor: colors.ORANGE}]} />,
      'Sem tratamento': <Text style={styles.visualStatusLabelText}>--</Text>,
    };
    return visualStatusLabel[label];
  }
  return <View style={[styles.container, isBoxedStatusDisplay && styles.isBorderedStatusDisplayContainer]}>
    {renderVisualStatusLabel()}
    {!isBoxedStatusDisplay && <View style={styles.firstSpace} />}
    <Text style={[styles.label, styles.majorFlexGrow]}>{label}</Text>
  </View>
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  isBorderedStatusDisplayContainer: {
    paddingHorizontal: responsiveHorizontalScale(9),
    height: responsiveVerticalScale(37),
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'space-between',
    elevation: 8,
    shadowColor: '#000',
    shadowRadius: 21,
    shadowOpacity: .25,
    shadowOffset: {width: 0, height: 4},
  },
  visualStatusLabel: {
    width: responsiveHorizontalScale(17),
    height: responsiveVerticalScale(9),
    borderRadius: 13,
  },
  visualStatusLabelText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  firstSpace: {
    width: responsiveHorizontalScale(5),
  },
  label: {
    fontSize: 10,
    fontWeight: '300',
  },
  minorFlexGrow: {
    flexGrow: 1,
  },
  majorFlexGrow: {
    flexGrow: 10,
  },
})
import {
  responsiveFontSize,
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '@/utils/metrics/index.utils';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: responsiveVerticalScale(119),
    borderRadius: 10,
    borderBottomWidth: responsiveVerticalScale(11),
    backgroundColor: '#fff',
    paddingLeft: responsiveHorizontalScale(21),
    paddingRight: responsiveHorizontalScale(56),
    paddingBottom: responsiveVerticalScale(24),
    shadowColor: '#006277',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 21,
    shadowOpacity: 0.1,
    elevation: 4,
  },
  displayInformation: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  displayCowData: {
    width: responsiveHorizontalScale(194),
    height: responsiveVerticalScale(49),
    justifyContent: 'space-between',
  },
  displaySpacer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  displayTreatmentStatus: {
    width: responsiveHorizontalScale(126),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  displayVisualRepresentationST: {
    width: responsiveHorizontalScale(17),
    height: responsiveVerticalScale(9),
    borderRadius: 13,
  },
  displayChancesPercentage: {
    width: responsiveHorizontalScale(48),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  displayCowImage: {
    width: responsiveHorizontalScale(72),
    height: responsiveVerticalScale(71),
    borderRadius: 10,
  },
  numberIdentificationText: {
    fontSize: responsiveFontSize(22),
    fontWeight: '600',
  },
  nameText: {
    fontSize: responsiveFontSize(22),
    fontWeight: '300',
  },
  infoText: {
    fontSize: responsiveFontSize(13),
    fontWeight: '300',
  },
});

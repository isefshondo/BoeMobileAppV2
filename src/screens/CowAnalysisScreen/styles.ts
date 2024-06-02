import {colors} from '@/themes/colors/index.themes';
import {
  responsiveFontSize,
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '@/utils/metrics/index.utils';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: responsiveVerticalScale(49),
    paddingHorizontal: responsiveHorizontalScale(34),
    backgroundColor: '#fff',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  header: {
    width: '100%',
  },
  goBackButton: {
    width: responsiveHorizontalScale(33),
    height: responsiveVerticalScale(33),
  },
  firstSpacer: {
    width: '100%',
    height: responsiveVerticalScale(60),
  },
  cowDetailsContainer: {
    width: '100%',
    height: responsiveVerticalScale(95),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cowProfilePicture: {
    width: responsiveHorizontalScale(95),
    height: responsiveVerticalScale(95),
    borderRadius: 100,
    borderWidth: 5,
    borderColor: colors.BLUE,
  },
  cowPersonalInfoContainer: {
    width: responsiveHorizontalScale(217),
    height: responsiveVerticalScale(80),
    justifyContent: 'space-between',
  },
  numberIdentificationText: {
    fontSize: responsiveFontSize(22),
    fontWeight: '600',
  },
  nameTextInput: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#717171',
    fontSize: responsiveFontSize(23),
    fontWeight: '300',
    color: colors.GRAY,
    paddingBottom: responsiveVerticalScale(12),
  },
  mainDataContainer: {
    width: '100%',
    height: responsiveVerticalScale(268),
    justifyContent: 'space-between',
  },
  illnessInfoContainer: {
    width: '100%',
    height: responsiveVerticalScale(109),
    justifyContent: 'space-between',
  },
  resultTextLabel: {
    fontSize: responsiveFontSize(18),
    fontWeight: '400',
  },
  resultText: {
    fontSize: responsiveFontSize(23),
    fontWeight: 'bold',
  },
  treatmentStatusContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  treatmentStatusTextLabel: {
    width: responsiveHorizontalScale(141),
    fontSize: responsiveFontSize(17),
    fontWeight: 'bold',
  },
  treatmentStatusText: {
    width: responsiveHorizontalScale(159),
    height: responsiveVerticalScale(42),
    borderRadius: 10,
    shadowColor: '#006277',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 21,
    shadowOpacity: 0.1,
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: responsiveVerticalScale(14),
    paddingHorizontal: responsiveHorizontalScale(15),
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  treatmentStatusTextRes: {
    fontSize: responsiveFontSize(13),
    fontWeight: '400',
  },
  treatmentStatusVR: {
    width: responsiveHorizontalScale(17),
    height: responsiveVerticalScale(9),
    backgroundColor: colors.PURPLE,
    borderRadius: 13,
  },
  secondSpacer: {
    width: '100%',
    height: responsiveVerticalScale(61),
  },
  mostRecentAnalysisContainer: {
    width: '100%',
    height: responsiveVerticalScale(266),
    justifyContent: 'space-between',
  },
  mostRecentAnalysisTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lastAnalysisLabel: {
    fontSize: responsiveFontSize(17),
    fontWeight: '600',
  },
  dateText: {
    fontSize: responsiveFontSize(14),
    color: colors.LIGHT_GRAY,
  },
  lastAnalysisInfoContainer: {
    width: '100%',
    height: responsiveVerticalScale(227),
    backgroundColor: '#fff',
    borderRadius: 13,
    shadowColor: '#006277',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 21,
    shadowOpacity: 0.1,
    elevation: 4,
    justifyContent: 'space-between',
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  analysisImage: {
    width: responsiveHorizontalScale(81),
    height: responsiveVerticalScale(79),
    borderRadius: 10,
  },
  analysisResultsContainer: {
    width: '100%',
    height: responsiveVerticalScale(90),
    justifyContent: 'space-between',
  },
  accuracyContainer: {
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  circleResult: {
    width: responsiveHorizontalScale(68),
    height: responsiveVerticalScale(68),
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.YELLOW,
    borderWidth: 5,
    flexDirection: 'row',
  },
  resultsLastAnalysis: {
    width: responsiveHorizontalScale(195),
    height: responsiveVerticalScale(50),
  },
  analysisDescriptionContainer: {
    width: '100%',
    height: responsiveVerticalScale(90),
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  analysisDescriptionText: {
    width: responsiveHorizontalScale(200),
    height: responsiveVerticalScale(65),
  },
});

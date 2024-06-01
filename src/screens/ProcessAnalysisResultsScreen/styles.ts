import {colors} from '@/themes/colors/index.themes';
import {
  responsiveFontSize,
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '@/utils/metrics/index.utils';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
  },
  resultsCardContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  extraInformationContainer: {
    flex: 2,
  },
  resultsBackground: {
    flex: 1,
  },
  actionsContentContainer: {
    width: responsiveHorizontalScale(355),
    height: responsiveVerticalScale(408),
    justifyContent: 'space-between',
    alignSelf: 'center',
    position: 'absolute',
    bottom: responsiveVerticalScale(84),
  },
  resultsContentContainer: {
    width: '100%',
    height: responsiveVerticalScale(282),
    justifyContent: 'space-between',
  },
  buttonSaveAnalysis: {
    width: '100%',
    paddingVertical: responsiveVerticalScale(24.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.BLUE,
  },
  buttonLabel: {
    fontSize: responsiveFontSize(23),
    fontWeight: '600',
    color: '#fff',
  },
  contentBlock: {
    width: '100%',
    height: responsiveVerticalScale(115),
    justifyContent: 'space-between',
  },
  contentText: {
    fontSize: responsiveFontSize(13),
    fontWeight: '200',
  },
  contentHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentTitle: {
    fontSize: responsiveFontSize(23),
    fontWeight: '600',
  },
  headerSpacer: {
    width: responsiveHorizontalScale(23),
    height: '100%',
  },
  contentIcons: {
    width: responsiveHorizontalScale(44),
    height: responsiveVerticalScale(42),
  },
  resultsCard: {
    width: responsiveHorizontalScale(354),
    height: responsiveVerticalScale(215),
    borderRadius: 20,
  },
  artificialIntelligenceResult: {
    flex: 1,
    backgroundColor: colors.BLUE,
    paddingVertical: responsiveVerticalScale(18),
    paddingLeft: responsiveHorizontalScale(28),
    paddingRight: responsiveHorizontalScale(45.79),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  chancePercentage: {
    flex: 2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#006277',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 21,
    shadowOpacity: 0.1,
    elevation: 4,
  },
  artificialIntelligenceResultLabel: {
    fontSize: responsiveFontSize(17),
    color: '#fff',
  },
  artificialIntelligenceResultValue: {
    fontSize: responsiveFontSize(26),
    color: '#fff',
    fontWeight: '700',
  },
  chancePercentageInfoContainer: {
    width: responsiveHorizontalScale(290),
    height: responsiveVerticalScale(87),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chancePercentageIndicator: {
    width: responsiveHorizontalScale(80.5),
    height: responsiveVerticalScale(80.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  chancePercentageHolder: {
    width: responsiveHorizontalScale(70),
    height: responsiveVerticalScale(70),
    backgroundColor: '#fff',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chancePercentageText: {
    fontSize: responsiveFontSize(31),
    fontWeight: '600',
  },
  resultsTextsContainer: {
    flexDirection: 'row',
  },
  percentageFontSize: {
    fontSize: responsiveFontSize(18),
    alignSelf: 'flex-end',
  },
});

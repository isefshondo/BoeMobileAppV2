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
    backgroundColor: '#fff',
  },
  formContainer: {
    width: responsiveHorizontalScale(326),
    height: responsiveVerticalScale(466),
    justifyContent: 'space-between',
    backgroundColor: '#ff0000',
  },
  screenTitle: {
    fontSize: responsiveFontSize(37),
    fontWeight: '700',
  },
  screenDescription: {
    fontSize: responsiveFontSize(17),
    fontWeight: '500',
  },
  goBackIcon: {
    width: responsiveHorizontalScale(33),
    height: responsiveVerticalScale(33),
  },
  inputsContainer: {
    width: '100%',
    height: responsiveVerticalScale(178),
    justifyContent: 'space-between',
  },
  deleteAccountButton: {
    width: responsiveHorizontalScale(304),
    height: responsiveVerticalScale(62),
    borderRadius: 13,
    backgroundColor: 'rgba(255, 84, 84, 0.15)',
    paddingVertical: responsiveVerticalScale(10),
    paddingHorizontal: responsiveHorizontalScale(33),
  },
  deleteAccountButtonLabel: {
    fontSize: responsiveFontSize(23),
    color: '#FF5454',
    opacity: 1,
  },
  labelIconBtnContainer: {
    width: responsiveHorizontalScale(193),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trashIcon: {
    width: responsiveHorizontalScale(24),
    height: responsiveVerticalScale(24),
  },
});

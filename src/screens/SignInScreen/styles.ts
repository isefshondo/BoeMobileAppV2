import {StyleSheet} from 'react-native';
import {
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '../../utils/metrics/index.utils';
import {colors} from '../../themes/colors/index.themes';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: responsiveVerticalScale(932),
    paddingHorizontal: responsiveHorizontalScale(53.5),
    paddingTop: responsiveVerticalScale(85),
    backgroundColor: '#FFF',
  },
  mainContentContainer: {
    height: '100%',
    justifyContent: 'space-evenly',
  },
  formContainer: {
    height: responsiveVerticalScale(379),
    justifyContent: 'space-between',
  },
  inputsContainer: {
    height: responsiveVerticalScale(193),
    justifyContent: 'space-between',
  },
  flexEndLink: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  formFooterContainer: {
    height: responsiveVerticalScale(134),
    justifyContent: 'space-between',
  },
  formFooter: {
    width: '100%',
    alignItems: 'center',
  },
  formMessage: {
    fontSize: 15,
    color: colors.GRAY,
  },
});

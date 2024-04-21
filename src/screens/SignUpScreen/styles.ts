import {StyleSheet} from 'react-native';
import {
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '../../utils/metrics/index.utils';
import {colors} from '../../themes/colors/index.themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveHorizontalScale(53.5),
    paddingTop: responsiveVerticalScale(85),
    backgroundColor: '#FFF',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  inputsContainer: {
    height: responsiveVerticalScale(403),
    justifyContent: 'space-evenly',
  },
  flexEndLink: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  formFooter: {
    width: '100%',
    alignItems: 'center',
  },
  footerMessage: {
    fontSize: 15,
    color: colors.GRAY,
  },
});

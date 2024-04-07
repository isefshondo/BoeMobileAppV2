import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/metrics/index.utils';
import {colors} from '../../themes/colors/index.themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(53.5),
    paddingTop: verticalScale(85),
    backgroundColor: '#FFF',
  },
  mainContentContainer: {
    height: '100%',
    justifyContent: 'space-evenly',
  },
  formContainer: {
    height: verticalScale(379),
    justifyContent: 'space-between',
  },
  inputsContainer: {
    height: verticalScale(193),
    justifyContent: 'space-between',
  },
  flexEndLink: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  formFooterContainer: {
    height: verticalScale(134),
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

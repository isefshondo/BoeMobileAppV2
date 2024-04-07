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
  formContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  inputsContainer: {
    height: verticalScale(403),
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

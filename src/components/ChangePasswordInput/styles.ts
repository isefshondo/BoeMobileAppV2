import {StyleSheet} from 'react-native';
import {colors} from '../../themes/colors/index.themes';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '11.6%',
  },
  passwordInput: {
    borderWidth: 2,
    borderColor: colors.BLUE,
    color: colors.LIGHT_GRAY,
    borderRadius: 13,
    marginHorizontal: 37,
  },
});

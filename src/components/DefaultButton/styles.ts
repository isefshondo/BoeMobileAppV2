import {StyleSheet} from 'react-native';
import {colors} from '../../themes/colors/index.themes';

export const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: colors.BLUE,
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 23,
    color: '#FFF',
  },
});

import {StyleSheet} from 'react-native';
import {colors} from '../../themes/colors/index.themes';

export const styles = StyleSheet.create({
  joinTexts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  breakLineOnBold: {
    flexDirection: 'column',
  },
  titleBold: {
    color: colors.GRAY,
  },
  regularTitle: {
    color: colors.GRAY,
  },
});

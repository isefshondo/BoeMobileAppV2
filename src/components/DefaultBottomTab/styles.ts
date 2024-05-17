import {colors} from '@/themes/colors/index.themes';
import {
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '@/utils/metrics/index.utils';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: responsiveVerticalScale(103.5),
    backgroundColor: '#ff0000',
  },
  routesButtonsContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottomTabBackground: {
    width: '100%',
    height: responsiveVerticalScale(92.5),
    alignSelf: 'center',
    position: 'absolute',
  },
  displayIcon: {
    width: responsiveHorizontalScale(28),
    height: responsiveVerticalScale(28),
  },
  cameraButton: {
    width: responsiveHorizontalScale(73),
    height: responsiveVerticalScale(73),
    borderRadius: 100,
    justifyContent: 'center',
    backgroundColor: colors.BLUE,
  },
});

import {
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '@/utils/metrics/index.utils';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: responsiveHorizontalScale(31.5),
    paddingTop: responsiveVerticalScale(55),
    justifyContent: 'space-around',
  },
  header: {
    width: '100%',
    height: responsiveVerticalScale(36),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataMainContainer: {
    width: '100%',
    height: responsiveVerticalScale(609),
  },
  greetingsContainer: {
    width: '100%',
    height: responsiveVerticalScale(219),
    justifyContent: 'space-between',
  },
  statisticsNumbersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

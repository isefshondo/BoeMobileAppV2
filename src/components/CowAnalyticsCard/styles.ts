import {
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '@/utils/metrics/index.utils';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: '#fff',
    width: responsiveHorizontalScale(164),
    height: responsiveVerticalScale(152),
    justifyContent: 'center',
    shadowColor: '#006277',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 21,
    shadowOpacity: 0.1,
    elevation: 4,
  },
  statisticsContainer: {
    width: responsiveHorizontalScale(140),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  visualRepresentationContainer: {
    width: responsiveHorizontalScale(39),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textValue: {
    fontSize: 43,
    fontWeight: '500',
  },
  textLabel: {
    fontSize: 18,
    fontWeight: '500',
  },
  textVisualRepresentation: {
    fontSize: 11,
    fontWeight: '500',
  },
  statisticsIconsContainer: {
    justifyContent: 'space-evenly',
  },
});

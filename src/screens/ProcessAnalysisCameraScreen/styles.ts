import {
  responsiveFontSize,
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '@/utils/metrics/index.utils';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: responsiveVerticalScale(932),
  },
  cameraView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cameraActionsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionsContainer: {
    width: responsiveHorizontalScale(295),
    height: responsiveVerticalScale(187),
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: responsiveVerticalScale(20),
  },
  buttonsContainer: {
    width: responsiveHorizontalScale(295),
    height: responsiveVerticalScale(57),
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#171a21',
  },
  buttonsTexts: {
    fontSize: responsiveFontSize(23),
    color: '#fff',
  },
  mainCameraButtonContainer: {
    width: responsiveHorizontalScale(85),
    height: responsiveVerticalScale(85),
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainCameraButton: {
    width: responsiveHorizontalScale(53),
    height: responsiveVerticalScale(53),
    borderRadius: 100,
    backgroundColor: '#fff',
  },
});

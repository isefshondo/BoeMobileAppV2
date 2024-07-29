import {colors} from '@/themes/colors/index.themes';
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
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: responsiveVerticalScale(85),
    paddingBottom: responsiveVerticalScale(158),
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: responsiveHorizontalScale(52),
  },
  goBackButton: {
    width: responsiveHorizontalScale(33),
    height: responsiveVerticalScale(33),
  },
  screenDescriptionContainer: {
    width: responsiveHorizontalScale(326),
    height: responsiveVerticalScale(123),
    justifyContent: 'space-between',
  },
  screenTitle: {
    fontSize: responsiveFontSize(32),
    fontWeight: 'bold',
  },
  screenDescription: {
    fontSize: responsiveFontSize(17),
  },
  formInputsContainer: {
    width: responsiveHorizontalScale(320),
    height: responsiveVerticalScale(256),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputsContainer: {
    width: '100%',
    height: responsiveVerticalScale(92),
    justifyContent: 'space-between',
  },
  nameInputContainer: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.LIGHT_GRAY,
  },
  formContainer: {
    width: responsiveHorizontalScale(320),
    height: responsiveVerticalScale(394),
    justifyContent: 'space-between',
  },
  button: {
    width: '100%',
    height: responsiveVerticalScale(76),
    borderRadius: 10,
    backgroundColor: colors.BLUE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabelContainer: {
    width: responsiveHorizontalScale(181),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonIcon: {
    width: responsiveHorizontalScale(24),
    height: responsiveVerticalScale(24),
  },
  buttonText: {
    fontSize: responsiveFontSize(23),
    fontWeight: '600',
    color: '#fff',
  },
  profilePictureContainer: {
    width: responsiveHorizontalScale(102),
    height: responsiveVerticalScale(105),
  },
  profilePictureHolder: {
    width: responsiveHorizontalScale(96),
    height: responsiveVerticalScale(96),
    borderRadius: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIcon: {
    width: responsiveHorizontalScale(30),
    height: responsiveVerticalScale(32),
    bottom: 0,
    right: 0,
    position: 'absolute',
  },
  inputText: {
    fontSize: responsiveFontSize(22),
  },
});

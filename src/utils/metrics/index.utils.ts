import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const guidelineBaseWidth = 430;
const guidelineBaseHeight = 932;

const responsiveHorizontalScale = (size: number) =>
  (windowWidth / guidelineBaseWidth) * size;
const responsiveVerticalScale = (size: number) =>
  (windowHeight / guidelineBaseHeight) * size;
const responsiveModerateScale = (size: number, factor = 0.5) =>
  size + (responsiveHorizontalScale(size) - size) * factor;

const responsiveFontSize = (fontSize: number) =>
  fontSize * (windowWidth / guidelineBaseWidth);

export {
  responsiveHorizontalScale,
  responsiveVerticalScale,
  responsiveModerateScale,
  responsiveFontSize,
};

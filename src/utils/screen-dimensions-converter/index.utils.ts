import { Dimensions } from "react-native";

const guidelineBaseWidth = 430;
const guidelineBaseHeight = 932;

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

function responsiveHorizontalScale(size: number) {
  return (screenWidth / guidelineBaseWidth) * size;
}

function responsiveVerticalScale(size: number) {
  return (screenHeight / guidelineBaseHeight) * size;
}

export {
  responsiveHorizontalScale,
  responsiveVerticalScale,
};
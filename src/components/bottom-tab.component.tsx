import { colors } from "@/themes/colors/index.themes";
import { responsiveHorizontalScale, responsiveVerticalScale } from "@/utils/metrics/index.utils";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Home from '../assets/home_icon.svg';
import Animal from '../assets/cow_icon.svg';
import Plus from '../assets/plus_icon.svg';
import Shape from '../assets/bottom_tab_bg.svg';

export const BottomTab: React.FC<BottomTabBarProps> = ({state, navigation}) => {
  const currentRoute = state.routes[state.index].name;
  function handleBottomTabItemPress(route: string) {
    const event = navigation.emit({
      type: 'tabPress',
      target: route,
      canPreventDefault: true,
    });
    if (!event.defaultPrevented) {
      navigation.navigate(route);
    }
  }

  function renderHighlightedIcon() {
    return <View style={styles.highlightedIcon} />
  }
  function renderSideButton(icon: React.JSX.Element, route: string) {
    const shouldButtonBeHighlighted = currentRoute === route;
    return (
      <View style={styles.sideButtons}>
        <TouchableOpacity onPress={() => handleBottomTabItemPress(route)}>
          {icon}
        </TouchableOpacity>
        {shouldButtonBeHighlighted && renderHighlightedIcon()}
      </View>
    );
  }
  function renderCentralButton() {
    return <View style={styles.centralButton}>
      <TouchableOpacity style={styles.roundedButton} onPress={() => handleBottomTabItemPress('RegisterCowScreen')}>
        <Plus />
      </TouchableOpacity>
    </View>
  }

  return <LinearGradient style={styles.container} colors={['#fff', 'rgba(0, 98, 119, .16)']}>
    <View style={styles.buttons}>
      {renderSideButton(<Home />, 'InitialRoute')}
      {renderCentralButton()}
      {renderSideButton(<Animal />, 'CowDataListing')}
    </View>
    <Shape style={styles.image} />
  </LinearGradient>
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: responsiveVerticalScale(103.5),
  },
  buttons: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    flexDirection: 'row',
    zIndex: 1,
  },
  sideButtons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightedIcon: {
    width: responsiveHorizontalScale(13),
    height: responsiveVerticalScale(5),
    backgroundColor: colors.BLUE,
    borderRadius: 5,
    marginTop: responsiveVerticalScale(4),
  },
  centralButton: {
    flex: 1,
    alignItems: 'center',
  },
  roundedButton: {
    width: responsiveHorizontalScale(73),
    height: responsiveVerticalScale(73),
    backgroundColor: colors.BLUE,
    justifyContent: 'center',
    borderRadius: 73,
  },
  image: {
    width: '100%',
    height: responsiveVerticalScale(92.5),
    alignSelf: 'center',
    position: 'absolute',
  },
});
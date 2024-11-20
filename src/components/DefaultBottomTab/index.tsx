import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import BottomTabBackground from '../../assets/bottom_tab_bg.svg';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import PlusIcon from '../../assets/plus_icon.svg';
import HomeIcon from '../../assets/home_icon.svg';
import CowIcon from '../../assets/cow_icon.svg';
import {responsiveVerticalScale} from '@/utils/metrics/index.utils';
import {LinearGradient} from 'expo-linear-gradient';
// import { BlurView } from '@react-native-community/blur';

const CameraButton: React.FC<{onPress: () => void}> = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.cameraButton} onPress={onPress}>
      <PlusIcon />
    </TouchableOpacity>
  );
};

export const DefaultBottomTab: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const handlePress = (routeName: string) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: routeName,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      navigation.navigate(routeName);
    }
  };

  const currentRoute = state.routes[state.index].name;

  return (
    <>
      <LinearGradient
        style={{width: '100%', height: responsiveVerticalScale(103.5)}}
        colors={['#fff', 'rgba(0, 98, 119, .16)']}>
        <View style={styles.routesButtonsContainer}>
          <View style={[styles.routesContainer, styles.routesIconsContainer]}>
            <TouchableOpacity onPress={() => handlePress('InitialRoute')}>
              <HomeIcon />
            </TouchableOpacity>
            {currentRoute === 'InitialRoute' && (
              <View style={styles.underline} />
            )}
          </View>
          <View style={[styles.routesContainer, styles.routesButtonContainer]}>
            <CameraButton onPress={() => handlePress('RegisterCowScreen')} />
          </View>
          <View style={[styles.routesContainer, styles.routesIconsContainer]}>
            <TouchableOpacity onPress={() => handlePress('CowDataListing')}>
              <CowIcon />
            </TouchableOpacity>
            {currentRoute === 'CowDataListing' && (
              <View style={styles.underline} />
            )}
          </View>
        </View>
        <BottomTabBackground style={styles.bottomTabBackground} />
      </LinearGradient>
    </>
  );
  return (
    <View style={styles.container}>
      <View style={styles.routesButtonsContainer}>
        <View style={[styles.routesContainer, styles.routesIconsContainer]}>
          <TouchableOpacity onPress={() => handlePress('InitialRoute')}>
            <HomeIcon />
          </TouchableOpacity>
          {currentRoute === 'InitialRoute' && <View style={styles.underline} />}
        </View>
        <View style={[styles.routesContainer, styles.routesButtonContainer]}>
          <CameraButton onPress={() => handlePress('RegisterCowScreen')} />
        </View>
        <View style={[styles.routesContainer, styles.routesIconsContainer]}>
          <TouchableOpacity onPress={() => handlePress('CowDataListing')}>
            <CowIcon />
          </TouchableOpacity>
          {currentRoute === 'CowDataListing' && (
            <View style={styles.underline} />
          )}
        </View>
      </View>
      <View>
        {/* <View */}
        {/* // <BottomTabBackground style={styles.bottomTabBackground} /> */}
      </View>
    </View>
  );
};

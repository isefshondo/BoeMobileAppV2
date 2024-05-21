import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import BottomTabBackground from '../../assets/bottom_tab_bg.svg';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import PlusIcon from '../../assets/plus_icon.svg';
import HomeIcon from '../../assets/home_icon.svg';
import CowIcon from '../../assets/cow_icon.svg';

const CameraButton: React.FC = () => {
  return (
    <TouchableOpacity style={styles.cameraButton}>
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
  return (
    <View style={styles.container}>
      <View style={styles.routesButtonsContainer}>
        <View style={[styles.routesContainer, styles.routesIconsContainer]}>
          <TouchableOpacity onPress={() => handlePress('InitialRoute')}>
            <HomeIcon />
          </TouchableOpacity>
        </View>
        <View style={[styles.routesContainer, styles.routesButtonContainer]}>
          <CameraButton />
        </View>
        <View style={[styles.routesContainer, styles.routesIconsContainer]}>
          <TouchableOpacity onPress={() => handlePress('CowDataListing')}>
            <CowIcon />
          </TouchableOpacity>
        </View>
      </View>
      <BottomTabBackground style={styles.bottomTabBackground} />
    </View>
  );
};

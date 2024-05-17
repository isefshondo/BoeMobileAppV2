import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import PlusIcon from '../../assets/plus_icon.svg';
import DefaultButtonFormat from '../../assets/bottom_tab_bg.svg';
import HomeIcon from '../../assets/home_icon.svg';
import CowIcon from '../../assets/cow_icon.svg';
import {
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '@/utils/metrics/index.utils';

export const DefaultBottomTab: React.FC = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cameraButton}>
        <PlusIcon />
      </TouchableOpacity>
      <DefaultButtonFormat style={styles.format}>
        <HomeIcon
          width={responsiveHorizontalScale(28)}
          height={responsiveVerticalScale(28)}
        />
        <CowIcon
          width={responsiveHorizontalScale(28)}
          height={responsiveVerticalScale(28)}
        />
      </DefaultButtonFormat>
    </View>
  );
};

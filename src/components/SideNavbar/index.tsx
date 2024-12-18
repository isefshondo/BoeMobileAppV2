import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import SignOutIcon from '../../assets/log_out_icon.svg';
import CloseIcon from '../../assets/close_icon.svg';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import EditProfileIcon from '../../assets/edit_icon.svg';
import SettingsIcon from '../../assets/settings_icon.svg';
import SupportIcon from '../../assets/help_circle_icon.svg';
import {Spacer} from '../Spacer';
import {AuthContext} from '@/context/auth';
import * as StorageInstance from '../../utils/storage/index.utils';
import { useTranslation } from 'react-i18next';

interface RoutesItemsProps {
  icon: 'edit' | 'settings' | 'support';
  label: string;
  navigation: any;
  route: string;
}

const RoutesItems: React.FC<RoutesItemsProps> = ({
  icon,
  label,
  navigation,
  route,
}) => {
  const displayRouteIcon = {
    edit: <EditProfileIcon style={styles.icons} />,
    settings: <SettingsIcon style={styles.icons} />,
    support: <SupportIcon style={styles.icons} />,
  };
  return (
    <View style={styles.drawerRoutesContainer}>
      {displayRouteIcon[icon]}
      <Spacer spaceOrientation="column" spaceSize={{primarySpaceSize: 23}} />
      <TouchableOpacity onPress={() => navigation.navigate(route)}>
        <Text style={styles.drawerItemLabel}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const SideNavbar: React.FC = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {signOut} = React.useContext(AuthContext);

  async function handleSignOutButton() {
    await StorageInstance.removeFromStorage('loggedInData');
    signOut();
  }

  return (
    <View style={styles.container}>
      <View style={styles.closeButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
          <CloseIcon style={styles.closeIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.actionItemsContainer}>
        <View style={styles.routesItemsContainer}>
          <RoutesItems
            icon="edit"
            label={t('navbar.items.edit_profile')}
            navigation={navigation}
            route="EditProfile"
          />
          <RoutesItems
            icon="settings"
            label={t('navbar.items.settings')}
            navigation={navigation}
            route=""
          />
          <RoutesItems
            icon="support"
            label={t('navbar.items.help')}
            navigation={navigation}
            route=""
          />
        </View>
        <TouchableOpacity
          style={styles.signOutButtonContainer}
          onPress={handleSignOutButton}>
          <View style={styles.signOutVisualRepContainer}>
            <SignOutIcon style={styles.icons} />
            <Text style={styles.signOutLabel}>{t('navbar.button.exit')}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

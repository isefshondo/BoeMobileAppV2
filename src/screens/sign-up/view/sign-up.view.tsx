import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GoBack from '../../../assets/back_left_icon.svg';
import {DefaultInput} from '@/components/DefaultInput';
import {
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '@/utils/metrics/index.utils';
import {DefaultButton} from '@/components/DefaultButton';
import {colors} from '@/themes/colors/index.themes';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Avatar} from '@/components/avatar.component';
import Camera from '../../../assets/camera.svg';
import {ErrorMessage, SignUpInputs} from '../controller/sign-up.controller';
import {useTranslation} from 'react-i18next';

interface SignUp {
  handleSignInLinkPress: () => void;
  signUpInputs: SignUpInputs;
  setSignUpInputs: any;
  errorMessage: ErrorMessage;
  imageMimeType: string | null;
  handleSetImage: () => void;
  handleSignUpButtonPress: () => void;
}

export const SignUp: React.FC<SignUp> = ({
  handleSignInLinkPress,
  handleSetImage,
  handleSignUpButtonPress,
  signUpInputs,
  setSignUpInputs,
  errorMessage,
  imageMimeType,
}) => {
  const {t} = useTranslation();
  function renderCameraBadge() {
    return (
      <View style={styles.badgeContainer}>
        <Camera
          width={responsiveHorizontalScale(13)}
          height={responsiveVerticalScale(10)}
          fill="#fff"
        />
      </View>
    );
  }
  const image =
    signUpInputs.image && imageMimeType
      ? `data:image/${imageMimeType};base64,${signUpInputs.image}`
      : undefined;
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.flexGrowMain}>
        <SafeAreaView style={styles.flexGrowMain}>
          <StatusBar backgroundColor="#fff" />
          <View style={styles.header}>
            <GoBack width={33} height={33} onPress={handleSignInLinkPress} />
            <View style={styles.firstSpace} />
            <Text style={styles.title}>{t('sign_up.title')}</Text>
          </View>
          <View style={styles.mainContent}>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>{t('sign_up.description')}</Text>
              <Text style={styles.navigationDescription}>
                {t('sign_up.suggestion')}
              </Text>
              <TouchableOpacity onPress={handleSignInLinkPress}>
                <Text style={styles.navigationLink}>
                  {t('sign_up.actions.log_in')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.registerForm}>
              <View style={styles.profilePictureContainer}>
                <Avatar
                  width={92}
                  height={92}
                  image={image}
                  badge={renderCameraBadge()}
                  badgeTop={64}
                  handleSetImage={handleSetImage}
                />
              </View>
              <View style={styles.formInputs}>
                <DefaultInput
                  inputLabel={t('sign_up.inputs.name')}
                  inputIcon="name"
                  inputCurrentValue={signUpInputs.name}
                  onInputChange={name =>
                    setSignUpInputs(previousState => ({...previousState, name}))
                  }
                  inputErrorMessage={errorMessage.name}
                />
                <DefaultInput
                  inputLabel={t('sign_up.inputs.email')}
                  inputIcon="email"
                  inputCurrentValue={signUpInputs.email}
                  onInputChange={email =>
                    setSignUpInputs(previousState => ({
                      ...previousState,
                      email,
                    }))
                  }
                  inputErrorMessage={errorMessage.email}
                />
                <DefaultInput
                  inputLabel={t('sign_up.inputs.password')}
                  inputIcon="password"
                  inputCurrentValue={signUpInputs.password}
                  onInputChange={password =>
                    setSignUpInputs(previousState => ({
                      ...previousState,
                      password,
                    }))
                  }
                  inputErrorMessage={errorMessage.password}
                />
                <DefaultInput
                  inputLabel={t('sign_up.inputs.confirm_password')}
                  inputCurrentValue={signUpInputs.confirmPassword}
                  onInputChange={confirmPassword =>
                    setSignUpInputs(previousState => ({
                      ...previousState,
                      confirmPassword,
                    }))
                  }
                  inputErrorMessage={errorMessage.confirmPassword}
                />
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <DefaultButton
              buttonText={t('sign_up.button')}
              onButtonPress={handleSignUpButtonPress}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  flexGrowMain: {
    flexGrow: 1,
  },
  title: {
    fontSize: 23,
    fontWeight: 'normal',
  },
  description: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  mainContent: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
  },
  registerForm: {
    flexGrow: 6,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: responsiveVerticalScale(35),
    paddingBottom: responsiveVerticalScale(45),
    paddingHorizontal: responsiveHorizontalScale(40),
    justifyContent: 'space-between',
  },
  header: {
    width: '100%',
    height: responsiveVerticalScale(69),
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveHorizontalScale(34),
  },
  navigationDescription: {
    fontSize: 17,
    fontWeight: 'normal',
    textAlign: 'center',
    color: colors.LIGHT_GRAY,
  },
  navigationLink: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.SECONDARY_BLUE,
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    width: '100%',
    height: responsiveVerticalScale(125),
    backgroundColor: '#fff',
    paddingVertical: responsiveVerticalScale(10),
    paddingHorizontal: responsiveHorizontalScale(40),
    justifyContent: 'center',
  },
  firstSpace: {
    width: responsiveHorizontalScale(85),
    height: '100%',
  },
  descriptionContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePictureContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  formInputs: {
    flexGrow: 2,
    justifyContent: 'space-between',
  },
  badgeContainer: {
    width: responsiveHorizontalScale(26),
    height: responsiveVerticalScale(26),
    backgroundColor: colors.BLUE,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

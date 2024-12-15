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
import BoeSymbol from '../../../assets/boe_symbol.svg';
import {DefaultInput} from '@/components/DefaultInput';
import {
  responsiveFontSize,
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '@/utils/metrics/index.utils';
import {colors} from '@/themes/colors/index.themes';
import {DefaultButton} from '@/components/DefaultButton';
import {SignInInputs} from '../controller/sign-in.controller';
import Info from '../../../assets/info.svg';
import {StatusBar} from 'expo-status-bar';
import {useTranslation} from 'react-i18next';

interface SignIn {
  signInInputs: SignInInputs;
  setSignInInputs: React.Dispatch<React.SetStateAction<SignInInputs>>;
  handleRegisterLinkPress: () => void;
  handleLogInButtonPress: () => Promise<void>;
  isAuthenticationError: boolean;
  shouldBreakTitle: boolean;
}

export const SignIn: React.FC<SignIn> = ({
  signInInputs,
  setSignInInputs,
  handleRegisterLinkPress,
  handleLogInButtonPress,
  isAuthenticationError,
  shouldBreakTitle,
}) => {
  const {t} = useTranslation();
  const signInFormToLink = !isAuthenticationError
    ? styles.secondSpace
    : styles.fifthSpace;
  function renderErrorMessage() {
    return (
      isAuthenticationError && (
        <>
          <View style={styles.errorMessage}>
            <Info width={13} height={13} />
            <View style={styles.seventhSpace} />
            <Text style={styles.textTertiary}>E-mail ou senha inválidos</Text>
          </View>
          <View style={styles.sixthSpace} />
        </>
      )
    );
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <StatusBar backgroundColor="#fff" />
        <View style={styles.header}>
          <BoeSymbol width={25} height={33} />
        </View>
        <View style={{flexDirection: !shouldBreakTitle ? 'row' : 'column'}}>
          <Text style={styles.textPrimary}>
            {t('sign_in.title.first_line.bold')}{' '}
          </Text>
          <Text style={styles.textSecondary}>
            {t('sign_in.title.first_line.regular')}
          </Text>
        </View>
        <View>
          <View>
            <DefaultInput
              inputLabel={t('sign_in.inputs.email')}
              inputCurrentValue={signInInputs.email}
              onInputChange={email =>
                setSignInInputs(previousState => ({...previousState, email}))
              }
            />
            <View style={styles.firstSpace} />
            <View>
              <DefaultInput
                inputLabel={t('sign_in.inputs.password')}
                inputCurrentValue={signInInputs.password}
                onInputChange={password =>
                  setSignInInputs(previousState => ({
                    ...previousState,
                    password,
                  }))
                }
              />
              <View style={signInFormToLink} />
              {renderErrorMessage()}
              <TouchableOpacity>
                <Text style={[styles.navigation, styles.navigationLink]}>
                  {t('sign_in.actions.forgot_password')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.thirdSpace} />
          <View>
            <DefaultButton
              buttonText={t('sign_in.button')}
              onButtonPress={() => handleLogInButtonPress()}
            />
            <View style={styles.fourthSpace} />
            <Text style={styles.navigationDescription}>
              {t('sign_in.suggestion')}
            </Text>
            <TouchableOpacity onPress={handleRegisterLinkPress}>
              <Text style={[styles.navigation, styles.navigationLink]}>
                {t('sign_in.actions.register')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flexGrow: 1,
    paddingLeft: responsiveHorizontalScale(53),
    paddingRight: responsiveHorizontalScale(54),
    justifyContent: 'space-evenly',
  },
  textPrimary: {
    fontSize: responsiveFontSize(42),
    fontWeight: 'bold',
  },
  textSecondary: {
    fontSize: responsiveFontSize(42),
    fontWeight: 'normal',
  },
  header: {
    width: '100%',
    alignItems: 'flex-end',
  },
  firstSpace: {
    width: '100%',
    height: responsiveVerticalScale(63),
  },
  secondSpace: {
    width: '100%',
    height: responsiveVerticalScale(21),
  },
  navigation: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.LIGHT_BLUE,
  },
  thirdSpace: {
    width: '100%',
    height: responsiveVerticalScale(47),
  },
  fourthSpace: {
    width: '100%',
    height: responsiveVerticalScale(22),
  },
  navigationDescription: {
    fontSize: 15,
    textAlign: 'center',
  },
  alignToCenter: {
    textAlign: 'center',
  },
  navigationLink: {
    textAlign: 'center',
    color: colors.SECONDARY_BLUE,
    textDecorationLine: 'underline',
  },
  fifthSpace: {
    width: '100%',
    height: responsiveVerticalScale(11),
  },
  sixthSpace: {
    width: '100%',
    height: responsiveVerticalScale(25),
  },
  errorMessage: {
    width: '100%',
    height: responsiveVerticalScale(27),
    backgroundColor: colors.LIGHT_RED,
    borderRadius: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTertiary: {
    fontSize: 12,
    color: '#fff',
  },
  seventhSpace: {
    width: responsiveHorizontalScale(4),
    height: '100%',
  },
});

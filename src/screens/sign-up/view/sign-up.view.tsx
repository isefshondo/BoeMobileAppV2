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
import BoeSymbol from '../../../assets/boe_symbol.svg';
import {DefaultInput} from '@/components/DefaultInput';
import {
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '@/utils/metrics/index.utils';
import {DefaultButton} from '@/components/DefaultButton';
import {colors} from '@/themes/colors/index.themes';

export const SignUp = () => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <GoBack width={33} height={33} />
          <BoeSymbol width={25} height={33} />
        </View>
        <View style={styles.mainContent}>
          <View>
            <Text style={styles.title}>Registre-se</Text>
            <Text style={styles.description}>
              Insira seus dados e crie uma nova conta gratuitamente!
            </Text>
          </View>
          <View style={styles.registerForm}>
            <DefaultInput
              inputLabel="Nome"
              inputIcon="name"
              inputCurrentValue=""
              onInputChange={() => {}}
              inputErrorMessage=""
            />
            <DefaultInput
              inputLabel="Email"
              inputIcon="email"
              inputCurrentValue=""
              onInputChange={() => {}}
              inputErrorMessage=""
            />
            <DefaultInput
              inputLabel="Senha"
              inputIcon="password"
              inputCurrentValue=""
              onInputChange={() => {}}
              inputErrorMessage=""
            />
            <DefaultInput
              inputLabel="Confirmar senha"
              inputCurrentValue=""
              onInputChange={() => {}}
              inputErrorMessage=""
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <DefaultButton buttonText="Registrar-se" onButtonPress={() => {}} />
          <Text style={styles.navigationDescription}>Já possuo uma conta</Text>
          <TouchableOpacity>
            <Text style={styles.navigationLink}>Log in</Text>
          </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 17,
    fontWeight: 'normal',
  },
  mainContent: {
    height: responsiveVerticalScale(534),
    justifyContent: 'space-between',
  },
  registerForm: {
    height: responsiveVerticalScale(403),
    justifyContent: 'space-between',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: responsiveHorizontalScale(52),
    paddingRight: responsiveHorizontalScale(55),
  },
  navigationDescription: {
    fontSize: 15,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  navigationLink: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.LIGHT_BLUE,
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: responsiveHorizontalScale(52),
  },
});

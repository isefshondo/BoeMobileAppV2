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

export const SignUp = () => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.flexGrowMain}>
        <SafeAreaView style={styles.flexGrowMain}>
          <StatusBar backgroundColor="#fff" />
          <View style={styles.header}>
            <GoBack width={33} height={33} />
            <View style={styles.firstSpace} />
            <Text style={styles.title}>Criar conta</Text>
          </View>
          <View style={styles.mainContent}>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>
                Insira seus dados e crie uma nova conta
              </Text>
              <Text style={styles.navigationDescription}>
                Já possui uma conta?
              </Text>
              <TouchableOpacity>
                <Text style={styles.navigationLink}>Log in</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.registerForm}>
              <View style={styles.profilePictureContainer}>
                {/* TODO: Add ProfilePicture component */}
              </View>
              <View style={styles.formInputs}>
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
          </View>
          <View style={styles.buttonContainer}>
            <DefaultButton buttonText="Registrar-se" onButtonPress={() => {}} />
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
});

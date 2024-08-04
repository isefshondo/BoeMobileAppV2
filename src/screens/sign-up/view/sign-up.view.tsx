import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BoeSymbol from '../../../assets/boe_symbol.svg';
import GoBack from '../../../assets/back_left_icon.svg';
import {responsiveVerticalScale} from '@/utils/metrics/index.utils';

export const SignUp = () => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View>
          <GoBack width={33} height={33} />
          <BoeSymbol width={25} height={25} />
        </View>
        <View>
          <View>
            <Text style={styles.title}>Registre-se</Text>
            <Text style={styles.description}>
              Insira seus dados e crie uma nova conta gratuitamente!
            </Text>
          </View>
          <View style={styles.firstSpace} />
          <View style={styles.registerForm}>
            <View>
              <Text>Nome</Text>
              <TextInput style={styles.textInput} />
            </View>
            <View>
              <Text>Email</Text>
              <TextInput style={styles.textInput} />
            </View>
            <View>
              <Text>Senha</Text>
              <TextInput style={styles.textInput} secureTextEntry />
            </View>
            <View>
              <Text>Confirmar senha</Text>
              <TextInput style={styles.textInput} secureTextEntry />
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity>
            <Text>Registrar-se</Text>
          </TouchableOpacity>
          <Text>Já possuo uma conta,</Text>
          <Text>Log in</Text>
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
  firstSpace: {
    width: '100%',
    height: responsiveVerticalScale(74),
  },
  textInput: {
    borderBottomWidth: 1.3,
    borderBottomColor: '#717171',
  },
  registerForm: {
    height: responsiveVerticalScale(403),
    justifyContent: 'space-between',
  },
});

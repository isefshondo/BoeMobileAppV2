import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {useDefaultInputsValidators} from '../../hooks/useDefaultInputsValidators';
import * as StorageInstance from '../../utils/storage/index.utils';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/RootStack';
import {AuthStackParams} from '../../navigation/AuthStack';
import {styles} from './styles';
import {PublicAreaHeader} from '../../components/PublicAreaHeader';
import {DefaultInput} from '../../components/DefaultInput';
import {Link} from '../../components/Link';
import {DefaultButton} from '../../components/DefaultButton';
import {MixedWeightTitle} from '../../components/MixedWeightTitle';
import {AuthContext} from '../../context/Auth';

export type SignInInputsState = {
  emailInput: string | null;
  passwordInput: string | null;
};

export type SignInInputsErrorMessages = {
  emailErrorMessage: string | null;
  passwordErrorMessage: string | null;
};

export const SignInScreen: React.FC = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParams & AuthStackParams>
    >();

  const {signIn} = React.useContext(AuthContext);
  const [signinInputs, setSigninInputs] = React.useState<SignInInputsState>({
    emailInput: null,
    passwordInput: null,
  });
  const [signinInputsErrorMessage, setSigninInputsErrorMessage] =
    React.useState<SignInInputsErrorMessages>({
      emailErrorMessage: null,
      passwordErrorMessage: null,
    });

  const {emailInputValidator, passwordInputValidator} =
    useDefaultInputsValidators({
      emailInput: signinInputs.emailInput,
      passwordInput: signinInputs.passwordInput,
    });

  const handleInputChange = (
    inputName: keyof SignInInputsState,
    value: string,
  ) => {
    setSigninInputs(prevState => ({...prevState, [inputName]: value}));
  };

  const handleSignInButtonPress = async () => {
    const emailErrorMessage = emailInputValidator();
    const passwordErrorMessage = passwordInputValidator();

    setSigninInputsErrorMessage({emailErrorMessage, passwordErrorMessage});

    if (emailErrorMessage || passwordErrorMessage) {
      return;
    }

    try {
      const response = await fetch(
        'http://192.168.3.105:3000/api/user/signin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: signinInputs.emailInput,
            password: signinInputs.passwordInput,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        return;
      }

      StorageInstance.setInStorage(
        'loggedInData',
        JSON.stringify({jwt: data.jwt, data: data.data, isLoggedIn: true}),
      );
      signIn({jwt: data.jwt, data: data.data, isLoggedIn: true});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <PublicAreaHeader />
      <View style={styles.mainContentContainer}>
        <MixedWeightTitle
          titleBold="Bem-vindo"
          regularTitle="de volta"
          fontSize={{boldFontSize: 42}}
          isBoldFirst
          shouldBreakLineOnBold
        />
        <View style={styles.formContainer}>
          <View style={styles.inputsContainer}>
            <DefaultInput
              inputLabel="E-mail"
              inputCurrentValue={signinInputs.emailInput ?? ''}
              onInputChange={value => handleInputChange('emailInput', value)}
              inputErrorMessage={signinInputsErrorMessage.emailErrorMessage}
            />
            <View>
              <DefaultInput
                inputLabel="Senha"
                inputCurrentValue={signinInputs.passwordInput ?? ''}
                onInputChange={value =>
                  handleInputChange('passwordInput', value)
                }
                inputErrorMessage={
                  signinInputsErrorMessage.passwordErrorMessage
                }
              />
              <View style={styles.flexEndLink}>
                <Link handleLinkClick={() => {}}>Esqueci minha senha</Link>
              </View>
            </View>
          </View>
          <View style={styles.formFooterContainer}>
            <DefaultButton
              buttonText="Log in"
              onButtonPress={handleSignInButtonPress}
            />
            <View style={styles.formFooter}>
              <Text style={styles.formMessage}>
                Não possui uma conta ainda?
              </Text>
              <Link
                hasUnderline
                handleLinkClick={() => navigation.navigate('SignUp')}>
                Registre-se
              </Link>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

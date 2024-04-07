import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {useDefaultInputsValidators} from '../../hooks/useDefaultInputsValidators';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParams} from '../../../App';
import {styles} from './styles';
import {PublicAreaHeader} from '../../components/PublicAreaHeader';
import {DefaultInput} from '../../components/DefaultInput';
import {DefaultButton} from '../../components/DefaultButton';
import {Link} from '../../components/Link';
import {MixedWeightTitle} from '../../components/MixedWeightTitle';
import {verticalScale} from '../../utils/metrics/index.utils';
import {Spacer} from '../../components/Spacer';

export type SignupInputsState = {
  nameInput: string | null;
  emailInput: string | null;
  passwordInput: string | null;
  confirmPassword: string | null;
};

export type SignupInputsErrorMessage = {
  nameErrorMessage: string | null;
  emailErrorMessage: string | null;
  passwordErrorMessage: string | null;
  confirmPasswordErrorMessage: string | null;
};

export const SignUpScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const [signupInputs, setSignupInputs] = React.useState<SignupInputsState>({
    nameInput: null,
    emailInput: null,
    passwordInput: null,
    confirmPassword: null,
  });
  const [signupInputsErrorMessage, setSignupInputsErrorMessage] =
    React.useState<SignupInputsErrorMessage>({
      nameErrorMessage: null,
      emailErrorMessage: null,
      passwordErrorMessage: null,
      confirmPasswordErrorMessage: null,
    });

  const handleInputChange = (
    inputName: keyof SignupInputsState,
    value: string,
  ) => {
    setSignupInputs(prevState => ({...prevState, [inputName]: value}));
  };

  const {
    nameInputValidator,
    emailInputValidator,
    passwordInputValidator,
    confirmPasswordInputValidator,
  } = useDefaultInputsValidators({
    nameInput: signupInputs.nameInput,
    emailInput: signupInputs.emailInput,
    passwordInput: signupInputs.passwordInput,
    confirmPasswordInput: signupInputs.confirmPassword,
  });

  const handleSignUpButtonPress = async () => {
    const nameErrorMessage = nameInputValidator();
    const emailErrorMessage = emailInputValidator();
    const passwordErrorMessage = passwordInputValidator();
    const confirmPasswordErrorMessage = confirmPasswordInputValidator();
    setSignupInputsErrorMessage({
      nameErrorMessage,
      emailErrorMessage,
      passwordErrorMessage,
      confirmPasswordErrorMessage,
    });

    if (
      nameErrorMessage ||
      emailErrorMessage ||
      passwordErrorMessage ||
      confirmPasswordErrorMessage
    ) {
      return;
    }

    try {
      // TODO: Introduce the real HTTP URL
      const res = await fetch('', {
        method: 'POST',
        body: JSON.stringify(signupInputs),
      });
      if (res.ok) {
        navigation.navigate('SignIn');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <PublicAreaHeader hasBackButton />
      <View style={styles.formContainer}>
        <MixedWeightTitle
          titleBold="Registre-se"
          regularTitle="Insira seus dados e crie uma nova conta gratuitamente!"
          fontSize={{boldFontSize: 32, regularFontSize: 17}}
          isBoldFirst
          shouldBreakLineOnBold
        />
        <View style={styles.inputsContainer}>
          <DefaultInput
            inputLabel="Nome"
            inputIcon="name"
            inputCurrentValue={signupInputs.nameInput ?? ''}
            onInputChange={value => handleInputChange('nameInput', value)}
            inputErrorMessage={signupInputsErrorMessage.nameErrorMessage}
          />
          <DefaultInput
            inputLabel="Email"
            inputIcon="email"
            inputCurrentValue={signupInputs.emailInput ?? ''}
            onInputChange={value => handleInputChange('emailInput', value)}
            inputErrorMessage={signupInputsErrorMessage.emailErrorMessage}
          />
          <DefaultInput
            inputLabel="Senha"
            inputIcon="password"
            inputCurrentValue={signupInputs.passwordInput ?? ''}
            onInputChange={value => handleInputChange('passwordInput', value)}
            inputErrorMessage={signupInputsErrorMessage.passwordErrorMessage}
          />
          <DefaultInput
            inputLabel="Confirmar Senha"
            inputIcon="password"
            inputCurrentValue={signupInputs.confirmPassword ?? ''}
            onInputChange={value => handleInputChange('confirmPassword', value)}
            inputErrorMessage={
              signupInputsErrorMessage.confirmPasswordErrorMessage
            }
          />
        </View>
        <View>
          <DefaultButton
            buttonText="Registrar-se"
            onButtonPress={handleSignUpButtonPress}
          />
          <Spacer
            spaceOrientation="row"
            spaceSize={{primarySpaceSize: verticalScale(22)}}
          />
          <View style={styles.formFooter}>
            <Text style={styles.footerMessage}>Já possuo uma conta,</Text>
            <Link
              hasUnderline
              handleLinkClick={() => navigation.navigate('SignIn')}>
              Log in
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

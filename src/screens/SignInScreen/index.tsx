import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {useDefaultInputsValidators} from '../../hooks/useDefaultInputsValidators';
import {storageInstance} from '../../utils/storage/index.utils';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParams, RootStackParams} from '../../../App';
import {styles} from './styles';
import {PublicAreaHeader} from '../../components/PublicAreaHeader';
import {DefaultInput} from '../../components/DefaultInput';
import {Link} from '../../components/Link';
import {DefaultButton} from '../../components/DefaultButton';
import {MixedWeightTitle} from '../../components/MixedWeightTitle';
import data from '../../utils/mocks/SignIn.json';

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
      storageInstance.set(
        'loggedInData',
        JSON.stringify({...data, isLoggedIn: true}),
      );
      navigation.navigate('Home');
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

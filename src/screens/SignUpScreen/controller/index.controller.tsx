import React from "react";
import { SignUpScreen } from "..";
import { useNavigation } from "@react-navigation/native";

interface SignupInputsState {
  nameInput: string | null;
  emailInput: string | null;
  passwordInput: string | null;
  confirmPasswordInput: string | null;
}

export const SignUpController: React.FC = () => {
  const { navigate } = useNavigation();

  const [signupInputs, setSignupInputs] = React.useState<SignupInputsState>({
    nameInput: null,
    emailInput: null,
    passwordInput: null,
    confirmPasswordInput: null,
  });

  const handleInputChange = (inputName: keyof SignupInputsState, value: string) => {
    setSignupInputs(prevState => ({ ...prevState, [inputName]: value }))
  };

  const handleSignUpButtonPress = async () => {
    try {
      const res = await fetch('https://api.example.com/signup', {
        method: 'POST',
        body: JSON.stringify({
          name: signupInputs.nameInput,
          email: signupInputs.emailInput,
          password: signupInputs.passwordInput,
        })
      });
      
      if (res.status === 200) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <SignUpScreen />;
};
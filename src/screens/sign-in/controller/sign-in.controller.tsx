import React from 'react';
import {SignIn} from '../view/sign-in.view';

type SignInInputs = {
  email: string | null;
  password: string | null;
}

export function SignInController() {
  const [signInInputs, setSignInInputs] = React.useState<SignInInputs>({
    email: null,
    password: null,
  });
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  return <SignIn />;
}

export enum AuthActionEnum {
  SignIn = 'SIGN_IN',
  SignOut = 'SIGN_OUT',
}

export type UserTypes = {
  name: string;
  email: string;
};

export type UserStorageTypes = {
  jwt: string | null;
  data: UserTypes | null;
};

export interface AuthReducer {
  type: AuthActionEnum;
  jwt: string;
  data: UserTypes | null;
}

export const AuthReducer = (state: UserStorageTypes, action: AuthReducer) => {
  switch (action.type) {
    case AuthActionEnum.SignIn:
      return {
        ...state,
        jwt: action.jwt,
        data: action.data,
      };
    case AuthActionEnum.SignOut:
      return {
        ...state,
        jwt: '',
        data: null,
      };
    default:
      return state;
  }
};

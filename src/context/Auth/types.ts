type UserDataTypes = {
  name: string | null;
  email: string | null;
};

export interface User {
  jwt: string | null;
  data: UserDataTypes;
  isLoggedIn: boolean;
}

export interface IAuthContext {
  signIn: (data: User) => Promise<void>;
  signOut: () => void;
  isLoggedIn: boolean;
}

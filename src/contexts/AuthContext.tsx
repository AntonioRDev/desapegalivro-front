import React, { createContext } from "react";
import Router from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { login } from "../services/auth";
import { LoginDtoRequest } from "../models/dto/LoguinDtoRequest";
import { User } from "../models/domain/User";
import { getUserById } from "../services/user";

type AuthContextType = {
  isAuthenticaded: boolean;
  user: User | undefined;
  signIn: (credentials: LoginDtoRequest) => Promise<void>;
  signOut: () => void
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<User | undefined>(undefined);

  const isAuthenticaded = !!user;

  React.useEffect(() => {
    const { desapegatoken } = parseCookies();
    
    if (desapegatoken) {
      const { userId } = JSON.parse(desapegatoken);
      
      getUserById(userId).then((res) => setUser(res.data));
    }
  }, []);

  async function signIn(credentials: LoginDtoRequest) {
    const response = await login(credentials);
    const { token, user } = response.data;

    setCookie(
      undefined,
      "desapegatoken",
      JSON.stringify({ token, userId: user.id }),
      {
        maxAge: 60 * 60 * 24 * 30, // 1 month
      }
    );

    setUser(user);
    Router.push("/");
  }

  async function signOut() {
    destroyCookie(undefined, 'desapegatoken');
    Router.push("/");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticaded, signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

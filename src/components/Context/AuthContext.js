import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const baseUrl = "http://localhost:5050/api";
  const [auth, setAuth] = useState({
    currentUser: {
      _id: 0,
      name: "",
      email: "",
      username: "",
      token: "",
    },
    isLoggedIn: false,
    registerUrl: `${baseUrl}/api/users`,
    loginUrl: `${baseUrl}/auth/login`,
    logoutUrl: `${baseUrl}/auth/logout`,
  });
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {props.children}
    </AuthContext.Provider>
  );
};

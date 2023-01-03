// import Axios from "axios";
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
    baseUrl: baseUrl,
    isLoggedIn: false,
    registerUrl: `${baseUrl}/api/users`,
    loginUrl: `${baseUrl}/auth/login`,
    logoutUrl: `${baseUrl}/auth/logout`,
    appName: `Rezume`,
  });

  // Checking localstorage
  // const storageToken = localStorage.getItem("auth-token");
  // const storageUser = localStorage.getItem("user");

  // get user data
  // const getUserData = async () => {
  //   try {
  //     await Axios.get(`${auth.baseUrl}/users/${storageUser}`).then((res) => {
  //       setAuth({
  //         ...auth,
  //         isLoggedIn: true,
  //         currentUser: {
  //           ...auth.currentUser,
  //           _id: res.data._id,
  //           name: res.data.name,
  //           username: res.data.username,
  //           email: res.data.email,
  //           token: storageToken,
  //         },
  //       });
  //       // localStorage.setItem("auth-token", auth.currentUser.token);
  //       // localStorage.setItem("user", auth.currentUser._id);
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // // check user
  // if (storageToken && storageUser && auth.isLoggedIn === false) {
  //   getUserData();
  // }

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {props.children}
    </AuthContext.Provider>
  );
};

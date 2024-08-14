import React, { useState } from "react";
import { useContext } from "react";
import axios from "axios";

const AuthContext = React.createContext();

const RegisterURI = "http://localhost:4000/api/auth/Register";
const LogURI = "http://localhost:4000/api/auth/login";

const AuthProvider = ({ children }) => {
  // register state management
  const RegUserInfo = { username: "", email: "", password: "" };
  const [RegUser, setRegUser] = useState(RegUserInfo);
  // login state management
  const LoginUserInfo = { email: "", password: "" };
  const [LogUser, setLogUser] = useState(LoginUserInfo);

  // token management
  const [token, setToken] = useState(localStorage.getItem("token"));

  const storeTokenInLocal = (ServerToken) => {
    setToken(ServerToken);
    return localStorage.setItem("token", ServerToken);
  };

  let isLoggedin = !!token;

  // logout function
  const LogOut = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  const handleInfoChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setRegUser({ ...RegUser, [name]: value });
    setLogUser({ ...LogUser, [name]: value });
  };

  const RegisterUser = async (e, navigate) => {
    e.preventDefault();
    try {
      const response = await axios.post(RegisterURI, RegUser, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      //const res_data = await response.json();
      //console.log(res_data);
      if (response.status === 200) {
        storeTokenInLocal(response.data.token);
        setRegUser(RegUserInfo);
        alert("Signed up successfully!");
        navigate("/");
      } else {
        alert(response.data.message || response.data.extraDetails);
      }
    } catch (error) {
      console.log("sign up error", error);
    }
  };

  const LoginUser = async (e, navigate) => {
    e.preventDefault();
    try {
      const response = await axios.post(LogURI, LogUser, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      //const res_data = await response.json();
      if (response.status === 200) {
        storeTokenInLocal(response.data.token);
        setLogUser(LoginUserInfo);
        alert("logged in successfully!");
        navigate("/");
      } else {
        alert(response.data.message || response.data.extraDetails);
      }
    } catch (error) {
      console.log("login error", error);
    }
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          RegisterUser,
          RegUser,
          handleInfoChange,
          LogUser,
          LoginUser,
          isLoggedin,
          LogOut,
        }}
      >
        {children}
      </AuthContext.Provider>
      
    </>
  );
};

const useAuthGlobalContext = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider, useAuthGlobalContext };

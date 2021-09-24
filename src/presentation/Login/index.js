import React, { useEffect } from "react";
import LoginContainer from "./components/LoginContainer";
import { getStorageItem } from "../../infrastructure/common/local";
import { routes } from "../common/Routes";

const Login = () => {
  useEffect(() => {
    let token;
    getStorageItem("token").then((res) => {
      token = res;
      console.log("tokenfdgdg", res)
      if (token !== null) {
        window.location.replace(routes.DASHBOARD)
      }
    });
  }, [])
  return (
    <>
      <LoginContainer />
    </>
  );
};

export default Login;

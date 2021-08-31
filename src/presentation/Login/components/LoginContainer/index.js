import React from "react";
import LoginImage from "../../../common/Assets/Images/Amigoes-login-image.svg";
import Container from "./styled"
import LoginForm from "../LoginForm/LoginForm";

function LoginContainer() {
  return (
    <>
      <Container>
        <div className="ImageContainer">
          {/* <h1>Admin Panel</h1>
          <div>
            <img src={LoginImage} alt="" />
          </div> */}
        </div>
        <div className="FormContainer">
            <LoginForm />
        </div>
      </Container>
    </>
  );
}

export default LoginContainer;

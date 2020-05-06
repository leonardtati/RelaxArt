import React, { useContext } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

import SignInwithGoogle from "../SignIn/SignIn";
import { signInContext } from "../SignIn/SignInContext";

const Login = () => {
  const { appUser } = useContext(signInContext);

  console.log(appUser);

  let history = useHistory();
  const handleSubmit = () => {};
  return (
    <Wrapper>
      <SignInwithGoogle>Sign In with Google</SignInwithGoogle>
      <div>Or sign In with your email</div>

      <input type="email"></input>
      <input type="password"></input>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default Login;

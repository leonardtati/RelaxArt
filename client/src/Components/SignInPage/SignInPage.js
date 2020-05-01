import React from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

import SignInwithGoogle from "../SignIn/SignIn";

const Login = () => {
  let history = useHistory();
  const handleSubmit = () => {};
  return (
    <Wrapper>
      <form>
        <SignInwithGoogle>Sign In with Google</SignInwithGoogle>
        <div>Or sign In with your email</div>

        <input type="email"></input>
        <input type="password"></input>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default Login;

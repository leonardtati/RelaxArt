import React from "react";
import styled from "styled-components";

import SignInwithGoogle from "../SignIn/SignIn";

const Login = () => {
  return (
    <Wrapper>
      <SignInwithGoogle>Sign In with Google</SignInwithGoogle>
      <div>Or sign In with your email</div>
      <form>
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

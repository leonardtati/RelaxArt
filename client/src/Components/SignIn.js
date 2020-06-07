import React, { useContext } from "react";

import { signInContext } from "./SignInContext";

import styled from "styled-components";

const SignIn = () => {
  const { signInWithGoogle } = useContext(signInContext);

  return (
    <Wrapper>
      <UnstyledButton onClick={signInWithGoogle}>
        SignIn With Google
      </UnstyledButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;
const UnstyledButton = styled.button`
  margin-top: 20px;
  font-size: 100%;
  font-family: inherit;
  padding: 15px;
  background-image: linear-gradient(#f2f2f2, white);
`;
export default SignIn;

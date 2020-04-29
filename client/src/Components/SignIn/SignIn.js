import React, { useContext } from "react";

import styled from "styled-components";

import { signInContext } from "./SignInContext";

const SignInwithGoogle = () => {
  const { signInWithGoogle, handleSignOut } = useContext(signInContext);
  console.log(signInWithGoogle);

  return (
    <Wrapper>
      <SignInButton onClick={signInWithGoogle}>
        Sign In With your Google Account
      </SignInButton>
      <button onClick={handleSignOut}>signout</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;
const SignInButton = styled.button``;
export default SignInwithGoogle;

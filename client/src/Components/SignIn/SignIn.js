import React, { useState, useEffect, useContext } from "react";

import { signInContext } from "./SignInContext";

import styled from "styled-components";

const SignInwithGoogle = () => {
  const { signInWithGoogle, handleSignOut } = useContext(signInContext);

  return (
    <Wrapper>
      <SignInButton onClick={signInWithGoogle}>
        Sign In With your Google Account
      </SignInButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;
const SignInButton = styled.button``;
export default SignInwithGoogle;

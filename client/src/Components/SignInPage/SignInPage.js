import React, { useContext, useState } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

import SignIn from "../SignIn/SignIn";
import { signInContext } from "../SignIn/SignInContext";

const SignInPage = () => {
  const { appUser, SignInwithGoogle, signInWithEmailAndPassword } = useContext(
    signInContext
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log("APPUSER", appUser);

  let history = useHistory();
  const handleSubmit = async (ev) => {
    ev.preventDefault();
  };
  return (
    <Wrapper>
      <SignIn></SignIn>
      <div>Or sign In with your email</div>

      <form onSubmit={(ev) => signInWithEmailAndPassword(ev)}>
        <input
          type="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        ></input>
        <input
          type="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        ></input>
        <button type="submit"></button>
      </form>
      <div>{console.log(appUser)}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default SignInPage;

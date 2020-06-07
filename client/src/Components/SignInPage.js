import React, { useContext, useState } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

import SignIn from "./SignIn";
import Header from "./Header";
import { signInContext } from "./SignInContext";

const SignInPage = () => {
  const { appUser, signin } = useContext(signInContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    signin(email, password).then(history.push("/"));
  };
  return (
    <>
      <Header></Header>
      <Wrapper>
        <SignIn></SignIn>
        <SignInTitle>Or sign In with your email and password</SignInTitle>
        {appUser.displayName ? history.push("/") : <></>}

        <SignInForm
          onSubmit={(ev) => {
            handleSubmit(ev);
          }}
        >
          <label>Email:</label>
          <EmailInput
            type="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          ></EmailInput>
          <label>Password:</label>
          <PasswordInput
            type="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          ></PasswordInput>
          <SignWIthEmailAndPassword type="submit">
            Sign In
          </SignWIthEmailAndPassword>
        </SignInForm>
        <div></div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: stretch;
  box-shadow: 10px 10px #d9d9d9;
  width: 25%;
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  margin: 100px;
  margin-left: 400px;
`;

const SignInTitle = styled.p``;

const SignInForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const EmailInput = styled.input`
  display: flex;
  margin: 25px;
  border: none;
  border-bottom: 2px solid black;
`;

const PasswordInput = styled.input`
  display: flex;
  margin: 25px;
  border: none;
  border-bottom: 2px solid black;
`;

const SignWIthEmailAndPassword = styled.button`
  margin-bottom: 20px;
  padding: 10px;
  width: 100px;
  font-size: 14px;
  background-image: linear-gradient(#f2f2f2, white);
`;

export default SignInPage;

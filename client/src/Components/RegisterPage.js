import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";

import styled from "styled-components";

import { signInContext } from "./SignInContext";

const RegisterPage = () => {
  const {
    signup,
    setDisplayName,
    displayName,
    err,
    appUser,
    okToGo,
  } = useContext(signInContext);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [message, setMessage] = useState(false);
  const [emailError, setEmailError] = useState("");
  let history = useHistory();

  console.log("REGISTERPAGE", okToGo);
  // const handleHistory = () => {
  //   console.log(appUser);
  //   if (appUser) {
  //     history.push("/");
  //   } else {
  //     console.log("NOooppe");
  //   }
  // };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (password.length < 6) {
      setMessage(true);
    } else {
      signup(email, password);
    }
  };
  if (okToGo === true) {
    history.push("/");
  }

  return (
    <Wrapper>
      <SignUpForm>
        <Dialog
          aria-labelledby="alert-dialog-title"
          open={() => {
            setOpen(true);
          }}
        >
          <DialogTitle id="alert-dialog-title">{"Sign up"}</DialogTitle>
          <form
            onSubmit={(ev) => {
              handleSubmit(ev);
              setOpen(false);
            }}
          >
            <TextField
              label="DisplayName"
              type="text"
              required="required"
              value={displayName}
              onChange={(ev) => setDisplayName(ev.currentTarget.value)}
            ></TextField>
            <TextField
              label="Email"
              type="email"
              required="required"
              value={email}
              helperText={emailError}
              onChange={(ev) => setEmail(ev.currentTarget.value)}
            ></TextField>
            <TextField
              label="Password"
              type="password"
              required="required"
              value={password}
              helperText={message}
              onChange={(ev) => setPassWord(ev.currentTarget.value)}
            ></TextField>
            {!err ? (
              <Button variant="contained" color="secondary" type="submit">
                SIGN UP
              </Button>
            ) : (
              <StyledLinks to={"/Login"}>
                <Button variant="contained" color="secondary" linkto={"/"}>
                  GO TO SIGN IN
                </Button>
              </StyledLinks>
            )}
          </form>
          {message ? (
            <Alert severity="error">
              Password must be at least 6 characters
            </Alert>
          ) : (
            <></>
          )}
          {err ? (
            <Alert severity="error">
              Wow there buddy! Looks like you already have an account, try
              SigninIn instead!
            </Alert>
          ) : (
            <></>
          )}
        </Dialog>
      </SignUpForm>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const SignUpForm = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledLinks = styled(NavLink)`
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

export default RegisterPage;

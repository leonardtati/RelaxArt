import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import styled from "styled-components";

import { signInContext } from "./SignInContext";

const RegisterPage = () => {
  const { signup, setDisplayName, displayName, err } = useContext(
    signInContext
  );
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  let history = useHistory();

  console.log("REGISTERPAGE", err);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (password.length < 6) {
      setError(true);
      setMessage("Password must be at least 6 characters");
    }
    try {
      signup(email, password);
      console.log(err);
    } catch (err) {
      console.log(err);
      setError(true);
      setEmailError(
        "Wow there buddy. Looks like you're already registered. Try signinIn!"
      );
    }
    if (!err) {
      console.log(error);
      history.push("/");
    }
  };
  console.log(message, error);

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

            <Button variant="contained" color="secondary" type="submit">
              SIGN UP
            </Button>
          </form>
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

export default RegisterPage;

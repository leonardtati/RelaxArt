import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import styled from "styled-components";

import { signInContext } from "../SignIn/SignInContext";

const RegisterPage = () => {
  const { signup, setDisplayName, displayName } = useContext(signInContext);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  let history = useHistory();

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    console.log("HANDLESUBMIT", signup(email, password));

    signup(email, password).then(history.push("/"));
  };

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
              value={displayName}
              onChange={(ev) => setDisplayName(ev.currentTarget.value)}
            ></TextField>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(ev) => setEmail(ev.currentTarget.value)}
            ></TextField>
            <TextField
              label="Password"
              type="password"
              value={password}
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

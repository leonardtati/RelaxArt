import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import styled from "styled-components";

import { requestUserInfo, receiveUserInfo, addUserInfo } from "../../actions";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [appUser, setAppUser] = useState({});
  const [mongoUser, setMongoUser] = useState({});
  let history = useHistory();

  const handleClick = () => {
    history.push("/");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    console.log("IM HERE");

    await fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        displayName,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((googleUser) => {
        console.log("JSON", googleUser);
        setAppUser(googleUser.data);
        dispatch(addUserInfo(googleUser.data));
      });
    await fetch("/mongoUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        displayName,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((mongoUser) => {
        console.log("MONGOUSER");
        setMongoUser(mongoUser.data);
        console.log(mongoUser.data);
      });
  };

  return (
    <Wrapper>
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
        <button onClick={handleClick}>Go back to home page</button>
      </Dialog>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

export default RegisterPage;

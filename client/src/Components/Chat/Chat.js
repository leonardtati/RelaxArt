import React, { useState, useEffect, useContext } from "react";
// import queryString from "querystring";

import io from "socket.io-client";

import { signInContext } from "../SignIn/SignInContext";

let socket;

const Chat = () => {
  const { appUser } = useContext(signInContext);
  const ENDPOINT = "localhost:4000";

  useEffect(() => {
    const data = appUser;
    console.log("INCHAT", data);
    socket = io(ENDPOINT);
    console.log(socket);
  }, []);

  return <div>CHAT COMPONENT</div>;
};

export default Chat;

import React, { useState, useEffect, useContext } from "react";

import io from "socket.io-client";

import { signInContext } from "../SignIn/SignInContext";

let socket;

const Chat = () => {
  const { appUser } = useContext(signInContext);
  const endpoint = "localhost:3000";

  useEffect(() => {
    socket = io(endpoint);
    console.log(socket);
  });

  return <div>CHAT COMPONENT</div>;
};

export default Chat;

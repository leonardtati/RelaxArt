import React, { useState, useEffect, useContext } from "react";

import { useParams } from "react-router-dom";
import io from "socket.io-client";

import { signInContext } from "../SignIn/SignInContext";

const queryString = require("querystring");

let socket;

const Chat = () => {
  const { roomId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "localhost:4000";

  useEffect(
    () => {
      socket = io(ENDPOINT);

      socket.emit("join", { roomId }, () => {});

      return () => {
        socket.emit("disconnet");

        socket.off();
      };
    },
    [ENDPOINT],
    roomId
  );

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  //function for sending messages

  const sendMessage = (ev) => {
    ev.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  console.log(message, messages);

  return (
    <div>
      <div>CHAT COMPONENT</div>
      <input
        value={message}
        onChange={(ev) => setMessage(ev.target.value)}
        onKeyPress={(ev) => (ev.key === "Enter" ? sendMessage(ev) : null)}
      ></input>
    </div>
  );
};

export default Chat;

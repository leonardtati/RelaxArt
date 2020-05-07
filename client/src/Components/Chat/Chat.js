import React, { useState, useEffect, useContext } from "react";

import { useParams } from "react-router-dom";
import io from "socket.io-client";
import styled from "styled-components";

import { signInContext } from "../SignIn/SignInContext";
import InfoBar from "../InfoBar/InfoBar";
import ChatInput from "../ChatInput/ChatInput";
import Messages from "../Messages/Messages";

let socket;

const Chat = () => {
  const { roomId } = useParams();
  const [currentUsers, setCurrentUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "localhost:4000";

  console.log("*******************", roomId);

  useEffect(() => {
    socket = io(ENDPOINT);

    if (roomId != undefined) {
      socket.emit("join", { roomId }, () => {});
      console.log(roomId);
    }

    return () => {
      socket.emit("disconnet");

      socket.off();
    };
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
      console.log("SETMESSAGES", message);
    });
    socket.on("roomData", ({ users }) => {
      setCurrentUsers(users);
      console.log("SETUSERS", users);
    });
  }, []);

  //function for sending messages

  const sendMessage = (ev) => {
    ev.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
    console.log("IN SENDMESSAGE", message);
  };

  console.log(message, messages);

  return (
    <Wrapper>
      <Container>
        <InfoBar />
        <Messages messages={messages} />
        <ChatInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 320px) and (max-width: 480px) {
    height: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 8px;
  height: 60%;
  width: 35%;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
    height: 100%;
  }
`;

export default Chat;

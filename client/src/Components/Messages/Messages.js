import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import styled from "styled-components";

import Message from "../Message/Message";

const Messages = ({ messages, message }) => {
  return (
    <ScrollToBottom>
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} />
        </div>
      ))}
    </ScrollToBottom>
  );
};

export default Messages;

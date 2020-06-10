import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import Message from "./Message";

const Messages = ({ messages, message }) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);
  return (
    <Wrapper className="CHATBOX??">
      <div>
        {messages.map((message, i) => (
          <div key={i}>
            <Message message={message} />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: scroll;
  flex: auto;
`;

export default Messages;

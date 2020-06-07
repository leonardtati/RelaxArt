import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import styled from "styled-components";

import Message from "./Message";

const Messages = ({ messages, message }) => {
  return (
    <Wrapper className="CHATBOX??">
      <ScrollToBottom useAtBottom={() => true}>
        {messages.map((message, i) => (
          <div key={i}>
            <Message message={message} />
          </div>
        ))}
      </ScrollToBottom>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: auto;
  flex: auto;
  max-height: 100px;
`;

export default Messages;

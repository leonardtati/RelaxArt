import React from "react";
import styled from "styled-components";

const ChatInput = ({ message, setMessage, sendMessage }) => {
  return (
    <Wrapper>
      <form>
        <input
          type="text"
          value={message}
          onChange={(ev) => setMessage(ev.target.value)}
          onKeyPress={(ev) => (ev.key === "Enter" ? sendMessage(ev) : null)}
        />

        <button onClick={(ev) => sendMessage(ev)}>Send</button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default ChatInput;

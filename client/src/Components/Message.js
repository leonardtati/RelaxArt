import React, { useContext } from "react";

import styled from "styled-components";

import { signInContext } from "./SignInContext";

const Message = ({ message: { text, user } }) => {
  const { appUser } = useContext(signInContext);
  let isSentByCurrentUser = false;

  if (user) {
    isSentByCurrentUser = true;
  }
  return (
    <Wrapper>
      {appUser ? (
        <MessageRight>
          <UserName>{appUser.displayName}</UserName>
          <UserTextRight>{text}</UserTextRight>
        </MessageRight>
      ) : (
        <MessageLeft>
          <UserTextLeft>{text}</UserTextLeft>
          <UserName>{appUser.displayName}</UserName>
        </MessageLeft>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const MessageRight = styled.div`
  display: flex;
  flex-direction: column;
  align-content: right;
  align-items: right;
  justify-items: right;
`;
const MessageLeft = styled.div`
  display: flex;
  justify-content: left;
`;
const UserName = styled.p`
  display: flex;
  color: grey;
  margin-bottom: 0px;
`;
const UserTextRight = styled.p`
  border-radius: 60px;
  background-color: #66a3ff;
  margin-top: 0px;
  margin-right: 60px;
`;
const UserTextLeft = styled.p`
  border-radius: 60px;
  background-color: #66a3ff;
  margin-top: 0px;
  margin-right: 60px;
  text-align: start;
`;

export default Message;

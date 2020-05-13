import React, { useContext } from "react";

import ReactEmoji from "react-emoji";

import { signInContext } from "../SignIn/SignInContext";

const Message = ({ message: { text, user } }) => {
  const { appUser } = useContext(signInContext);
  let isSentByCurrentUser = false;

  if (user) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{user}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
      </div>
      <p className="sentText pl-10 ">{user}</p>
    </div>
  );
};

export default Message;

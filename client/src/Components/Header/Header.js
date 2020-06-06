import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";
import Avatar from "../Avatar";
import { signInContext } from "../SignIn/SignInContext";

const Header = () => {
  const { appUser, handleSignOut, user, displayName } = useContext(
    signInContext
  );

  return (
    <Wrapper className="header">
      <>
        {appUser && appUser.email ? (
          <>
            <StyledLinks to={"/"}> RELAX ART </StyledLinks>
            <StyledLinks to={"/CreateRoom"}> Create a Room</StyledLinks>
            {appUser.photoURL ? (
              <Avatar src={appUser.photoURL}></Avatar>
            ) : (
              <div>{displayName || user.displayName}</div>
            )}

            <div>|</div>

            <UnstyledButton onClick={handleSignOut}>Signout</UnstyledButton>
          </>
        ) : (
          <>
            <StyledLinks to={"/"}> RELAX ART </StyledLinks>
            <StyledLinks to={"/CreateRoom"}> Create a Room</StyledLinks>

            <StyledLinks to={"/Login"}>Signin</StyledLinks>

            <div>|</div>
            <StyledLinks to={"/Register"}>Register</StyledLinks>
          </>
        )}
      </>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 30px;
  padding-top: 30px;
  border-bottom-width: 5px;
  border-bottom-style: outset;
`;

const StyledLinks = styled(NavLink)`
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

const UnstyledButton = styled.button`
  font-size: 100%;
  font-family: inherit;
  border: 0;
  padding: 0;
`;

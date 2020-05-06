import React, { useContext } from "react";

import { NavLink } from "react-router-dom";

import styled from "styled-components";

import SignIn from "../SignIn/SignIn";
import Avatar from "../Avatar";
import { signInContext } from "../SignIn/SignInContext";

import SignInwithGoogle from "../SignIn/SignIn";

const Header = () => {
  const { appUser, handleSignOut } = useContext(signInContext);

  return (
    <Wrapper className="header">
      <>
        {appUser && appUser.email ? (
          <>
            <StyledLinks to={"/"}> RELAX ART </StyledLinks>
            <StyledLinks to={"/CreateRoom"}> Create a Room</StyledLinks>
            <Avatar src={appUser.photoURL} />

            <UnstyledButton onClick={handleSignOut}>Signout</UnstyledButton>
          </>
        ) : (
          <>
            <StyledLinks to={"/"}> RELAX ART </StyledLinks>
            <StyledLinks to={"/CreateRoom"}> Create a Room</StyledLinks>
            <SignInwithGoogle />
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

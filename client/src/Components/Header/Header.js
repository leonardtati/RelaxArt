import React, { useContext } from "react";

import { NavLink } from "react-router-dom";

import styled from "styled-components";

import SignIn from "../SignIn/SignIn";
import { signInContext } from "../SignIn/SignInContext";

const Header = () => {
  const { appUser, handleSignOut } = useContext(signInContext);
  //WILL USE THIS TO CONDITIONALY RENDER THE LINKS. IF USER IS LOGGED IN SHOW AVATAR INSTEAD.
  console.log("INHEADER", appUser);
  return (
    <Wrapper>
      <>
        {appUser && appUser.email ? (
          <>
            <img src={appUser.photoURL} />

            <button onClick={handleSignOut}>signout</button>
          </>
        ) : (
          <>
            <StyledLinks to={"/Login"}>Sign In</StyledLinks>
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
  justify-content: space-between;
  align-items: center;
`;

const StyledLinks = styled(NavLink)`
  text-decoration: none;
`;

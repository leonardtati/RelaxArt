import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import styled from "styled-components";

import SignIn from "../SignIn/SignIn";
import Avatar from "../Avatar";
import { signInContext } from "../SignIn/SignInContext";

import SignInwithGoogle from "../SignIn/SignIn";
import signInWithEmailAndPassword from "../SignIn/SignIn";

import { requestUserInfo, receiveUserInfo } from "../../actions";

import SearchBar from "../SearchBar/SearchBar";

const Header = () => {
  const dispatch = useDispatch();
  const {
    appUser,
    handleSignOut,
    user,
    displayName,
    setDisplayName,
  } = useContext(signInContext);

  useEffect(() => {
    dispatch(requestUserInfo());
    fetch("/mongoUser")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch(receiveUserInfo(data));
      });
    // fetch("/users")s
    //   .then((res) => res.json())
    //   .then((data) => {});
  }, []);

  return (
    <Wrapper className="header">
      <>
        {appUser && appUser.email ? (
          <>
            <StyledLinks to={"/"}> RELAX ART </StyledLinks>
            <StyledLinks to={"/CreateRoom"}> Create a Room</StyledLinks>
            {/* <SearchBar></SearchBar> */}
            {appUser.photoURL ? (
              <Avatar src={appUser.photoURL}></Avatar>
            ) : (
              <div>{appUser.displayName || user.displayName}</div>
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

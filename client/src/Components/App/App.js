import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import GlobalSyles from "../GlobalSytles/GlobalSytles";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

import { requestUserInfo, receiveUserInfo } from "../../actions";
import HomePage from "../HomePage/HomePage";
import SignInPage from "../SignInPage/SignInPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import CreateRoomPage from "../CreateRoomPage/CreateRoomPage";
import Room from "../Room/Room";

function App() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  console.log("USERSTATE", userState);

  useEffect(() => {
    dispatch(requestUserInfo());
    fetch("/users")
      .then((res) => res.json())
      .then((userInfo) => {
        dispatch(receiveUserInfo(userInfo));
        console.log("INAPP", userInfo);
      });
  }, []);
  return (
    <>
      <>
        <BrowserRouter>
          <Wrapper>
            <GlobalSyles />
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/CreateRoom">
                <CreateRoomPage />
              </Route>
              <Route path="/rooms/:roomId">
                <Room />
              </Route>
              <Route path="/Login">
                <SignInPage />
              </Route>
              <Route path="/Register">
                <RegisterPage />
              </Route>
            </Switch>
          </Wrapper>
        </BrowserRouter>
      </>
    </>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

export default App;

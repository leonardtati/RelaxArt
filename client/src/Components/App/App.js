import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import GlobalSyles from "../GlobalSytles/GlobalSytles";
import styled from "styled-components";

import { requestRoomInfo, receiveRoomInfo } from "../../actions";
import HomePage from "../HomePage/HomePage";
import SignInPage from "../SignInPage/SignInPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import CreateRoomPage from "../CreateRoomPage/CreateRoomPage";
import Room from "../Room/Room";

function App() {
  const dispatch = useDispatch();
  const AppState = useSelector((state) => state.rooms);

  console.log("INAPP", AppState.status);

  useEffect(() => {
    dispatch(requestRoomInfo());
    fetch("/rooms")
      .then((res) => res.json())
      .then((roomsInfo) => {
        dispatch(receiveRoomInfo(roomsInfo));
        console.log("APPP", roomsInfo);
      });
  }, []);
  return (
    <>
      {AppState.status === "idle" ? (
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
      ) : (
        <></>
      )}
    </>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

export default App;

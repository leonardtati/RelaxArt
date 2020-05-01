import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import GlobalSyles from "../GlobalSytles/GlobalSytles";
import styled from "styled-components";

import HomePage from "../HomePage/HomePage";
import SignInPage from "../SignInPage/SignInPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import CreateRoomPage from "../CreateRoomPage/CreateRoomPage";

function App() {
  /*let randomNumber = Array.from({ length: 6 }, () =>
    Math.floor(Math.random() * 39)
  );
  console.log(randomNumber);
  React.useEffect(() => {
    fetch(
      "https://collectionapi.metmuseum.org/public/collection/v1/objects/50004"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);*/
  return (
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
          <Route path="/Login">
            <SignInPage />
          </Route>
          <Route path="/Register">
            <RegisterPage />
          </Route>
        </Switch>
      </Wrapper>
    </BrowserRouter>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

export default App;

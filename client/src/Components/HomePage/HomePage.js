import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-router-dom";

import styled from "styled-components";

import Header from "../Header/Header";

const HomePage = () => {
  return (
    <Wrapper>
      <Header />
      HOME PAGE
      <div>HELLO</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

export default HomePage;

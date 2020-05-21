import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";

import Header from "../Header/Header";

import RoomBanner from "../RoomBanner";

const HomePage = () => {
  const rooms = useSelector((state) => state.rooms);

  console.log(rooms);

  return (
    <>
      <Header />
      <Wrapper>
        {rooms.status === "idle" ? (
          <>
            <RoomBanner />
          </>
        ) : (
          <></>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  position: relative;
  margin-left: 126px;
`;

export default HomePage;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import Header from "../Header/Header";

import Chat from "../Chat/Chat";

import RoomBanner from "../RoomBanner";

import { requestRoomInfo, receiveRoomInfo } from "../../actions";

const HomePage = () => {
  const rooms = useSelector((state) => state.rooms);

  return (
    <Wrapper>
      {rooms.status === "idle" ? (
        <>
          <Header />
          <RoomBanner />
        </>
      ) : (
        <></>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

export default HomePage;

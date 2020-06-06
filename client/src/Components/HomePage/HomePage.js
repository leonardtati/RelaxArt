import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import Header from "../Header/Header";
import { requestRoomInfo, receiveRoomInfo } from "../../actions";

import RoomBanner from "../RoomBanner";

const HomePage = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms);

  useEffect(() => {
    dispatch(requestRoomInfo());
    fetch("/rooms")
      .then((res) => res.json())
      .then((roomsInfo) => {
        dispatch(receiveRoomInfo(roomsInfo));
      });
  }, [rooms.isAdded]);

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

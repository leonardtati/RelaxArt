import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import { requestRoomInfo, receiveRoomInfo } from "../../actions";

const RoomBanner = () => {
  const dispatch = useDispatch();
  const roomsState = useSelector((state) => state.rooms);
  const rooms = useSelector((state) => state.rooms.rooms);
  const room = Object.values(rooms);

  return (
    <>
      {roomsState.status === "idle" ? (
        <>
          {room.map((roomDetail) => {
            return (
              <RoomDisplayOnHomePage to={`/rooms/${roomDetail._id}`}>
                <Room>
                  <Thumbnail />
                  <RoomInfo>
                    <RoomsTitles>
                      {roomDetail.roomDetails.roomTitle}
                    </RoomsTitles>
                    <RoomsDescriptions>
                      {roomDetail.roomDetails.roomDescript}
                    </RoomsDescriptions>
                    <CreatedBy>{}</CreatedBy>
                  </RoomInfo>
                </Room>
              </RoomDisplayOnHomePage>
            );
          })}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

const RoomDisplayOnHomePage = styled(NavLink)`
  width: 260px;
  height: 400px;
  margin: 30px;
  float: left;
  perspective: 1000px;
`;

const Room = styled.div`
  width: 260px;
  height: 400px;
  transform-style: preserve-3d;
  transform: translateZ(-130px);
  transition: transform 350ms;

  &:hover {
    transform: rotateY(-78deg) translateZ(20px);
  }

  &::after {
    content: "";
    width: 260px;
    height: 260px;
    position: absolute;
    bottom: 0;
    box-shadow: 0 30px 50px rgba(0, 0, 0, 0.3);
    transform-origin: 100% 100%;
    transform: rotateX(90deg) translateY(130px);
    transition: box-shadow 350ms;
  }

  &:hover::after {
    box-shadow: 20px -5px 50px rgba(0, 0, 0, 0.3);
  }
`;

const Thumbnail = styled.div`
  position: absolute;
  width: 260px;
  height: 400px;
  background-color: #fff;
  backface-visibility: hidden;
  transform: translateZ(130px);
  background-size: cover;
  background-repeat: no-repeat;
`;

const RoomInfo = styled.div`
  position: absolute;
  width: 260px;
  height: 400px;
  background-color: #fff;
  backface-visibility: hidden;
  transform: rotateY(90deg) translateZ(130px);
  border: 1px solid #b8b5b5;
  font-size: 0.75em;
`;

const RoomsTitles = styled.h3``;
const RoomsDescriptions = styled.p``;

const CreatedBy = styled.p``;

export default RoomBanner;

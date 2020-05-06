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
                <RoomsTitles>{roomDetail.roomDetails.roomTitle}</RoomsTitles>
                <RoomsDescriptions>
                  {roomDetail.roomDetails.roomDescript}
                </RoomsDescriptions>
                <CreatedBy>{}</CreatedBy>
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

const RoomDisplayOnHomePage = styled(NavLink)``;

const RoomsTitles = styled.h3``;
const RoomsDescriptions = styled.p``;

const CreatedBy = styled.p``;

export default RoomBanner;

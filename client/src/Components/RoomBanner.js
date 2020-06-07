import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import styled from "styled-components";
import { signInContext } from "./SignInContext";

const RoomBanner = () => {
  const { appUser, displayName } = useContext(signInContext);
  const roomsState = useSelector((state) => state.rooms);
  const rooms = useSelector((state) => state.rooms.rooms);
  const room = Object.values(rooms);
  console.log("IN ROOM BANNER", appUser);

  return (
    <>
      {roomsState.status === "idle" ? (
        <>
          {room.map((rooms) => {
            return (
              <RoomDisplayOnHomePage key={rooms._id} to={`/rooms/${rooms._id}`}>
                <Room>
                  {rooms.pictures.length ? (
                    <Thumbnail
                      src={`${
                        "http://localhost:3000/" + rooms.pictures[0].path
                      }`}
                    />
                  ) : (
                    <DefaultText> RELAX-ART</DefaultText>
                  )}

                  <RoomInfo>
                    <RoomsTitles>{rooms.roomDetails.roomTitle}</RoomsTitles>
                    <RoomsDescriptions>
                      {rooms.roomDetails.roomDescript}
                    </RoomsDescriptions>
                    {rooms.roomDetails.appUser.displayName ? (
                      <>
                        Curated by:
                        <CreatedBy>
                          {rooms.roomDetails.appUser.displayName}
                        </CreatedBy>
                      </>
                    ) : (
                      <>
                        Curated by:
                        <CreatedBy>Anonymous</CreatedBy>
                      </>
                    )}
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

const Thumbnail = styled.img`
  position: absolute;
  width: 260px;
  height: 400px;
  background-color: #fff;
  backface-visibility: hidden;
  transform: translateZ(130px);
  background-size: cover;
  background-repeat: no-repeat;
`;

const DefaultText = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  color: black;
  padding-top: 50%;
  border-style: double;
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
  color: black;
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
const RoomsDescriptions = styled.p`
  display: flex;
  padding-top: 50px;
  padding-bottom: 50px;
`;

const CreatedBy = styled.p``;

export default RoomBanner;

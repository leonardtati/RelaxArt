import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Slide } from "react-slideshow-image";
import styled from "styled-components";

import Header from "../Header/Header";
import Chat from "../Chat/Chat";

const Room = () => {
  const roomId = useParams();
  const roomState = useSelector((state) => state.rooms);

  const actualRoomId = roomId.roomId;
  const room = roomState.rooms[actualRoomId];

  const getPictures = room.pictures.map((picture) => {
    return "http://localhost:3000/" + picture.path;
  });

  // const getPicture = getPictures.map((src) => {
  //   console.log(src);
  // });

  // useEffect(() => {
  //   console.log("IMHERE");
  //   fetch("/rooms/:roomId")
  //     .then((res) => res.json())
  //     .then((roomsInfo) => {
  //       // dispatch(receiveRoomInfo(roomsInfo));
  //       console.log("APPP", roomsInfo);
  //     });
  // });

  return (
    <>
      {room !== undefined ? (
        <>
          <Header />
          <Wrapper>
            {room.pictures.map((picture) => {
              return (
                <img src={`${"http://localhost:3000/" + picture.path}`}></img>
              );
            })}
            <Chat />
          </Wrapper>
        </>
      ) : (
        <div></div>
      )}
      {/* <img src={`uploads/${myImages - 1588619089481}.png`}>THIS IS A ROOM</img> */}
    </>
  );
};

const Wrapper = styled.div``;

export default Room;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Slide } from "react-slideshow-image";
import styled from "styled-components";

import Header from "../Header/Header";

const Room = () => {
  const roomId = useParams();
  const roomState = useSelector((state) => state.rooms);

  console.log("INROOM", roomState.status);
  const actualRoomId = roomId.roomId;
  const room = roomState.rooms[actualRoomId];

  const getPictures = room.pictures.map((picture) => {
    return picture.path;
  });
  console.log("ROOM", getPictures);

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
            {getPictures.forEach((element) => {
              console.log(element);
              return <img src={element}></img>;
            })}
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

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Slide } from "react-slideshow-image";
import styled from "styled-components";
import { css, jsx } from "@emotion/core";

import Header from "../Header/Header";
import IoSignIn from "../IoSignIn/IoSignIn";
import Chat from "../Chat/Chat";

const Room = () => {
  const roomId = useParams();
  const roomState = useSelector((state) => state.rooms);
  const actualRoomId = roomId.roomId;
  const room = roomState.rooms[actualRoomId];

  const slideImages = [
    "images/slide_2.jpg",
    "images/slide_3.jpg",
    "images/slide_4.jpg",
  ];

  const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
    pauseOnHover: true,
    onChange: (oldIndex, newIndex) => {
      console.log(`slide transition from ${oldIndex} to ${newIndex}`);
    },
  };

  return (
    <>
      {room !== undefined ? (
        <>
          <Header />
          <Wrapper>
            <SlideContainer>
              <Slide {...properties}>
                {room.pictures.map((picture) => {
                  console.log(picture.path);
                  return (
                    <FreakShow
                      src={`${"http://localhost:3000/" + picture.path}`}
                    ></FreakShow>
                  );
                })}
              </Slide>
            </SlideContainer>

            <IoSignIn />
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

{
  /* {room.pictures.map((picture) => {
              return (
                <img src={`${"http://localhost:3000/" + picture.path}`}></img>
              );
            })} */
}

const Wrapper = styled.div``;

const SlideContainer = styled.div`
  width: 70%;
  margin: auto;
`;

const FreakShow = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  height: 300px;
`;

export default Room;

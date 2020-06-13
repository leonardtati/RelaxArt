import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Slide } from "react-slideshow-image";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import Header from "./Header";
import Chat from "./Chat";

const Room = () => {
  const roomId = useParams();
  const roomState = useSelector((state) => state.rooms);
  const [open, setOpen] = useState(true);
  const [submittedPassword, setSubmittedPassWord] = useState("");
  const [message, setMessage] = useState("");
  const rooms = useSelector((state) => state.rooms.rooms);

  const actualRoomId = roomId.roomId;
  const room = roomState.rooms[actualRoomId];
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

  const handleSubmitPassword = async (ev) => {
    ev.preventDefault();

    fetch(`/rooms/${actualRoomId}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        submittedPassword: submittedPassword,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setMessage(json.message);
      })
      .catch((err) => {});
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      {room !== undefined ? (
        <>
          <Header />
          {room.roomDetails.password.length ? (
            <>
              <Dialog
                aria-labelledby="alert-dialog-title"
                open={message === "Open da Gates" ? false : true}
              >
                <DialogTitle id="alert-dialog-title">
                  {"This room is private, you must enter a password"}
                </DialogTitle>
                <form
                  onSubmit={(ev) => {
                    handleSubmitPassword(ev);
                  }}
                >
                  <TextField
                    label="Enter password"
                    type="password"
                    value={submittedPassword}
                    onChange={(ev) =>
                      setSubmittedPassWord(ev.currentTarget.value)
                    }
                  ></TextField>
                  <Button variant="contained" color="secondary" type="submit">
                    ENTER
                  </Button>
                </form>
              </Dialog>
              <Snackbar
                open={message === "you shall not" ? true : false}
                autoHideDuration={1000}
                onClose={() => {
                  handleClose();
                }}
              >
                <MuiAlert
                  severity="warning"
                  elevation={15}
                  onClose={() => {
                    handleClose();
                  }}
                >
                  Wrong password, please try again
                </MuiAlert>
              </Snackbar>
            </>
          ) : (
            <></>
          )}

          {message === "Open da Gates" ||
          room.roomDetails.password.length === 0 ? (
            <Wrapper>
              <SlideContainer>
                <Slide {...properties}>
                  {room.pictures.map((picture) => {
                    return (
                      <FreakShow
                        src={`${"http://localhost:3000/" + picture.path}`}
                      ></FreakShow>
                    );
                  })}
                </Slide>
              </SlideContainer>
              <RoomTitle>
                Welcome to {room.roomDetails.roomTitle}'s Chat
              </RoomTitle>
              <Chat />
            </Wrapper>
          ) : (
            <PrivateBackGround />
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

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

const RoomTitle = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PrivateBackGround = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;
`;

export default Room;

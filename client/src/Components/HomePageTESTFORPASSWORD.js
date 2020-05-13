import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";

import Header from "../Header/Header";
import RoomBanner from "../RoomBanner";

import { requestRoomInfo, receiveRoomInfo } from "../../actions";

const HomePage = () => {
  const rooms = useSelector((state) => state.rooms);
  console.log("InHOMEPAGE", rooms);
  const [open, setOpen] = useState(false);

  return (
    <Wrapper>
      <Header />
      {rooms.status === "idle" ? (
        <>
          <RoomBanner onChange={() => setOpen(true)} />
          {open ? <div>BIG FAT DIV</div> : <></>}
        </>
      ) : (
        <CircularProgress />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

export default HomePage;

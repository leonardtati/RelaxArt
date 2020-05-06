import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FileDrop } from "react-file-drop";
import styled from "styled-components";

import { signInContext } from "../SignIn/SignInContext";
import Header from "../Header/Header";
import { addRoomInfo } from "../../actions";
const CreateRoomPage = () => {
  const dispatch = useDispatch();
  const roomState = useSelector((state) => state.room);
  const [roomTitle, setRoomTitle] = useState("");
  const [roomDetails, setRoomDetails] = useState("");
  const [roomDescript, setRoomDescript] = useState("");
  const [password, setPassword] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [roomId, setRoomId] = useState("");

  const { appUser } = useContext(signInContext);
  console.log(appUser);

  const handleSubmitRoomInfo = async (ev) => {
    ev.preventDefault();
    fetch("/roomDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        roomTitle: roomTitle,
        roomDescript: roomDescript,
        password: password,
        appUser: appUser,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setRoomId(json._id);
        dispatch(addRoomInfo(json));
        console.log(json._id);
      });
  };

  const handleSubmitPictures = async (ev) => {
    ev.preventDefault();
    const formData = new FormData();
    console.log("SELECTEDFILES", selectedFiles);
    //formData.append("myImages", selectedFiles);
    for (var x = 0; x < selectedFiles.length; x++) {
      formData.append("myImages", selectedFiles[x]);
    }
    formData.append("roomId", roomId);

    fetch("/uploadmultiple", {
      method: "POST",
      // headers: {
      //   "Content-Type": "multipart/form-data",
      //   boundary: "----WebKitFormBoundaryyrV7KO0BoCBuDbTL",
      // },
      // credentials: "include",
      body: formData,
    })
      .then((res) => res.json())
      .then((roomInfo) => {
        dispatch(addRoomInfo(roomInfo));
      });
  };

  const onChange = (ev) => {
    setSelectedFiles(ev.target.files);
    setRoomDetails(ev);
  };

  return (
    <>
      <Header />
      <Wrapper>
        <CreateRoomTitle>
          Create your own room in a few simple steps
        </CreateRoomTitle>
        <RoomDetailsForm onSubmit={(ev) => handleSubmitRoomInfo(ev)}>
          <div>
            <p>1. Choose the title of your room:</p>
            <RoomTitle
              type="text"
              value={roomTitle}
              onChange={(ev) => setRoomTitle(ev.target.value)}
            ></RoomTitle>
          </div>

          <div>
            <p>2. Write a small description </p>
            <RoomDescription
              type="text"
              maxlength="14"
              value={roomDescript}
              onChange={(ev) => setRoomDescript(ev.target.value)}
            ></RoomDescription>
          </div>
          <div>
            Make your room private (optional):
            <RoomPassword
              type="password"
              value={password}
              onChange={(ev) => setRoomTitle(ev.target.value)}
            ></RoomPassword>
          </div>
          <div>
            <button type="submit"> Create basic details </button>
          </div>
        </RoomDetailsForm>
        <p>4. Select the pictures you want to display</p>
        <PicturesForm
          action="/uploadmultiple"
          enctype="multipart/form-data"
          onSubmit={(ev) => {
            handleSubmitPictures(ev);
          }}
        >
          <PictureSelect
            type="file"
            name="myImage"
            multiple
            onChange={(ev) => onChange(ev)}
          ></PictureSelect>

          <SubmitRoom type="submit">CreateRoom</SubmitRoom>
        </PicturesForm>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const CreateRoomTitle = styled.p`
  display: flex;
  justify-content: center;
`;

const RoomDetailsForm = styled.form``;
const RoomTitle = styled.input``;
const RoomDescription = styled.textarea``;
const RoomPassword = styled.input``;

const PicturesForm = styled.form``;

const PictureSelect = styled.input``;

const SubmitRoom = styled.button``;

export default CreateRoomPage;

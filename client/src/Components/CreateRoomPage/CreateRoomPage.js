import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FileDrop } from "react-file-drop";
import styled from "styled-components";

import { signInContext } from "../SignIn/SignInContext";
import { addRoomInfo } from "../../actions";
const CreateRoomPage = () => {
  const dispatch = useDispatch();
  const roomState = useSelector((state) => state.room);
  const [roomTitle, setRoomTitle] = useState("");
  const [uploadedfiles, setUpLoadedFiles] = useState(null);
  const [files, setFiles] = useState({});

  const { appUser } = useContext(signInContext);
  console.log(appUser);

  const handleRoomSubmit = (ev) => {
    ev.preventDefault();
    const formData = new FormData();
    formData.append("RoomService", roomTitle);
    formData.append("myImages", files);
    formData.append("displayName", appUser.displayName);

    for (var x = 0; x < files.length; x++) {
      console.log("files [" + x + "]: ", files[x]);
      formData.append("file", files[x]);
    }

    fetch("/room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //   "Content-Type": "multipart/form-data",
      },
      credentials: "include",
      body: formData,
    })
      .then((res) => res.json())
      .then((roomInfo) => {
        console.log("INCREATEROOM", roomInfo);
        dispatch(addRoomInfo(roomInfo));
      });
  };
  const onChange = (ev) => {
    console.log("OnCHANGE", Object.values(ev.target.files));

    setFiles(Object.values(ev.target.files));
  };

  // console.log("FILES", files);
  return (
    <Wrapper>
      <RoomCreation
        action="/uploadmultiple"
        enctype="multipart/form-data"
        onSubmit={(ev) => {
          handleRoomSubmit(ev);
        }}
      >
        <RoomTitle
          type="text"
          value={roomTitle}
          onChange={(ev) => setRoomTitle(ev.currentTarget.value)}
        ></RoomTitle>

        <input
          type="file"
          name="myImages"
          multiple
          onChange={(ev) => onChange(ev)}
        ></input>

        <SubmitRoom type="submit">CreateRoom</SubmitRoom>
      </RoomCreation>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
`;
const RoomCreation = styled.form``;
const RoomTitle = styled.input``;

const DropZone = styled.div`
  border-style: solid;
  border-radius: 10px;
  height: 100px;
  width: 100%;
`;

const SubmitRoom = styled.button``;

export default CreateRoomPage;

// name="myImages"
// multiple
// //onFrameDragEnter={(event) => console.log("onFrameDragEnter", event)}
// // onFrameDragLeave={(event) => console.log("onFrameDragLeave", event)}
// // onFrameDrop={(event) => console.log("onFrameDrop", event)}
// // onDragOver={(event) => console.log("onDragOver", event)}
// // onDragLeave={(event) => console.log("onDragLeave", event)}
// onDrop={(ev, files) => onChange(ev, files)}

// //uSEMULTER ON DROP
// >
// {" "}
// DROP YOUR SHIT!

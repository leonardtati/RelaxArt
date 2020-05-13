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
  const [enableButton, setEnableButton] = useState(false);

  const { appUser } = useContext(signInContext);

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
    for (var x = 0; x < selectedFiles.length; x++) {
      formData.append("myImages", selectedFiles[x]);
    }
    formData.append("roomId", roomId);

    fetch("/uploadmultiple", {
      method: "POST",
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
      <CreateRoomTitle>
        Create your own room in a few simple steps
      </CreateRoomTitle>
      <Wrapper>
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
              maxlength="50"
              value={roomDescript}
              onChange={(ev) => setRoomDescript(ev.target.value)}
            ></RoomDescription>
          </div>
          <div>
            <p>3. Make your room private (optional):</p>
            <RoomPassword
              type="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            ></RoomPassword>
          </div>
          <div>
            <CreateBasicDetails
              type="submit"
              onClick={() => {
                setEnableButton(true);
              }}
            >
              {" "}
              Create basic details{" "}
            </CreateBasicDetails>
          </div>
        </RoomDetailsForm>
        {enableButton === true ? (
          <TheForm>
            <PicturesForm
              action="/uploadmultiple"
              enctype="multipart/form-data"
              onSubmit={(ev) => {
                handleSubmitPictures(ev);
              }}
            >
              <div>
                <p>4. Cool! now let's add some pictures !</p>
                <PictureSelect
                  type="file"
                  name="myImage"
                  multiple
                  onChange={(ev) => onChange(ev)}
                ></PictureSelect>
                <SubmitRoom type="submit">CreateRoom</SubmitRoom>
              </div>
            </PicturesForm>
          </TheForm>
        ) : (
          <></>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const CreateRoomTitle = styled.p`
  display: flex;
  justify-content: center;
`;

const RoomDetailsForm = styled.form`
  justify-content: left;
  align-items: left;
  padding: 60px;
  padding-right: 100px;
  border-right: solid;
`;
const RoomTitle = styled.input`
  display: flex;
  padding-left: 140px;
`;
const RoomDescription = styled.textarea`
  display: flex;
  padding: 50px;
`;

const RoomPassword = styled.input`
  margin-left: 56px;
`;

const CreateBasicDetails = styled.button`
  display: flex;
  margin-left: 60px;
  margin-top: 50px;
  border-radius: 0px;
  padding: 10px;
`;

const TheForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 156px;
  padding-left: 100px;
`;

const PicturesForm = styled.form`
  display: flex;
`;

const PictureSelect = styled.input`
  display: flex;
  padding-left: 60px;
`;

const SubmitRoom = styled.button`
  display: flex;
  margin-left: 60px;
  margin-top: 50px;
  border-radius: 0px;
  padding: 10px;
`;

export default CreateRoomPage;

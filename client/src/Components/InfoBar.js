import React from "react";

import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import styled from "styled-components";

// import onlineIcon from "../../icons/onlineIcon.png";
// import closeIcon from "../../icons/closeIcon.png";

const InfoBar = () => {
  const roomId = useParams();
  const rooms = useSelector((state) => state.rooms.rooms);
  const room = Object.values(rooms);

  return (
    <Wrapper>
      <LeftContainer>
        <img alt="online image" />
        <h3>roomame</h3>
      </LeftContainer>
      <RightContainer>
        <a href="/">
          <img alt="close image" />
        </a>
      </RightContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const LeftContainer = styled.div``;

const RightContainer = styled.div``;

export default InfoBar;

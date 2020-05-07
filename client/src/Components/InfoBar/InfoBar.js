import React from "react";

import styled from "styled-components";

import onlineIcon from "../../icons/onlineIcon.png";
import closeIcon from "../../icons/closeIcon.png";

const InfoBar = () => {
  return (
    <Wrapper>
      <LeftContainer>
        <img src={onlineIcon} alt="online image" />
        <h3>roomame</h3>
      </LeftContainer>
      <RightContainer>
        <a href="/">
          <img src={closeIcon} alt="close image" />
        </a>
      </RightContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const LeftContainer = styled.div``;

const RightContainer = styled.div``;

export default InfoBar;

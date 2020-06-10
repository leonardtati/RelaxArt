import React, { useState } from "react";
import styled from "styled-components";

const IoSignIn = () => {
  const [name, setName] = useState("");

  return (
    <Wrapper>
      <input type="text" onChange={(ev) => setName(ev.target.value)}></input>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
export default IoSignIn;

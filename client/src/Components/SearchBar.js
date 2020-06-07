import React, { useState } from "react";

import { useSelector } from "react-redux";

const SearchBar = () => {
  const roomState = useSelector((state) => state.rooms);
  const [searchedWord, setSearchedWord] = useState("");

  console.log("IN SEARCH BAR", roomState.rooms);

  return (
    <div>
      <input
        type="text"
        value={searchedWord}
        onChange={(ev) => {
          setSearchedWord(ev.target.value);
        }}
      ></input>
      <li></li>
    </div>
  );
};

export default SearchBar;

import React from "react";
import"./App.css";
import Header from "./Components/Header";
import List from "./Components/List";

const ListWrapper = () => {
  return (
    <div className="main-wrapper">
      <Header title="Friends List" />
      <List />
    </div>
  );
};

export default ListWrapper;

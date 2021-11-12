import React, { useState } from "react";
import "./index.css";
import PopUp from "../PopUp";

const ListUI = ({
  list,
  onDeleteName,
  favouriteList,
  favList,
  RemoveFromList,
}) => {
  return (
    <>
      {favList.map((val, index) => {
        return (
          <div className="list-wrapper" key={index}>
            <section>
              <h4>{val.name}</h4>
              <span>{val.status}</span>
            </section>
            <section className="icon-alignment">
              <i
                className={`fa fa-star-o ${val.sortIcon ? " sort-color" : ""}`}
                id={index}
                onClick={RemoveFromList}
              ></i>
            </section>
            <section className="icon-alignment">
              <i
                className="fa fa-trash-o"
                onClick={onDeleteName}
                id={index}
              ></i>
            </section>
          </div>
        );
      })}
      {list.map((val, index) => {
        return (
          <div className="list-wrapper" key={index}>
            <section>
              <h4>{val.name}</h4>
              <span>{val.status}</span>
            </section>
            <section className="icon-alignment">
              <i
                className={`fa fa-star-o ${val.sortIcon ? " sort-color" : ""}`}
                id={index}
                onClick={favouriteList}
              ></i>
            </section>
            <section className="icon-alignment">
              <i
                className="fa fa-trash-o"
                onClick={onDeleteName}
                id={index}
              ></i>
            </section>
          </div>
        );
      })}
    </>
  );
};

const List = () => {
  const [list, updateList] = useState([
    { name: "Rahul", status: "is your friend", sortIcon: false },
  ]);
  const [userName, updateUserName] = useState({
    name: "",
    status: "is your friend",
  });
  const [favList, updateFavList] = useState([]);
  const [error, setError] = useState(false);
  const [showPopUp, setShowPopUp] = useState({show:false, id:0});
  const [searchIcon, setSearchIcon] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const listPerPage = 4;

  const indexOfLastTodo = currentPage * listPerPage;
  const indexOfFirstTodo = indexOfLastTodo - listPerPage;
  const lists = list.slice(indexOfFirstTodo, indexOfLastTodo);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(list.length / listPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (event) => {
    setCurrentPage(event.target.id);
  };
  const addFriendList = (event) => {
    if (event.key === "Enter" && event.target.value === "") {
      setError(true);
    } else if (
      event.key === "Enter" &&
      event.target.value !== "" &&
      event.target.name === "name"
    ) {
      updateList([...list, userName]);
    } else if (
      event.key === "Enter" &&
      event.target.value !== "" &&
      event.target.name === "searchName"
    ) {
      const filterList = list.find((element) => element.name === searchName);
      updateList([filterList]);
    }
  };
  const onChangeName = (event) => {
    if (event.target.name === "searchName") {
      setSearchName(event.target.value);
    } else {
      let data = {
        ...userName,
        [event.target.name]: event.target.value,
      };
      updateUserName(data);
    }
  };
  const onDeleteName = (event) => {
    let test = [...list];
    test.splice(event.target.id, 1);
    updateList(test);
    setShowPopUp(false);
  };

  const searchOpen = () => setSearchIcon(!searchIcon);

  const favouriteList = (event) => {
    list[event.target.id].sortIcon = !list[event.target.id].sortIcon;
    if (list[event.target.id].sortIcon === true) {
      updateFavList([...favList, list[event.target.id]]);
      let test = [...list];
      test.splice(event.target.id, 1);
      updateList(test);
    }
  };

  const RemoveFromList = (event) => {
    favList[event.target.id].sortIcon = !favList[event.target.id].sortIcon;
    updateList([...list, favList[event.target.id]]);
    let test = [...favList];
    test.splice(event.target.id, 1);
    updateFavList(test);
  };

  const showDeleteDialog = (event) => {
    let test = {
      ...showPopUp,
      show: true,
      id: event.target.id,
    }
    setShowPopUp(test);
  }

  const cancelDeleteDialog = () => setShowPopUp(false);

  const renderPageNumbers =
    pageNumbers.length > 1 &&
    pageNumbers.map((number) => {
      return (
        <li key={number} id={number} onClick={handleClick}>
          {number}
        </li>
      );
    });
  return (
    <>
      <i className="fa fa-search search-alignment" onClick={searchOpen}></i>
      {searchIcon ? (
        <input
          type="search"
          placeholder="Search name"
          className={`input-alignment ${error ? " error-border" : ""}`}
          value={searchName}
          onKeyDown={addFriendList}
          onChange={onChangeName}
          name="searchName"
        />
      ) : (
        <input
          type="search"
          placeholder="Enter your friend's name"
          className={`input-alignment ${error ? " error-border" : ""}`}
          value={userName.name}
          onKeyDown={addFriendList}
          onChange={onChangeName}
          name="name"
        />
      )}
      <ListUI
        list={lists}
        onDeleteName={showDeleteDialog}
        favouriteList={favouriteList}
        favList={favList}
        RemoveFromList={RemoveFromList}
      />
      {pageNumbers.length > 1 && <ul id="page-numbers">{renderPageNumbers}</ul>}
      {showPopUp.show && (
        <PopUp
          onDeleteName={onDeleteName}
          cancelDeleteDialog={cancelDeleteDialog}
          id={showPopUp.id}
        />
      )}
    </>
  );
};

export default List;

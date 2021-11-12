import React from "react";

const PopUp = ({ onDeleteName, cancelDeleteDialog, id }) => {
  return (
    <div className="pop-up" id={id}>
      <p>Are you sure you want to delete name?</p>
      <button className="delete-btn" onClick={onDeleteName} id={id}>
        Yes
      </button>
      <button className="cancel-btn" onClick={cancelDeleteDialog}>
        No
      </button>
    </div>
  );
};

export default PopUp;

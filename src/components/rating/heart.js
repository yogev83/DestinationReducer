import React from "react";

export const Heart = ({ rating, id, onClick }) => {
  return (
    <div
      className={`heart${id <= rating ? " active" : ""}`}
      onClick={() => {
        onClick(id);
      }}
    ></div>
  );
};

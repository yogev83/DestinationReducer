import React from "react";
import { Gallery } from "./gallery";
import { Rating } from "./rating/rating";

import "./destination.css";

export const Destination = ({
  name,
  desc,
  distance,
  website,
  attractions,
  images,
  goBack,
  remove,
  rating,
  setRating,
}) => {
  const attractionsContent = React.useMemo(() => {
    const liElements = attractions.split(",").map((attraction, i) => {
      return <li key={i}>{attraction}</li>;
    });
    return (
      <fieldset className="attrations">
        <legend>:דברים מעניינים</legend>
        <ul>{liElements}</ul>
      </fieldset>
    );
  }, [attractions]);

  return (
    <>
      <div className="destination">
        <header>
          <p className="back" onClick={goBack}>
            {"< חזור"}
          </p>
          <p className="remove" onClick={remove}>
            {"X להסרה"}
          </p>
        </header>
        <h1 className="destName">{name}</h1>
        <h3 className="desc">{desc}</h3>
        <div className="drivingTime">זמן נסיעה: {distance} שעות</div>
        {attractionsContent}
        <a href={website}>אתר</a>
        <Gallery images={images} />
        <Rating rating={rating} setRating={setRating} />
      </div>
    </>
  );
};

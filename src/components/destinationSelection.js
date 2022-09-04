import React from "react";

import "./destinationSelection.css";

export const DestinationSelection = ({ destinations, select, remove }) => {
  const destElements = React.useMemo(() => {
    return destinations.map((destination, i) => {
      return (
        <div
          className="destinationItem"
          key={i}
          onClick={() => {
            select(destination.id);
          }}
        >
          {destination.rating > 0 ? (
            <h5 className="destRating">
              {destination.rating}
              <div></div>
            </h5>
          ) : null}

          <div className="destTitle">
            <h3>{destination.name}</h3>
            <p className="destDesc">{destination.desc}</p>
          </div>

          <h5 className="drivingTime">{destination.distance} שעות</h5>

          <div
            className="removeDest"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              remove(destination.id);
            }}
          ></div>
        </div>
      );
    });
  }, [destinations, remove, select]);

  return <div className="destinationsSelection">{destElements}</div>;
};

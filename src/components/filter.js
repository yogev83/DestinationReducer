import React from "react";
import "./filter.css";

const times = new Array(7).fill(1).map((_, i) => i + 1);

export const Filter = ({ maxDrive, setMaxDrive, sortBy, setSortBy, reset }) => {
  const maxDrivingOptions = React.useMemo(() => {
    return times.map((time) => {
      return (
        <option key={time} value={time}>
          {time}
        </option>
      );
    });
  }, []);

  return (
    <div className="filter">
      <span className="reset" onClick={reset}>
        &#x21bb;
      </span>
      <span>
        <select
          value={maxDrive}
          onChange={(e) => setMaxDrive(e.currentTarget.value)}
        >
          {maxDrivingOptions}
        </select>
        זמן נסיעה מירבי
      </span>
      <span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.currentTarget.value)}
        >
          <option key={0} value={"name"}>
            שם
          </option>
          <option key={1} value={"distance"}>
            מרחק
          </option>
          <option key={2} value={"rating"}>
            דירוג
          </option>
        </select>
        מיין לפי
      </span>
    </div>
  );
};

import React from "react";
import { Heart } from "./heart";

import "./rating.css";

const NUMBER_OF_HEARTS = 10;

export const Rating = ({ rating, setRating }) => {
  const [state, setState] = React.useState(rating);

  const heartSelect = React.useCallback(
    (id) => {
      setState(id);
      setRating(id);
    },
    [setRating]
  );

  const hearts = React.useMemo(() => {
    const arr = [];
    for (let i = 1; i <= NUMBER_OF_HEARTS; i++) {
      arr.push(<Heart rating={state} id={i} key={i} onClick={heartSelect} />);
    }
    return arr;
  }, [heartSelect, state]);

  return (
    <>
      <div className="rating">
        <span className="hearts">
          <div className="heartsContainer">{hearts}</div>
        </span>
        <span>:הוספת דירוג</span>
      </div>
    </>
  );
};

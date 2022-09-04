import React from "react";
import { Destination } from "./components/destination";
import { destinations } from "./destinations";
import { DestinationSelection } from "./components/destinationSelection";
import { Filter } from "./components/filter";

import "./App.css";

function App() {
  const [destinationsCollection, setDestinationsCollection] =
    React.useState(destinations);

  const [destinationId, setDestinationId] = React.useState(null);
  const [maxDrive, setMaxDrive] = React.useState(7);
  const [sortBy, setSortBy] = React.useState("name");

  const filteredDestinations = React.useMemo(() => {
    const filtered = [];
    for (const id in destinationsCollection) {
      if (
        destinationsCollection[id].distance <= maxDrive &&
        destinationsCollection[id].visible
      ) {
        filtered.push({ ...destinationsCollection[id], id: id });
      }
    }

    filtered.sort((a, b) => {
      if (sortBy === "distance") {
        return a.distance - b.distance;
      } else if (sortBy === "rating") {
        return b.rating - a.rating;
      } else {
        return a.name <= b.name ? -1 : 1;
      }
    });
    return filtered;
  }, [destinationsCollection, maxDrive, sortBy]);

  const updateStorage = React.useCallback((dest, key, value) => {
    const currentData = JSON.parse(localStorage.getItem(dest));
    const newData = { ...currentData, [key]: value };
    localStorage.setItem(dest, JSON.stringify(newData));
  }, []);

  const remove = React.useCallback(
    (destId) => {
      setDestinationsCollection((s) => {
        const newS = { ...s };
        newS[destId].visible = false;
        return newS;
      });
      updateStorage(destId, "visible", false);
    },
    [updateStorage]
  );

  const setRating = React.useCallback(
    (destId, rating) => {
      setDestinationsCollection((s) => {
        const newS = { ...s };
        newS[destId].rating = rating;
        return newS;
      });
      updateStorage(destId, "rating", rating);
    },
    [updateStorage]
  );

  const reset = React.useCallback(() => {
    for (const dest in destinationsCollection) {
      localStorage.removeItem(dest);
    }
    window.location.reload();
  }, [destinationsCollection]);

  React.useEffect(() => {
    let savedBuffer;
    let savedObjectBuffer;
    let newCollection = { ...destinationsCollection };
    for (const dest in newCollection) {
      savedBuffer = localStorage.getItem(dest);
      if (savedBuffer) {
        savedObjectBuffer = JSON.parse(savedBuffer);
        newCollection[dest] = { ...newCollection[dest], ...savedObjectBuffer };
      }
    }
    setDestinationsCollection(newCollection);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      {destinationId ? (
        <Destination
          {...destinationsCollection[destinationId]}
          goBack={() => {
            setDestinationId(null);
          }}
          remove={() => {
            setDestinationId(null);
            remove(destinationId);
          }}
          setRating={(rating) => {
            setRating(destinationId, rating);
          }}
        />
      ) : (
        <>
          <header className="title">Destination Reducer</header>
          <Filter
            maxDrive={maxDrive}
            setMaxDrive={setMaxDrive}
            sortBy={sortBy}
            setSortBy={setSortBy}
            reset={reset}
          />
          <DestinationSelection
            destinations={filteredDestinations}
            select={setDestinationId}
            remove={remove}
          />
        </>
      )}
    </div>
  );
}

export default App;

import React from "react";
import "./gallery.css";

export const Gallery = ({ images }) => {
  const [state, setState] = React.useState(0);

  const imageDivs = React.useMemo(() => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return images.map((img, i) => <img key={i} src={img}></img>);
  }, [images]);

  const nextImage = () => {
    setState((s) => {
      return (s + 1) % images.length;
    });
  };

  return (
    <div className="gallery">
      {imageDivs[state]}
      <button onClick={nextImage}>תמונה הבאה</button>
    </div>
  );
};

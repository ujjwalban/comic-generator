// src/components/ComicPanel.js
import React from "react";

const ComicPanel = ({ imageURL }) => {
  return (
    <div className="comic-panel">
      <img src={imageURL} alt="Comic Panel" />
    </div>
  );
};

export default ComicPanel;

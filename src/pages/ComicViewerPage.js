// src/pages/ComicViewerPage.js
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ComicPanel from "../components/ComicPanel";

const ComicViewerPage = () => {
  const location = useLocation();
  const [comicPanels, setComicPanels] = useState(
    location.state?.comicPanels || []
  );

  return (
    <div className="comic-viewer">
      <h1>Comic Viewer</h1>
      <div className="comic-panel-container">
        {comicPanels.map((panel, index) => (
          <ComicPanel key={index} imageURL={panel.imageURL} />
        ))}
      </div>
      <div className="navigation-buttons">
        <Link to="/">Back to Generator</Link>
      </div>
    </div>
  );
};

export default ComicViewerPage;

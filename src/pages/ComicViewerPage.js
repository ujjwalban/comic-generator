// src/pages/ViewerPage.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ComicPanel from "../components/ComicPanel";

const ComicViewerPage = () => {
  const location = useLocation();
  const [comicImages, setComicImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    console.log("Location state:", location.state);
    if (location.state && location.state.comicImages) {
      setComicImages(location.state.comicImages);
    }
  }, [location]);

  useEffect(() => {
    console.log("Current Image Index:", currentImageIndex);
    console.log("Loaded Images:", comicImages.slice(0, currentImageIndex));
    const imageLoadInterval = setInterval(() => {
      if (currentImageIndex < comicImages.length) {
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(imageLoadInterval);
      }
    }, 1000); // Change the interval as needed

    return () => clearInterval(imageLoadInterval);
  }, [currentImageIndex, comicImages]);

  return (
    <div className="viewer-page">
      <h1>Comic Viewer</h1>
      <div className="comic-panel-container">
        {comicImages.slice(0, currentImageIndex).map((imageURL, index) => (
          <ComicPanel key={index} imageURL={imageURL} />
        ))}
      </div>
    </div>
  );
};

export default ComicViewerPage;

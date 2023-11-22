// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ComicGeneratorPage from "./pages/ComicGeneratorPage";
import ComicViewerPage from "./pages/ComicViewerPage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ComicGeneratorPage />} />
          <Route path="/viewer" element={<ComicViewerPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

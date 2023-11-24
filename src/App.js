// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ComicGeneratorPage from "./pages/ComicGeneratorPage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ComicGeneratorPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

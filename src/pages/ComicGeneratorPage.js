// src/pages/ComicGeneratorPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ComicPanel from "../components/ComicPanel";

const API_KEY =
  "VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM"; // Replace with your actual API key
const API_URL =
  "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud";

async function query(data) {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        Accept: "image/png",
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      responseType: "blob",
    });

    const result = new Blob([response.data], { type: "image/png" });
    return result;
  } catch (error) {
    throw new Error(`Failed to generate comic: ${error.message}`);
  }
}

const ComicGeneratorPage = () => {
  const [inputText, setInputText] = useState("");
  const [comicPanels, setComicPanels] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const generateComic = async (e) => {
    e.preventDefault();

    const panelCount = 10;
    const inputChunks = inputText.split(".").filter(Boolean);

    if (inputChunks.length < panelCount) {
      setError("Not enough sentences for the desired number of panels.");
      return;
    }

    try {
      const responses = await Promise.all(
        inputChunks.slice(0, panelCount).map(async (chunk, index) => {
          try {
            const response = await query({ inputs: chunk });
            const imageURL = URL.createObjectURL(response);
            return { index, imageURL };
          } catch (error) {
            throw new Error(
              `Failed to generate comic for Panel ${index + 1}: ${
                error.message
              }`
            );
          }
        })
      );

      // Sort the responses by index to ensure the order
      const sortedResponses = responses.sort((a, b) => a.index - b.index);

      setComicPanels(sortedResponses);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="comic-generator">
      <h1>Comic Generator</h1>
      <form onSubmit={generateComic}>
        <label htmlFor="inputText">Input Text:</label>
        <textarea
          id="inputText"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows="4"
          cols="50"
          required
        />
        <button type="submit">Generate Comic</button>
      </form>
      {error && <div className="error-message">{error}</div>}
      <div className="comic-panel-container">
        {comicPanels.map((panel, index) => (
          <ComicPanel key={index} imageURL={panel.imageURL} />
        ))}
      </div>
    </div>
  );
};

export default ComicGeneratorPage;

// src/pages/ComicGeneratorPage.js
import React, { useState } from "react";
import "./styles/ComicGeneratorPage.css";

const ComicGeneratorPage = () => {
  const [panels, setPanels] = useState(
    Array.from({ length: 10 }, () => ({ text: "", image: "" }))
  );
  const [loading, setLoading] = useState(false);

  const handleTextChange = (index, value) => {
    const updatedPanels = [...panels];
    updatedPanels[index].text = value;
    setPanels(updatedPanels);
  };

  const generateComic = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const updatedPanels = await Promise.all(
        panels.map(async (panel, index) => {
          try {
            const image = await query({ inputs: panel.text });
            return { text: panel.text, image };
          } catch (error) {
            throw new Error(
              `Failed to generate comic for Panel ${index + 1}: ${
                error.message
              }`
            );
          }
        })
      );
      setPanels(updatedPanels);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  async function query(data) {
    try {
      console.log("Sending request to the API...");

      const response = await fetch(
        "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
        {
          headers: {
            Accept: "image/png",
            Authorization:
              "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      console.log("Received response from the API:", response);

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const result = await response.blob();
      const imageUrl = URL.createObjectURL(result);

      console.log("Image URL:", imageUrl);

      // Check if the response contains image data
      if (!result.size) {
        throw new Error("API response did not contain image data");
      }

      return imageUrl;
    } catch (error) {
      console.error("Error in query function:", error);
      throw error;
    }
  }

  return (
    <div className="comic-generator">
      <div className="panels-container">
        {panels.map((panel, index) => (
          <div key={index} className="panel">
            <textarea
              placeholder={`Enter text for Panel ${index + 1}`}
              value={panel.text}
              onChange={(e) => handleTextChange(index, e.target.value)}
              required
            />
            {panel.image && (
              <img src={panel.image} alt={`Comic Panel ${index + 1}`} />
            )}
          </div>
        ))}
      </div>
      <button type="button" onClick={generateComic} disabled={loading}>
        {loading ? "Generating..." : "Generate Comic"}
      </button>
    </div>
  );
};

export default ComicGeneratorPage;

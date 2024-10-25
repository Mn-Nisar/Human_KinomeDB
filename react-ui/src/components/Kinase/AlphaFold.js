// src/AlphaFold.js

import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

const AlphaFold = () => {
  const [proteinId, setProteinId] = useState("");
  const [error, setError] = useState("");
  const viewerRef = useRef(null);

  // useEffect(() => {
  //   // Initialize the 3Dmol viewer only when the component is mounted
  //   if (viewerRef.current) {
  //     window.viewer = window.ThreeDmol.createViewer(viewerRef.current, {
  //       defaultmodels: true,
  //     });
  //   }
  // }, [viewerRef]);

  const fetchProteinStructure = async () => {
    try {
      setError("");
      // Fetch the PDB file for the given protein ID from the RCSB PDB
      const pdbResponse = await axios.get(
        `https://files.rcsb.org/view/${proteinId}.pdb`
      );
      visualizeStructure(pdbResponse.data);
    } catch (err) {
      setError(
        "Error fetching protein structure. Please check the Protein ID."
      );
      console.error(err);
    }
  };

  const visualizeStructure = (pdbData) => {
    if (window.viewer) {
      window.viewer.removeAll(); // Clear previous models
      window.viewer.addModel(pdbData, "pdb"); // Add new model
      window.viewer.setStyle({}, { stick: {} }); // Set style for visualization
      window.viewer.setBackgroundColor("white");
      window.viewer.zoomTo();
      window.viewer.render();
    }
  };

  return (
    <div>
      <h1>AlphaFold Protein Structure Prediction</h1>
      <input
        type="text"
        placeholder="Enter Protein ID (e.g., 1BNA)"
        value={proteinId}
        onChange={(e) => setProteinId(e.target.value)}
      />
      <button onClick={fetchProteinStructure}>Fetch Structure</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        ref={viewerRef}
        style={{
          width: "800px",
          height: "600px",
          border: "1px solid black",
          marginTop: "20px",
        }}
      ></div>
    </div>
  );
};

export default AlphaFold;

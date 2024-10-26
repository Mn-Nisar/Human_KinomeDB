import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import Frequency from "../components/Kinase/Frequency";
import HeatMap from "../components/HeatMap/HeatMap";
import Conserve from "../components/Conserve/Conserve";
import Cptac from "../components/Cptac/Cptac";
import SectionFive from "../components/SectionFive/SectionFive";
import "./Kinase.css";

const Kinase = () => {
  const { kinase } = useParams();
  const [activeTab, setActiveTab] = useState("heatmap");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  const frequencyComponent = useMemo(
    () => <Frequency kinase={kinase} />,
    [kinase]
  );

  return (
    <React.Fragment>
      <div className="flex items-center justify-center">
        {frequencyComponent}
      </div>
      <hr />

      {/* Tab Navigation */}
      <div className="tab-container">
        <div
          className={`tab-item ${activeTab === "heatmap" ? "active" : ""}`}
          onClick={() => handleTabClick("heatmap")}
        >
          Heatmap
        </div>
        <div
          className={`tab-item ${activeTab === "radial" ? "active" : ""}`}
          onClick={() => handleTabClick("radial")}
        >
          Radial Distance
        </div>
        <div
          className={`tab-item ${activeTab === "conserve" ? "active" : ""}`}
          onClick={() => handleTabClick("conserve")}
        >
          Some Sheera Plot
        </div>
        <div
          className={`tab-item ${activeTab === "cptac" ? "active" : ""}`}
          onClick={() => handleTabClick("cptac")}
        >
          CPTAC Cancer data
        </div>
        <div
          className={`tab-item ${activeTab === "sectionFive" ? "active" : ""}`}
          onClick={() => handleTabClick("sectionFive")}
        >
          Section Five Plot
        </div>
      </div>

      {/* Tab Content */}
      <div className="content-section">
        {activeTab === "heatmap" && <HeatMap kinase={kinase} />}
        {activeTab === "conserve" && <Conserve kinase={kinase} />}
        {activeTab === "cptac" && <Cptac kinase={kinase} />}
        {activeTab === "sectionFive" && <SectionFive kinase={kinase} />}
      </div>
    </React.Fragment>
  );
};

export default Kinase;

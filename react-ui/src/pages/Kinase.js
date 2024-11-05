import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import Frequency from "../components/Kinase/Frequency";
import HeatMap from "../components/HeatMap/HeatMap";
import Conserve from "../components/Conserve/Conserve";
import Cptac from "../components/Cptac/Cptac";
import SectionFive from "../components/SectionFive/SectionFive";
import "./Kinase.css";

// Memoize the components
const MemoizedHeatMap = React.memo(HeatMap);
const MemoizedConserve = React.memo(Conserve);
const MemoizedCptac = React.memo(Cptac);
const MemoizedSectionFive = React.memo(SectionFive);

const Kinase = () => {
  const { kinase } = useParams();
  const [activeTab, setActiveTab] = useState("frequency"); // Initialize with null

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const frequencyComponent = useMemo(
    () => <Frequency kinase={kinase} />,
    [kinase]
  );

  return (
    <React.Fragment>
      <div className="navbar">
        {/* Sidebar Navigation */}
        <div className="sidebar">
        <div
            className={`tab-item ${activeTab === "frequency" ? "active" : ""}`}
            onClick={() => handleTabClick("frequency")}
          >
            Lollipop
          </div>
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
            Family Conservation
          </div>
          <div
            className={`tab-item ${activeTab === "cptac" ? "active" : ""}`}
            onClick={() => handleTabClick("cptac")}
          >
            CPTAC Cancer Data
          </div>
          <div
            className={`tab-item ${activeTab === "sectionFive" ? "active" : ""}`}
            onClick={() => handleTabClick("sectionFive")}
          >
            Section Five Plot
          </div>
        </div>

        {/* Content Section */}
        <div className="content">
          <div className="flex items-center justify-center">
          {activeTab === "frequency" ? frequencyComponent : null} {/* Show Frequency only when activeTab is 'frequency' */}
          </div>
          <hr />
          <div className="content-section">
            {activeTab === "frequency" && <frequencyComponent kinase={kinase} />}
            {activeTab === "heatmap" && <MemoizedHeatMap kinase={kinase} />}
            {activeTab === "radial" && <div>Radial Component Goes Here</div>} {/* Add your Radial component here */}
            {activeTab === "conserve" && <MemoizedConserve kinase={kinase} />}
            {activeTab === "cptac" && <MemoizedCptac kinase={kinase} />}
            {activeTab === "sectionFive" && <MemoizedSectionFive kinase={kinase} />}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Kinase;

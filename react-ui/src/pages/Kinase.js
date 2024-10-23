import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Frequency from "../components/Kinase/Frequency";
import HeatMap from "../components/HeatMap/HeatMap";

const Kinase = () => {
  const { kinase } = useParams();
  const [heatMap, setHeatMap] = useState(false);
  // const []

  const getHeatmapHandler = () => {
    setHeatMap(true);
  };

  return (
    <React.Fragment>
      <div className="flex items-center justify-center">
        <Frequency kinase={kinase} />
      </div>
      <hr></hr>
      <div className="flex items-center justify-center">
        <button
          className="px-4 py-4 m-4 bg-blue-500 text-white rounded-sm"
          onClick={getHeatmapHandler}
        >
          Heatmap
        </button>

        <button className="px-4 py-4 m-4 bg-blue-500 text-white rounded-sm">
          Radial Distance
        </button>
        <button className="px-4 py-4 m-4 bg-blue-500 text-white rounded-sm">
          More
        </button>
      </div>

      {heatMap && <HeatMap kinase={kinase} />}
    </React.Fragment>
  );
};

export default Kinase;

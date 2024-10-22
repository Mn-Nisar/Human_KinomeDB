import React from "react";
import useGet from "../../hooks/useGet";
import { API_ENDPOINTS } from "../../config/api";
import Loading from "../../UI/Loading";
import HeatMapPlot from "./HeatMapPlot";

const HeatMap = (props) => {
  const kinase = props.kinase;

  const url = API_ENDPOINTS.GET_INTER_DEP;

  const options = {
    kinase: kinase,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { data, loading, error } = useGet(url, options);
  return <React.Fragment>{data && <HeatMapPlot data={data} />}</React.Fragment>;
};

export default HeatMap;

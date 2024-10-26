import React from "react";
import Loading from "../../UI/Loading";
import BarPlot from "./BarPlot";
import { API_ENDPOINTS } from "../../config/api";
import useGet from "../../hooks/useGet";

const Cptac = (props) => {
  const kinase = props.kinase;
  const url = API_ENDPOINTS.GET_CPTAC;

  const options = {
    kinase: kinase,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { data, loading, error } = useGet(url, options);
  return (
    <React.Fragment>
      {loading && <Loading />}
      {data && <BarPlot data={data} />}
    </React.Fragment>
  );
};

export default Cptac;

import React from "react";
import Loading from "../../UI/Loading";
import { API_ENDPOINTS } from "../../config/api";
import useGet from "../../hooks/useGet";
import ConservePlot from "./ConservePlot";

const Conserve = (props) => {
  const kinase = props.kinase;
  const url = API_ENDPOINTS.GET_CONSERVE;

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
      {data && <ConservePlot data={data} />}
    </React.Fragment>
  );
};

export default Conserve;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../UI/Loading";
import { API_ENDPOINTS } from "../../config/api";
import Lollipop from "../Lollipop/Lollipop";
import useGet from "../../hooks/useGet";

const Frequency = (props) => {
  const kinase = props.kinase;
  console.log("RUNNIG FREQUENCY");
  const url = API_ENDPOINTS.GET_FREQUENCY;

  const options = {
    kinase: kinase,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { data, loading, error } = useGet(url, options);

  if (loading) return <Loading />;

  return <div>{data && <Lollipop data={data} />}</div>;
};

export default Frequency;

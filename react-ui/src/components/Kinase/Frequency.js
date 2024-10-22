import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../UI/Loading";
import { API_ENDPOINTS } from "../config/api";

const Kinase = () => {
  const { kinase } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_ENDPOINTS.GET_KINASE, {
          params: { kinase },
          headers: {
            "Content-Type": "application/json",
          },
        });
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [kinase]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Kinase Information</h1>
      <p>Fasta: {data?.fasta}</p>
      <h2>Frequency Data</h2>
      <ul>
        {data?.frequency.map((freq, index) => (
          <li key={index}>
            Site: {freq.site}, Frequency: {freq.frequency}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Kinase;

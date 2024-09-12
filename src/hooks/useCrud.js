import getConfigToken from "@/utils/getConfigToken";
import axios from "axios";
import React, { useState } from "react";

const useCrud = (BASEURL) => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getApi = async (path) => {
    const url = `${BASEURL}${path}`;
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(url, getConfigToken());
      setResponse(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const createApi = async (path, data) => {
    const url = `${BASEURL}${path}`;
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post(url, data, getConfigToken());
      setResponse((prevResponse) => [...prevResponse, res.data]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateApi = (path, id, data) => {
    const url = `${BASEURL}${path}${id}`;
    axios
      .put(url, data, getConfigToken())
      .then((res) => {
        console.log(res.data);
        setResponse(response.map((e) => (e.id === id ? res.data : e)));
      })
      .catch((err) => console.log(err));
  };

  const deleteApi = (path, id) => {
    const url = `${BASEURL}${path}${id}`;
    axios
      .delete(url, getConfigToken())
      .then((res) => {
        console.log(res.data);
        setResponse(response.filter((e) => e.id !== id));
      })
      .catch((err) => console.log(err));
  };

  return [response, getApi, createApi, updateApi, deleteApi, loading, error];
};

export default useCrud;

import { useEffect, useState } from "react";
import axios from "axios";

export const useAxios = (url, method, data) => {
  const [state, setState] = useState({ data: [], loading: true });

  useEffect(() => {
    if (method === "get") {
      axios
        .get(url)
        .then((response) => {
          setState({ data: response.data, loading: false });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (method === "post") {
      axios.post(url, data).catch((err) => {
        console.log(err);
      });
    }
  }, [url, method, data]);

  return state;
};

import axios from "axios";

const queryCalculator = async (query) => {
  const res = await axios
    .get("http://localhost/api/stocks/", {
      params: query,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));

  return res;
};

export default queryCalculator;

import axios from "axios";

const queryCalculator = async (query) => {
  console.log("Suhas pro coder", query);
  const res = await axios
    .get("http://localhost/api/stocks/", {
      query,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));

  return res;
};

export default queryCalculator;

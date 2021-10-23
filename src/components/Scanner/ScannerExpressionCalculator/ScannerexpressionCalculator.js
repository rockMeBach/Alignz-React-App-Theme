import axios from "axios";
import BACKEND_URL from "../../../Backend_url";

const queryCalculator = async query => {
    const res = await axios.get(`http://${BACKEND_URL}/api/stocks/`, {

        params: query
    }).then(res => {

        return res;
    }).catch(err => console.log(err));

    return res;
}

export default queryCalculator;

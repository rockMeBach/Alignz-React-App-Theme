import axios from "axios";
import {SMA, RSI} from 'technicalindicators';

const queryCalculator = async query => {

    // console.log(query)
    
    let backendQuery = {
        starttime: query.starttime,
        endtime: query.endtime
    };
    
    const res = await axios.get('http://backend-allinz.herokuapp.com/api/stocks/', {

        params: query
    }).then(res => {

        return res;
    }).catch(err => console.log(err));

    return res;
}

export default queryCalculator;
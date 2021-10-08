import axios from "axios";
import {SMA, RSI} from 'technicalindicators';

const queryCalculator = async query => {

    console.log(query)
    
    let backendQuery = {
        starttime: query.startTime,
        endtime: query.endTime
    };
        

    const res = axios.get('http://localhost/api/stocks/', {

        params: backendQuery
    }).then(res => {

        let openPrice = [];
        let closePrice = [];
        let highPrice = [];
        let lowPrice = [];

        console.log(res);
        res.data.forEach(e => {
            
            // console.log(e)
            // console.log(e.open)
            openPrice.push(parseFloat(e.open));
            closePrice.push(parseFloat(e.close));
            highPrice.push(parseFloat(e.high));
            lowPrice.push(parseFloat(e.low));
        });
        
        console.log(openPrice)
        // console.log(closePrice)
        // console.log(highPrice)
        // console.log(lowPrice)

        // let final_result = SMA.calculate({period : 5, values : openPrice})
        console.log("SMA", RSI.calculate({period : 8, values : openPrice}))    
    
        // let period = 8;
        // let values = [1,2,3,4,5,6,7,8,9,10,11,12,13];                    

        // console.log(SMA.calculate({period : period, values : values})) 

        return res;

    }).catch(err => console.log(err));

    return res;
}

export default queryCalculator;
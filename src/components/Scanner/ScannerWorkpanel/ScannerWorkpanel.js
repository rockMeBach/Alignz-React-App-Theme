import React from 'react'
import './ScannerWorkpanel.scss'
import WorkpanelHeading from '../WorkpanelHeading/WorkpanelHeading'
import WorkpanelFilter from '../WorkpanelFilter/WorkpanelFilter'
import axios from 'axios';
import {SMA, RSI} from 'technicalindicators';

const ScannerWorkpanel = ({ scannerResultDisplay }) => {

    const convertTime12to24 = time12h => {
        const [time, modifier] = time12h.split(" ");
        
        let [hours, minutes] = time.split(":");
        
        if (hours === "12") {
            hours = "00";
        }
        
        if (modifier === "PM") {
            hours = parseInt(hours, 10) + 12;
        }
        
        return `${hours}:${minutes}`;
    };

    const fetchScannerResults = async () => {
        
        let conditions = document.getElementById("scanner-condition-indicators").childNodes;
        let flag = true;
        let comparison;
        let LHS = [];
        let RHS = [];
        conditions.forEach(e => {
            
            console.log(e.childNodes[1].id, e.childNodes[1].data);
            if(e.childNodes[1].id === '<' || e.childNodes[1].id === '>') {
                
                comparison = e.childNodes[1].id;
                flag = false;
            }
            else if(flag)
                LHS.push(e.childNodes[1].data);
            else    
                RHS.push(e.childNodes[1].data);
        });

        if(!document.getElementById("satisfy").checked)
            comparison = !comparison;

        // let query = {
        //     startTime: document.getElementById("scanner-start-time").childNodes[1].value,
        //     endTime: document.getElementById("scanner-end-time").childNodes[1].value,
        //     fnoLotSize: document.getElementById("scanner-fno-lot-size").value,
        //     segment: document.getElementById("scanner-segment").value,
        //     segment1a: document.getElementById("scanner-segment-1a").value,
        //     comparison: comparison,
        //     LHS: LHS,
        //     RHS: RHS
        // };

        let starttime = document.getElementById("scanner-start-time").childNodes[1].value;
        let endtime = document.getElementById("scanner-end-time").childNodes[1].value;

        if(starttime)
            starttime = convertTime12to24(starttime)
        
        if(endtime)
            endtime = convertTime12to24(endtime)

        let query = {
            starttime: starttime,
            endtime: endtime
        };

        // console.log(query)
        
        axios.get('http://localhost/api/stocks/', {
            params: query
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

            scannerResultDisplay(res)
            
        }).catch(err => console.log(err))

    }

    return (
        <div className='col-lg-12 scanner-workpanel-component'>
            
            <WorkpanelHeading />
            <WorkpanelFilter />

            <button className="btn submit-btn" onClick={fetchScannerResults}>
                Submit
            </button>

        </div>
    )
}

export default ScannerWorkpanel

import React from 'react'
import './ScannerWorkpanel.scss'
import WorkpanelHeading from '../WorkpanelHeading/WorkpanelHeading'
import WorkpanelFilter from '../WorkpanelFilter/WorkpanelFilter'
import axios from 'axios';
import technicalIndicator from 'technicalindicators';

const ScannerWorkpanel = ({ scannerResultDisplay }) => {

    const fetchScannerResults = () => {
        
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

        let query = {
            startTime: document.getElementById("scanner-start-time").childNodes[1].value,
            endTime: document.getElementById("scanner-end-time").childNodes[1].value,
            fnoLotSize: document.getElementById("scanner-fno-lot-size").value,
            segment: document.getElementById("scanner-segment").value,
            segment1a: document.getElementById("scanner-segment-1a").value,
            comparison: comparison,
            LHS: LHS,
            RHS: RHS
        };

        console.log(query)
        
        axios.get('http://localhost/scanner/data/', {
            params: query
        }).then(res => {

            let openPrice = [];
            let closePrice = [];
            let highPrice = [];
            let lowPrice = [];

            // scannerResultDisplay(res)
            console.log(res);
            res.data.forEach(e => {

                // console.log(e)
                // console.log(e.open)
                openPrice.push(e.open);
                closePrice.push(e.close);
                highPrice.push(e.high);
                lowPrice.push(e.low);
            });

            console.log(openPrice)
            console.log(closePrice)
            console.log(highPrice)
            console.log(lowPrice)

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

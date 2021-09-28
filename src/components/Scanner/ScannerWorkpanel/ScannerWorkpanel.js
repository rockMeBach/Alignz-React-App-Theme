import React from 'react'
import './ScannerWorkpanel.scss'
import WorkpanelHeading from '../WorkpanelHeading/WorkpanelHeading'
import WorkpanelFilter from '../WorkpanelFilter/WorkpanelFilter'
import axios from 'axios';

const ScannerWorkpanel = () => {

    const fetchScannerResults = () => {
        
        let conditions = document.getElementById("scanner-condition-indicators").childNodes;
        let flag = true;
        let comparison;
        let LHS = [];
        let RHS = [];
        conditions.forEach(e => {
            
            if(e.id === '<' || e.id === '>') {
                
                comparison = e.id === '>' ? true : false;
                flag = false;
            }
            else if(flag)
                LHS.push(e.id);
            else    
                RHS.push(e.id);
        });

        if(!document.getElementById("satisfy").checked)
            comparison = !comparison;

        let query = {
            year: '2017',
            startTime: document.getElementById("scanner-start-time").childNodes[1].value,
            endTime: document.getElementById("scanner-end-time").childNodes[1].value,
            fnoLotSize: document.getElementById("scanner-fno-lot-size").value,
            segment: document.getElementById("scanner-segment").value,
            segment1a: document.getElementById("scanner-segment-1a").value,
            comparison: comparison,
            LHS: LHS[0],
            RHS: RHS[0]
        };

        console.log(query)
        
        axios.get('http://localhost/scanner/data/', {
            params: query
        })

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

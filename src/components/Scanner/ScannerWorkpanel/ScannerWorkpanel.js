import React from 'react'
import './ScannerWorkpanel.scss'
import WorkpanelHeading from '../WorkpanelHeading/WorkpanelHeading'
import WorkpanelFilter from '../WorkpanelFilter/WorkpanelFilter'

const ScannerWorkpanel = () => {
    return (
        <div className='col-lg-12 scanner-workpanel-component'>
            
            <WorkpanelHeading />
            <WorkpanelFilter />


        </div>
    )
}

export default ScannerWorkpanel

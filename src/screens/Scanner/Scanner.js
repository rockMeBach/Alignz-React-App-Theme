import React from 'react'
import PageHeader from "../../components/PageHeader";
import ScannerWorkPanel from "../../components/Scanner/ScannerWorkpanel/ScannerWorkpanel"
import ScannerResults from '../../components/Scanner/ScannerResults/ScannerResults';
import Disclaimer from '../../components/Scanner/Disclaimer/Disclaimer';

const Scanner = () => {
    return (
        <div style={{ flex: 1 }}>
            <div>
                <div className="container-fluid">
                    <PageHeader
                    HeaderText="Scanner"
                    Breadcrumb={
                        [
                            { name: "Scanner" },
                        ]
                    }
                    />
                </div>

                <ScannerWorkPanel />
                <ScannerResults />
                <Disclaimer />
            
            </div>
        </div>
    )
}

export default Scanner

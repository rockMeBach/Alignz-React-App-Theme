import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import ScannerWorkPanel from "../../components/Scanner/ScannerWorkpanel/ScannerWorkpanel";
import ScannerResults from "../../components/Scanner/ScannerResults/ScannerResults";
import Disclaimer from "../../components/Scanner/Disclaimer/Disclaimer";

const Scanner = () => {
  const [scannerResults, setScannerResults] = useState(null);

  const scannerResultDisplay = (api_res) => setScannerResults(api_res);

  return (
    <div style={{ flex: 1 }}>
      <div>
        <div className="container-fluid">
          <PageHeader HeaderText="Scanner" Breadcrumb={[{ name: "Scanner" }]} />
        </div>

        <ScannerWorkPanel scannerResultDisplay={scannerResultDisplay} />
        <ScannerResults scannerResults={scannerResults} />
        <Disclaimer />
      </div>
    </div>
  );
};

export default Scanner;

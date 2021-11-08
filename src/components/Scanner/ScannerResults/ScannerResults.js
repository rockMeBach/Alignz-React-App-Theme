import React from "react";
import "./ScannerResults.scss";
import ScannerTable from "../ScannerTable/ScannerTable";

// Icons
import DownloadIcon from "../../../assets/images/download.svg";

const ScannerResults = ({ scannerResults }) => {
  return (
    <>
      {scannerResults && (
        <div className="scanner-result-component">
          <div className="scanner-result-heading my-3">
            <h6>Results</h6>

            <div className="download-historical-scanner-results">
              <img src={DownloadIcon} alt="" />
              <span className="scanner-extension-span">
                Download Historical Results
              </span>
            </div>
          </div>
          <table class="table table-striped scanner-results-tabel">
            <thead>
              <tr>
                <th scope="col">S.No.</th>
                <th scope="col">Instrument</th>
                <th scope="col">Exch</th>
                <th scope="col">Price</th>
                <th scope="col">Volume</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">lvalue</th>
                <th scope="col">rvalue</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(scannerResults).map(([key, value], i) => (
                <ScannerTable key={key} value={value} index={i} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ScannerResults;

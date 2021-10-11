import React from "react";
import "./ScannerResults.scss";

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
              </tr>
            </thead>
            <tbody>{Object.entries(scannerResults).map((e, i) => {})}</tbody>
          </table>
          {/* 
                                  <tr>
                                    <th scope="row">{i + 1}</th>
                                    <td>{e.ticker}</td>
                                    <td><strong>NSE</strong></td>
                                    <td>{e.close}</td>
                                    <td>{e.volume}</td>
                                    <td>{e.date}</td>
                                    <td>{e.time}</td>
                                </tr>

                       */}
        </div>
      )}
    </>
  );
};

export default ScannerResults;

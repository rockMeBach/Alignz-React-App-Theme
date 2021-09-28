import React from 'react'
import './ScannerResults.scss'

// Icons 
import DownloadIcon from '../../../assets/images/download.svg'

const ScannerResults = ({ scannerResults }) => {

    

    return (
        <>
            {scannerResults && scannerResults.length > 0 && (
                <div className="scanner-result-component">

                    <div className="scanner-result-heading my-3">
                        
                        <h6>Results</h6>
                        
                        <div className="download-historical-scanner-results">
                            <img src={DownloadIcon} alt='' />
                            <span className='scanner-extension-span'>Download Historical Results</span>
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
                            </tr>
                        </thead>

                        <tbody>

                            {scannerResults.map((e, i) => (

                                <tr>
                                    <th scope="row">{i + 1}</th>
                                    <td>{e.ticker}</td>
                                    <td><strong>NSE</strong></td>
                                    <td>{e.close}</td>
                                    <td>{e.volume}</td>
                                </tr>

                            ))}

                            {/* <tr>
                                <th scope="row">1</th>
                                <td>PNB</td>
                                <td><strong>BSE</strong></td>
                                <td>41.35</td>
                                <td>41.35</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>HDFCBANK</td>
                                <td><strong>NSE</strong></td>
                                <td>41.35</td>
                                <td>41.35</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>INFOS</td>
                                <td><strong>BSE</strong></td>
                                <td>67.63</td>
                                <td>67.63</td>
                            </tr>
                            <tr>
                                <th scope="row">4</th>
                                <td>GOLDBEES</td>
                                <td><strong>NSE</strong></td>
                                <td>89.46</td>
                                <td>89.46</td>
                            </tr> */}
                            
                        </tbody>
                    </table>
                    
                </div>
            )}
        </>
    )
}

export default ScannerResults

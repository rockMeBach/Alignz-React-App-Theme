import React, { useState, useEffect } from 'react'
import './ScannerConditions.scss'

const ScannerConditions = () => {

    const [scannerConditionOptions, setScannerConditionOptions] = useState(false);

    const scannerOptionDivChecker = () => {

        let scannerConditionOptionsDiv = document
                                            .getElementById('scanner-condition-indicators');
        
        if(scannerConditionOptionsDiv) {

            // console.log(scannerConditionOptionsDiv.childNodes)
            setScannerConditionOptions(
                scannerConditionOptionsDiv
                    .childNodes
                    .length > 1 ? true : false
            );
            
        }

    }

    const dropElement = e => {

        const id = e.dataTransfer.getData('text');
        let draggableElement = document.getElementById(id);
        const dropzone = document.getElementById('scanner-condition-indicators');
      
        if(draggableElement) {
            draggableElement = draggableElement.cloneNode(true);
            dropzone.appendChild(draggableElement);
            scannerOptionDivChecker();
            // console.log(draggableElement, dropzone)
            // draggableElement.style.display = 'flex';
            draggableElement.style.width = '4rem';
            draggableElement.style.textAlign = 'center';
            draggableElement.innerText = id;
            // draggableElement.setAttribute('onclick', `this.parentNode.remove();`);
        }

        e.dataTransfer.clearData();
    }

    useEffect(scannerOptionDivChecker, []);

    return (
        <div className="scanner-conditions">

            { scannerConditionOptions ? (
                <div className="scanner-conditions-options">
                    
                    <div className="scanner-conditions-option">
                        <h6>Candelstick timeframe</h6>
                        <select 
                            className="form-control scanner-condition-option" 
                            name="candelstick-timeframe" 
                            id="scanner-candelstick-timeframe"
                        >
                            <option value="1-min">1 min</option>
                        </select>
                    </div>

                    <div className="scanner-conditions-option">
                        <h6>Offset(1)/offset(2)</h6>
                        <select 
                            className="form-control scanner-condition-option" 
                            name="scanner-offset" 
                            id="scanner-offset"
                        >
                            <option value="latest-candel">Latest Candle</option>
                        </select>
                    </div>

                    <div className="scanner-conditions-option">
                        <h6>Segment 2</h6>
                        <select 
                            className="form-control scanner-condition-option" 
                            name="scanner-segment-2" 
                            id="scanner-segment-2"
                        >
                            <option value="latest-candel">Latest Candle</option>
                            <option value="latest-candel">Latest Candle2</option>
                        </select>
                    </div>
                    
                </div>
            ) : '' }

            <div 
                id="scanner-condition-indicators" 
                onDragOver={e => e.preventDefault()} 
                onDrop={dropElement}
            >
                
                { !scannerConditionOptions && (
                    <div className="scanner-indicator-drag-request">
                        Drag Something here !!
                    </div>
                )}
                
            </div>

        </div>
    )
}

export default ScannerConditions

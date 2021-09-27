import React, { useState, useEffect } from 'react'
import './ScannerConditions.scss'
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const ScannerConditions = () => {

    const [scannerConditionOptions, setScannerConditionOptions] = useState(false);

    const deleteOption = async () => {

        const removeAllChild = () => {
            let scannerDiv = document
                                .getElementById('scanner-condition-indicators');
            while(scannerDiv.firstChild)
                scannerDiv.removeChild(scannerDiv.firstChild);
        }
        
        await removeAllChild();
        
        setScannerConditionOptions(false);
    }

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
            draggableElement.style.margin = '1rem'
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
                            <option value="2-min">2 min</option>
                            <option value="3-min">3 min</option>
                            <option value="5-min">5 min</option>
                            <option value="10-min">10 min</option>
                            <option value="15-min">15 min</option>
                        </select>
                    </div>

                    <div className="scanner-conditions-option">
                        <h6>Offset(1)/offset(2)</h6>
                        <select 
                            className="form-control scanner-condition-option" 
                            name="scanner-offset" 
                            id="scanner-offset"
                        >
                            <option value="latest-candle">Latest Candle</option>
                            <option value="1-candle">1 Candle ago</option>
                            <option value="2-candle">2 Candle ago</option>
                            <option value="3-candle">3 Candle ago</option>
                            <option value="4-candle">4 Candle ago</option>
                            <option value="5-candle">5 Candle ago</option>
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
                        </select>
                    </div>

                    <DeleteOutlinedIcon className="delete-icon" onClick={deleteOption} />
                    
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

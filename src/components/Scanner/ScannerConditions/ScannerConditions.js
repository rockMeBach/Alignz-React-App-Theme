import React, { useState, useEffect } from 'react'
import './ScannerConditions.scss'
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import IndicatorModal from '../IndicatorModal/IndicatorModal';

const ScannerConditions = () => {

    const [scannerConditionOptions, setScannerConditionOptions] = useState(false);
    const [indicatorModalOpen, setIndicatorModalOpen] = useState(false);
    const [indicatorModalInput, setIndicatorModalInput] = useState({});
    // const [currSelectedIndicator, setCurrSelectedIndicaotr] = useState(null);

    const closeIndicatorModal = (indicatorSetting) => {

        indicatorModalInput.element.data = indicatorSetting;
        setIndicatorModalOpen(false);
    }

    const openIndicatorModal = draggableElement => {

        if(
            draggableElement.id === '>' 
            || draggableElement.id === '<' 
            || draggableElement.id === '+' 
            || draggableElement.id === '-' 
            || draggableElement.id === '*'
        )
            return;

        setIndicatorModalInput({
            indicatorName: draggableElement.id,
            element: draggableElement,
            settings: [
                {name: 'Length', value: 14},
                {name: 'Source', options: ['Open', 'High', 'Low', 'Close'], value: 'Open'}
            ]
        });
        
        setIndicatorModalOpen(true);
    }


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
            // draggableElement.style.width = '4rem';

            draggableElement.style.textAlign = 'center';
            draggableElement.style.margin = '1rem'
            draggableElement.innerText = id.toUpperCase();

            openIndicatorModal(draggableElement);

            // draggableElement.setAttribute('onclick', `this.parentNode.remove();`);
        }

        e.dataTransfer.clearData();
    }

    // useEffect(scannerOptionDivChecker, []);

    return (
        <div className="scanner-conditions">
            
            {/* <DeleteOutlinedIcon className="delete-icon" onClick={deleteOption} /> */}
            {indicatorModalOpen && 
                <IndicatorModal 
                    indicatorModalInput = { indicatorModalInput } 
                    closeIndicatorModal = { closeIndicatorModal }
                />
            }

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

export default ScannerConditions;



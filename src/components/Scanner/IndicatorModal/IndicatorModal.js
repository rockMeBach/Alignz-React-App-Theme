import React, { useEffect } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Divider,
} from "@chakra-ui/react";
import './IndicatorModal.scss'


const IndicatorModal = ({ indicatorModalInput, closeIndicatorModal }) => {

    const closeModal = () => {

        closeIndicatorModal();
        document.getElementById('staticBackdropLive').style.display = "none";
    }

    useEffect(() => {

        document.getElementById('staticBackdropLive').style.background = "rgba(0, 0, 0, 0.9)";
    }, []);

    return (

        <div class="modal fade show blur" id="staticBackdropLive" style={{display: "block"}} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLiveLabel" aria-modal="true" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content" style={{width: 'max-content', padding: "0.5rem 1.5rem"}}>
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">{ indicatorModalInput.indicatorName.toUpperCase() }</h5>
                </div>
                <div class="modal-body" style={{margin: '0'}}>

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

                        
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                </div>
                </div>
            </div>
        </div>

    )

}

export default IndicatorModal
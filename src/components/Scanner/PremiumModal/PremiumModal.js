import React, { useState, useEffect } from "react";
import "./PremiumModal.scss";
import { Row, Col, Button, Form } from "react-bootstrap";

const PremiumModal = ({closeModal}) => {

    const [premiums, setPremiums] = useState({
        closest: 0,
        min: 0,
        max: 0
    });

    useEffect(() => {
        document.getElementById("staticBackdropLive").style.background =
        "rgba(0, 0, 0, 0.9)";
    }, []);

  return (
    <div
      class="modal fade show blur"
      id="staticBackdropLive"
      style={{ display: "block" }}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLiveLabel"
      aria-modal="true"
      role="dialog"
    >
      <div class="modal-dialog">
        <div
          class="modal-content"
          style={{ width: "max-content", padding: "0.5rem 1.5rem" }}
        >
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Premiums</h5>
            </div>
            <div class="modal-body" style={{ margin: "0" }}>
                <div className="indicator-settings">

                    <div className="scanner-conditions-option">
                        <Row>
                            <div>
                                <Row style={{marginTop:"20px"}}>
                                    <Col>
                                        <label for="closest">Closest to</label>
                                        <input class="form-control premium-input" type="number" id="closest" onChange={(e)=>{
                                            if(!isNaN(e.target.value) && parseInt(e.target.value) >= 0){
                                                const tmp = premiums;
                                                tmp["closest"] = parseInt(e.target.value);
                                                setPremiums(tmp);
                                            }else{
                                                e.target.value = null;
                                            }
                                        }} />
                                    </Col>
                                    <Col>
                                        <label for="min">Min</label>
                                        <input class="form-control premium-input" type="number" id="min" onChange={(e)=>{
                                            if(!isNaN(e.target.value) && parseInt(e.target.value) >= 0){
                                                const tmp = premiums;
                                                tmp["min"] = parseInt(e.target.value);
                                                setPremiums(tmp);
                                            }else{
                                                e.target.value = null;
                                            }
                                        }} />
                                    </Col>
                                    <Col>
                                        <label for="max">Max</label>
                                        <input class="form-control premium-input" type="number" id="max" onChange={(e)=>{
                                            if(!isNaN(e.target.value) && parseInt(e.target.value) >= 0){
                                                const tmp = premiums;
                                                tmp["max"] = parseInt(e.target.value);
                                                setPremiums(tmp);
                                            }else{
                                                e.target.value = null;
                                            }
                                        }} />
                                    </Col>
                                </Row>
                            </div>
                        </Row>
                    </div>
                </div>
            </div>
            <hr/>
            <div style={{
                marginBottom:"10px",
                width:"100%",
                display:"flex",
                justifyContent:"end"
            }}>
                <Button onClick={()=>{closeModal(premiums)}}>Close</Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumModal;

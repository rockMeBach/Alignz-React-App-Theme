import React, { useState, useEffect } from "react";
import "./ATMModal.scss";
import { Row, Col, Button, Form } from "react-bootstrap";

const ATMModal = ({closeModal, getTypesSelected}) => {

    const [modalTypes, setModalTypes] = useState({
        "CE": {
            selected: false,
            sign: "+",
            number: 0
        },
        "PE": {
            selected: false,
            sign: "+",
            number: 0
        }
    });

    useEffect(() => {
        document.getElementById("staticBackdropLive").style.background =
        "rgba(0, 0, 0, 0.9)";

        //console.log(getTypesSelected())
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
                <h5 class="modal-title" id="staticBackdropLabel">ATM</h5>
            </div>
            <div class="modal-body" style={{ margin: "0" }}>
                <div className="indicator-settings">
                    <div className="scanner-conditions-option">
                        <Row>
                            <div>
                                {getTypesSelected().map((type)=>
                                    <Row style={{marginTop:"20px"}}>
                                        <Col sm={1}>
                                            <Form.Check onChange={(e)=>{
                                                const tmp = modalTypes
                                                tmp[type.key].selected = e.target.value==="on"
                                                setModalTypes(tmp)
                                            }} />
                                        </Col>
                                        <Col>
                                            <h4>{type.key}: ATM</h4>
                                        </Col>
                                        <Col>
                                            <Form.Select onChange={(e)=>{
                                                const tmp = modalTypes
                                                tmp[type.key].sign = e.target.value
                                                setModalTypes(tmp)
                                            }}>
                                                <option value="+">+</option>
                                                <option value="-">-</option>
                                            </Form.Select>
                                        </Col>
                                        <Col>
                                            <input class="form-control" type="number" name={"number"+type.key} onChange={(e)=>{
                                                const tmp = modalTypes
                                                tmp[type.key].number = parseInt(e.target.value)
                                                setModalTypes(tmp)
                                            }} />
                                        </Col>
                                    </Row>
                                )
                                }
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
                <Button onClick={()=>{closeModal(modalTypes)}}>Close</Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ATMModal;

import React, { useState, useEffect } from "react";
import "./LoadingModal.scss";
import loading from "./loading.gif";

const LoadingModal = () => {

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
            <h5 class="modal-title" id="staticBackdropLabel">
              Please wait
            </h5>
          </div>
          <div class="modal-body" style={{ margin: "0" }}>
            <div className="indicator-settings">

                  <div className="scanner-conditions-option">
                    <img src={loading} style={{width:"35px"}} />
                    <h6 style={{display:"inline", marginLeft:"15px"}}>Loading...</h6>            
                  </div>
               
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;

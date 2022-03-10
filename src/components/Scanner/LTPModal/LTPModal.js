import { number } from "prop-types";
import React, { useState, useEffect } from "react";
import "./LTPModal.scss";

const LTPModal = ({ ltpModalInput, closeLTPModal }) => {
  // const [indicatorSettings, setIndicatorSettings] = useState(
  //   indicatorModalInput.settings
  // );
  const [tmpValue, setTmpValue] = useState(10);
  // const [offsetCandleValue, setOffsetCandleValue] = useState("");
  // const [timeFrameValue, setTimeFrameValue] = useState("");
  // const [segmentValue, setSegmentValue] = useState("");
  // const [source, setSource] = useState("");

  const closeModal = () => {
    closeLTPModal({
      indicatorName: ltpModalInput.indicatorName,
      source: ltpModalInput.source,
    });
    document.getElementById("staticBackdropLive").style.display = "none";
  };

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
      onDoubleClick={e => e.preventDefault()}
    >
      <div class="modal-dialog">
        <div
          class="modal-content"
          style={{ width: "max-content", padding: "0.5rem 1.5rem" }}
        >
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              {ltpModalInput.indicatorName.toUpperCase()}
            </h5>
          </div>
          <div class="modal-body" style={{ margin: "0" }}>
            <div className="indicator-settings">

                  <div className="scanner-conditions-option">
                    <h6>Source</h6>
                        <select
                        className="form-control scanner-condition-option"
                        name="candelstick-timeframe"
                        id="scanner-candelstick-timeframe"
                        value={ltpModalInput.source}
                        onChange={(e)=>{
                            setTmpValue(e.target.value);
                            ltpModalInput.source = e.target.value;
                        }}
                        >
                          {ltpModalInput.options.map((option)=>
                            <option>{option}</option>
                          )}
                        </select>
                  </div>
               
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LTPModal;

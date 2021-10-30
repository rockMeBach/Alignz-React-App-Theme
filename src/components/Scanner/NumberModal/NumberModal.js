import { number } from "prop-types";
import React, { useState, useEffect } from "react";
import "./NumberModal.scss";

const NumberModal = ({ numberModalInput, closeNumberModal }) => {
  // const [indicatorSettings, setIndicatorSettings] = useState(
  //   indicatorModalInput.settings
  // );
  const [tmpValue, setTmpValue] = useState(10);
  // const [offsetCandleValue, setOffsetCandleValue] = useState("");
  // const [timeFrameValue, setTimeFrameValue] = useState("");
  // const [segmentValue, setSegmentValue] = useState("");
  // const [source, setSource] = useState("");

  const closeModal = () => {
    closeNumberModal({

      indicatorName: numberModalInput.indicatorName,
      value: numberModalInput.value
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
              {numberModalInput.indicatorName.toUpperCase()}
            </h5>
          </div>
          <div class="modal-body" style={{ margin: "0" }}>
            <div className="indicator-settings">

                  <div className="scanner-conditions-option">
                    <h6>Value</h6>
                      <input
                        className="form-control scanner-condition-option"
                        type="number"
                        name="indicator-setting-length"
                        value={numberModalInput.value}
                        onChange={(element) => {
                          // if (element.target.value < 1) return;

                          numberModalInput.value = element.target.value;
                          setTmpValue(element.target.value);
                        }}
                      />
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

export default NumberModal;

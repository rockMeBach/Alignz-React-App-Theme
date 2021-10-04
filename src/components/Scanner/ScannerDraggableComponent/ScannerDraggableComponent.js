import React, { useState, useEffect, Fragment } from "react";
import IndicatorModal from "../IndicatorModal/IndicatorModal";

const ScannerDraggableComponent = ({ id, modalInput, modalOpen }) => {
  const [indicatorModalOpen, setIndicatorModalOpen] = useState(false);
  const [indicatorModalInput, setIndicatorModalInput] = useState({});
  const [clickFlag, setClickFlag] = useState(true);

  const closeIndicatorModal = (indicatorSetting) => {
    let tmpSetting = indicatorModalInput;
    tmpSetting.settings = indicatorSetting.setting;
    indicatorModalInput.element.data = indicatorSetting;
    setIndicatorModalInput(tmpSetting);
    setIndicatorModalOpen(false);
  };

  const openIndicatorModal = (e) => {
    if (
      e.target.id === ">" ||
      e.target.id === "<" ||
      e.target.id === "+" ||
      e.target.id === "-" ||
      e.target.id === "*"
    )
      return;

    let tmpModalInput = modalInput;
    tmpModalInput.element = e.target
    // console.log(tmpModalInput)
    setIndicatorModalInput(tmpModalInput);

    setIndicatorModalOpen(true);
  };

  return (
    <>
      <div
        className="scanner-indicator-name"
        id={id}
        style={{
          textAlign: "center",
          margin: "1rem",
        }}
        onDoubleClick={(e) => openIndicatorModal(e)}
      >

        {indicatorModalOpen && (
          <IndicatorModal
            indicatorModalInput={indicatorModalInput}
            closeIndicatorModal={closeIndicatorModal}
          />
        )}
        
        {id.toUpperCase()}
      </div>
    </>
  );
};

export default ScannerDraggableComponent;

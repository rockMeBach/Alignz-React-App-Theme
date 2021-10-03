import React, { useState, useEffect } from "react";
import IndicatorModal from "../IndicatorModal/IndicatorModal";

const ScannerDraggableComponent = ({ id, modalInput }) => {
  const [indicatorModalOpen, setIndicatorModalOpen] = useState(false);
  const [indicatorModalInput, setIndicatorModalInput] = useState({});

  const closeIndicatorModal = (indicatorSetting) => {
    let tmpSetting = indicatorModalInput;
    tmpSetting.settings = indicatorSetting.setting;
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
    setIndicatorModalInput(modalInput);

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

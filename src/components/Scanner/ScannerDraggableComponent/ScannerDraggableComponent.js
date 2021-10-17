import React, { useState, useEffect, Fragment } from "react";
import IndicatorModal from "../IndicatorModal/IndicatorModal";

const ScannerDraggableComponent = ({ id, index }) => {

  const [indicatorModalOpen, setIndicatorModalOpen] = useState(false);
  const [indicatorModalInput, setIndicatorModalInput] = useState({});

  const closeIndicatorModal = (indicatorSetting) => {
    let tmpSetting = indicatorModalInput;
    tmpSetting.settings = indicatorSetting.setting;
    indicatorModalInput.element.data = indicatorSetting;
    setIndicatorModalInput(tmpSetting);
    setIndicatorModalOpen(false);
  };
  
  const openIndicatorModal = (e) => {
      
    // console.log("Hi", e)
    let classNames = e.className.split(' ');

    if(classNames.length <= 1 || classNames[1] !== 'scanner-draggable-component-name')
      return;
      
    if (
      e.id === ">" ||
      e.id === "<" ||
      e.id === "+" ||
      e.id === "-" ||
      e.id === "*"
    )
      return;

    if(e.data) {

      setIndicatorModalInput({
        indicatorName: e.id,
        element: e,
        settings: e.data.setting
      });
    } else {
      
      setIndicatorModalInput({
        indicatorName: e.id,
        element: e,
        settings: [
          { name: "Length", value: 14 },
          {
            name: "Source",
            options: ["Open", "High", "Low", "Close"],
            value: "Open",
          },
        ],
      });
    }

    // console.log(indicatorModalInput)

    setIndicatorModalOpen(true);
  };

  useEffect(() => {

    let e = document.getElementsByClassName('scanner-draggable-component-name')[index];
    console.log(e);
    openIndicatorModal(e);
  }, []);

  return (
    <>
      <div
        className="scanner-indicator-name scanner-draggable-component-name"
        id={id}
        style={{
          textAlign: "center",
          margin: "1rem",
        }}
        onDoubleClick={(e) => openIndicatorModal(e.target)}
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
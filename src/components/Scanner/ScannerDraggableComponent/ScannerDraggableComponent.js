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
    let classNames = e.className.split(" ");
    if (
      classNames.length <= 1 ||
      classNames[1] !== "scanner-draggable-component-name"
    )
      return;
    if (
      e.id === ">" ||
      e.id === "<" ||
      e.id === "+" ||
      e.id === "-" ||
      e.id === "*" ||
      e.id === "cfab" ||
      e.id === "cfba" ||
      e.id === "/" ||
      e.id === "<=" ||
      e.id === ">=" ||
      e.id === "or" ||
      e.id === "and" ||
      e.id === "substract"
    )
      return;
    if (e.data) {
      setIndicatorModalInput({
        indicatorName: e.id,
        element: e,
        settings: e.data.setting,
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
    setIndicatorModalOpen(true);
  };
  useEffect(() => {
    let e = document.getElementsByClassName("scanner-draggable-component-name")[
      index
    ];
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

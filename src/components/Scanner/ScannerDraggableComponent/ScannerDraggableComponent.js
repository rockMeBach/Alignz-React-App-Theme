import React, { useState, useEffect } from "react";
import IndicatorModal from "../IndicatorModal/IndicatorModal";
import NumberModal from "../NumberModal/NumberModal";
import CrossIcon from "../../../assets/icons/cross-icon.svg";
import "./ScannerDraggableComponent.scss";

const ScannerDraggableComponent = ({
  id,
  indicatorLength,
  i,
  j,
  deleteComponent,
}) => {
  const [indicatorModalOpen, setIndicatorModalOpen] = useState(false);
  const [indicatorModalInput, setIndicatorModalInput] = useState({});
  const [numberModalInput, setNumberModalInput] = useState({});
  const [numberModalOpen, setNumberModalOpen] = useState(false);

  const closeIndicatorModal = (indicatorSetting) => {
    let tmpSetting = indicatorModalInput;
    tmpSetting.settings = indicatorSetting.setting;
    indicatorModalInput.element.data = indicatorSetting;
    // console.log(indicatorSetting)
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

    if (e.id === "number") {
      if (e.data) {

        setNumberModalInput({
          indicatorName: e.id,
          element: e,
          value: e.data.value,
        });
      } else {

        setNumberModalInput({
          indicatorName: e.id,
          element: e,
          value: 0,
        });
      }

      setNumberModalOpen(true);
      return;
    }

    if (e.data) {

      setIndicatorModalInput({
        indicatorName: e.id,
        element: e,
        settings: e.data.setting,
        timeframe: e.data.timeframe
      });
    } else {

      setIndicatorModalInput({
        indicatorName: e.id,
        element: e,
        timeframe: '1-min',
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

  const closeNumberModal = (numberSettings) => {
    numberModalInput.element.data = numberSettings;
    setNumberModalOpen(false);
  };

  const deleteDraggableComponent = (e) => {
    // console.log(e.target.parentNode.remove())
    deleteComponent(i, j);
  };

  useEffect(() => {

    let e = Array.from(
      document.getElementsByClassName("scanner-draggable-component-name")
    )[indicatorLength - 1];

    openIndicatorModal(e);
  }, []);

  return (
    <>
      <div
        className="scanner-indicator-name scanner-draggable-component-name"
        id={id}
        style={{
          // textAlign: "center",
          margin: "1rem",
        }}
        onDoubleClick={(e) => openIndicatorModal(e.target)}
      >
        <img
          src={CrossIcon}
          alt=""
          className="cross-icon"
          onClick={deleteDraggableComponent}
          style={{ top: "-70%", left: "-1.4rem" }}
        />

        {indicatorModalOpen && (
          <IndicatorModal
            indicatorModalInput={indicatorModalInput}
            closeIndicatorModal={closeIndicatorModal}
          />
        )}

        {numberModalOpen && (
          <NumberModal
            numberModalInput={numberModalInput}
            closeNumberModal={closeNumberModal}
          />
        )}

        {id === "number" &&
        Array.from(
          document.getElementsByClassName("scanner-draggable-component-name")
        ) &&
        Array.from(
          document.getElementsByClassName("scanner-draggable-component-name")
        )[indicatorLength - 1] &&
        Array.from(
          document.getElementsByClassName("scanner-draggable-component-name")
        )[indicatorLength - 1].data
          ? Array.from(
              document.getElementsByClassName(
                "scanner-draggable-component-name"
              )
            )[indicatorLength - 1].data.value
          : id.toUpperCase()}
      </div>
    </>
  );
};

export default ScannerDraggableComponent;

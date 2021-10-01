import React, { useState, useEffect } from "react";
import "./ScannerConditions.scss";
import ScannerDraggableComponent from "../ScannerDraggableComponent/ScannerDraggableComponent";
import IndicatorModal from "../IndicatorModal/IndicatorModal";
let arr = [];
const ScannerConditions = () => {
  const [scannerConditionOptions, setScannerConditionOptions] = useState(false);
  const [indicatorModalOpen, setIndicatorModalOpen] = useState(false);
  const [indicatorModalInput, setIndicatorModalInput] = useState({});
  const [currSelectedIndicator, setCurrSelectedIndicator] = useState([]);

  const closeIndicatorModal = (indicatorSetting) => {
    indicatorModalInput.element.data = indicatorSetting;
    setIndicatorModalOpen(false);
  };

  const openIndicatorModal = (draggableElement) => {
    if (
      draggableElement.id === ">" ||
      draggableElement.id === "<" ||
      draggableElement.id === "+" ||
      draggableElement.id === "-" ||
      draggableElement.id === "*"
    )
      return;

    setIndicatorModalInput({
      indicatorName: draggableElement.id,
      element: draggableElement,
      settings: [
        { name: "Length", value: 14 },
        {
          name: "Source",
          options: ["Open", "High", "Low", "Close"],
          value: "Open",
        },
      ],
    });

    setIndicatorModalOpen(true);
  };

  //   const deleteOption = async () => {
  //     const removeAllChild = () => {
  //       let scannerDiv = document.getElementById("scanner-condition-indicators");
  //       while (scannerDiv.firstChild)
  //         scannerDiv.removeChild(scannerDiv.firstChild);
  //     };

  //     await removeAllChild();

  //     setScannerConditionOptions(false);
  //   };

  const dropElement = (e) => {
    const id = e.dataTransfer.getData("text");
    let draggableElement = document.getElementById(id);
    if (draggableElement) {
      arr.push(draggableElement);
      setCurrSelectedIndicator(arr);
      setScannerConditionOptions(arr.length > 0 ? true : false);
      openIndicatorModal(draggableElement);
      draggableElement.setAttribute("onclick", `this.parentNode.remove();`);
    }
    e.dataTransfer.clearData();
  };


  return (
    <div className="scanner-conditions">
      {/* <DeleteOutlinedIcon className="delete-icon" onClick={deleteOption} /> */}
      {indicatorModalOpen && (
        <IndicatorModal
          indicatorModalInput={indicatorModalInput}
          closeIndicatorModal={closeIndicatorModal}
        />
      )}

      <div
        id="scanner-condition-indicators"
        onDragOver={(e) => e.preventDefault()}
        onDrop={dropElement}
      >
        {!scannerConditionOptions && (
          <div className="scanner-indicator-drag-request">
            Drag Something here !!
          </div>
        )}
        {currSelectedIndicator.map((e) => (
          <ScannerDraggableComponent id={e.id} draggableElement={e} />
        ))}
      </div>
    </div>
  );
};

export default ScannerConditions;

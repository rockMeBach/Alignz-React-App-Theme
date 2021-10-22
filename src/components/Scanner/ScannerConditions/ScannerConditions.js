import React, { useState } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import "./ScannerConditions.scss";
import ScannerDraggableComponent from "../ScannerDraggableComponent/ScannerDraggableComponent";

const ScannerConditions = () => {
  const [scannerConditionOptions, setScannerConditionOptions] = useState(false);
  const [currSelectedIndicator, setCurrSelectedIndicator] = useState([]);
  const deleteElement = (index) => {
    let arr = currSelectedIndicator;
    arr.splice(index, 1);
    setCurrSelectedIndicator([...arr]);
    if (arr.length === 0) setScannerConditionOptions(false);
  };
  const dropElement = (e) => {
    let arr = currSelectedIndicator;

    const id = e.dataTransfer.getData("text");
    if (id) {
      arr.push(id);
      setCurrSelectedIndicator([...arr]);
      setScannerConditionOptions(true);
    }
    e.dataTransfer.clearData();
  };

  return (
    <div className="scanner-conditions">
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

        {currSelectedIndicator.map((e, index) => (
          <div>
            <span onClick={() => deleteElement(index)}>
              <DeleteOutlinedIcon className="delete-icon" />
            </span>
            <ScannerDraggableComponent id={e} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScannerConditions;

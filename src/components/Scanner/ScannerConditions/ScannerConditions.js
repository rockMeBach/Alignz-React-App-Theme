import React, { useState } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import "./ScannerConditions.scss";
import ScannerDraggableComponent from "../ScannerDraggableComponent/ScannerDraggableComponent";
import IndicatorModal from "../IndicatorModal/IndicatorModal";

var arr = [];
const ScannerConditions = () => {
  const [scannerConditionOptions, setScannerConditionOptions] = useState(false);
  const [indicatorModalOpen, setIndicatorModalOpen] = useState(false);
  const [indicatorModalInput, setIndicatorModalInput] = useState({});
  const [currSelectedIndicator, setCurrSelectedIndicator] = useState([]);

  const closeIndicatorModal = (indicatorSetting) => {
    let tmpSetting = indicatorModalInput;
    tmpSetting.settings = indicatorSetting.setting;
    console.log(tmpSetting);
    setIndicatorModalInput(tmpSetting);
    setIndicatorModalOpen(false);
  };

  const deleteElement = (index) => {
    arr.splice(index, 1);
    setCurrSelectedIndicator([...arr]);
    if (arr.length === 0) {
      setScannerConditionOptions(false);
    }
  };

  const openIndicatorModal = (id) => {
    if (id === ">" || id === "<" || id === "+" || id === "-" || id === "*")
      return;

    setIndicatorModalInput({
      indicatorName: id,
      element: id,
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

  const dropElement = (e) => {
    const id = e.dataTransfer.getData("text");
    if (id) {
      arr.push(id);
      setCurrSelectedIndicator([...arr]);
      setScannerConditionOptions(true);
      openIndicatorModal(id);
    }

    e.dataTransfer.clearData();
  };

  return (
    <div className="scanner-conditions">
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

        {currSelectedIndicator.map((e, index) => (
          <div>
            <span onClick={() => deleteElement(index)}>
              <DeleteOutlinedIcon className="delete-icon" />
            </span>
            <ScannerDraggableComponent
              id={e}
              modalInput={indicatorModalInput}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScannerConditions;

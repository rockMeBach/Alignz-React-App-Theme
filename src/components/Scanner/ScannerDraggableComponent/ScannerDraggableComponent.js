import React, { useState } from "react";
import IndicatorModal from "../IndicatorModal/IndicatorModal";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
const ScannerDraggableComponent = ({ id, draggableElement }) => {
  const [indicatorModalOpen, setIndicatorModalOpen] = useState(false);
  const [indicatorModalInput, setIndicatorModalInput] = useState({});
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
  return (
    <>
      <DeleteOutlinedIcon className="delete-icon" />
      <div
        className="scanner-indicator-name"
        id={id}
        style={{
          textAlign: "center",
          margin: "1rem",
        }}
        onDoubleClick={() => openIndicatorModal(draggableElement)}
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

import React from "react";
import ScannerDraggableComponent from "../ScannerDraggableComponent/ScannerDraggableComponent";
const CurrentExpression = ({ currExpression, i }) => {
  return (
    <>
      <div style={{ display: "flex" }}>
        {currExpression.map((e, j) => (
          <>
            {/* <span onClick={() => deleteElement(index)}>
            <DeleteOutlinedIcon className="delete-icon" />
          </span> */}
            <ScannerDraggableComponent id={e} j={j} i={i} />
          </>
        ))}
      </div>
    </>
  );
};
export default CurrentExpression;

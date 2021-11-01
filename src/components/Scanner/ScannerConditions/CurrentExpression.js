import React from "react";
import ScannerDraggableComponent from "../ScannerDraggableComponent/ScannerDraggableComponent";
const CurrentExpression = ({ currExpression, indicatorLength, deleteComponent, i}) => {
  return (
    <>
      <div style={{ display: "flex" }}>
        {currExpression.map((e, j) => (
          <>
            {/* <span onClick={() => deleteElement(index)}>
            <DeleteOutlinedIcon className="delete-icon" />
          </span> */}
            <ScannerDraggableComponent 
              id={e} 
              indicatorLength={indicatorLength} 
              i={i} 
              j={j} 
              deleteComponent={deleteComponent}  
            />
          </>
        ))}
      </div>
    </>
  );
};
export default CurrentExpression;

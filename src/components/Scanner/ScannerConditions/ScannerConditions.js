import React, { useState, useEffect } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import "./ScannerConditions.scss";
import ScannerDraggableComponent from "../ScannerDraggableComponent/ScannerDraggableComponent";
import CurrentExpression from "./CurrentExpression";
import { useDispatch, useSelector } from "react-redux";
import { dispatchScanner } from "../../../actions/scannerAction";

const ScannerConditions = () => {

  const dispatch = useDispatch();
  const [scannerConditionOptions, setScannerConditionOptions] = useState(false);
  const [currSelectedIndicator, setCurrSelectedIndicator] = useState([]);
  const [multipleScannerIndicators, setMultipleScannerIndicators] = useState(
    []
  );
  const scannerReducer = useSelector((state) => state.scannerReducer);

  const deleteElement = (index) => {
    let arr = currSelectedIndicator;
    arr.splice(index, 1);
    setCurrSelectedIndicator([...arr]);
    if (arr.length === 0) setScannerConditionOptions(false);
  };

  const dropElement = (e) => {
    let arr = currSelectedIndicator;
    let _2dArray = multipleScannerIndicators;

    const id = e.dataTransfer.getData("text");
    if (id) {
      if (id === "or" || id === "and" || id === "substract") {
        _2dArray.push([id]);
        _2dArray.push([]);
      } else {
        let lastIndex = _2dArray.length;
        if (lastIndex === 0) {
          // console.log("Hello", typeof _2dArray[lastIndex - 1])
          _2dArray.push([id]);
        } else {
          _2dArray[lastIndex - 1].push(id);
        }
      }

      setMultipleScannerIndicators(_2dArray);
      dispatch(dispatchScanner());
      arr.push(id);
      setCurrSelectedIndicator([...arr]);
      setScannerConditionOptions(true);
    }
    e.dataTransfer.clearData();
  };

  useEffect(() => {
    console.log("Hello", multipleScannerIndicators);
    console.log(scannerReducer);
  }, [multipleScannerIndicators]);

  return (
    <div className="scanner-conditions">
      <div
        id="scanner-condition-indicators"
        style={{ display: "flex", flexDirection: "column" }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={dropElement}
      >
        {multipleScannerIndicators.map((currExpression, index) => (
          <>
            <CurrentExpression currExpression={currExpression} i={index} />
          </>
        ))}

        {!scannerConditionOptions && (
          <div className="scanner-indicator-drag-request">
            Drag Something here !!
          </div>
        )}

        {/* {currSelectedIndicator.map((e, index) => (
          <div>
            <span onClick={() => deleteElement(index)}>
              <DeleteOutlinedIcon className="delete-icon" />
            </span>
            <ScannerDraggableComponent id={e} index={index} />
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default ScannerConditions;

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
  const [indicatorLength, setIndicatorLength] = useState(0);
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
      setIndicatorLength(indicatorLength + 1);
      dispatch(dispatchScanner());
      arr.push(id);
      setCurrSelectedIndicator([...arr]);
      setScannerConditionOptions(true);
    }
    e.dataTransfer.clearData();
  };

  const deleteComponent = (i, j) => {

    let tmpState = multipleScannerIndicators;
    console.log(tmpState, i, j);

    tmpState[i].splice(j, 1);

    if(tmpState[i].length === 0)
      tmpState.splice(i, 1);

      setMultipleScannerIndicators(tmpState)
      setIndicatorLength(indicatorLength > 0 ? indicatorLength - 1 : 0);
    if(tmpState.length === 0)
      setScannerConditionOptions(false);
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
            <CurrentExpression 
              currExpression={currExpression} 
              indicatorLength={indicatorLength} 
              i={index} 
              deleteComponent={deleteComponent}  
            />
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

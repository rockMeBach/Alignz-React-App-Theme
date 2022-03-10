import React, {useRef, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import "./ScannerConditions.scss";
import ScannerDraggableComponent from "../ScannerDraggableComponent/ScannerDraggableComponent";
import CurrentExpression from "./CurrentExpression";
import { useDispatch, useSelector } from "react-redux";
import { dispatchScanner } from "../../../actions/scannerAction";
import { DragContext } from "../../../contexts/DragContexts";

const ScannerConditions = () => {

  const enableCrossIcons = () => {
    Array.from(document.getElementsByClassName("cross-icon")).forEach(element => {
      element.style.pointerEvents="all";
    });
  }

  const dispatch = useDispatch();
  const [scannerConditionOptions, setScannerConditionOptions] = useState(false);
  const [currSelectedIndicator, setCurrSelectedIndicator] = useState([]);
  const [indicatorLength, setIndicatorLength] = useState(0);
  const [operatorsArray, setOperatorsArray] = useState([">","<","+","-","*","cfab","cfba","/","<=",">=","or","and","substract"]);

  const scannerReducer = useSelector((state) => state.scannerReducer);

  const {curElemId} = useContext(DragContext);
  const {setCurElemId} = useContext(DragContext);
  const {scannerSettArr} = useContext(DragContext);
  const {setScannerSettArr} = useContext(DragContext);

  let currScanner = useLocation();

  const addElement = (e, dblClicked) => {
    window.localStorage.removeItem("itemRemoved");

    let arr = currSelectedIndicator;
    let _2dSettingsArray = scannerSettArr;
    let jPos = window.localStorage.getItem("j-pos");
    let iPos = window.localStorage.getItem("i-pos");
    let curSett = window.localStorage.getItem("curSett")!="null"?Array.from(JSON.parse(window.localStorage.getItem("curSett"))):[];

    const id = !dblClicked?e.dataTransfer.getData("text"):e;

    let numberSettings = {
      indicatorName: id,
      element: id,
      value: 0,
    };

    let ltpSettings = {
      indicatorName: id,
      element: id,
      source: "Close",
      options: ["Open", "High", "Low", "Close"],
    }

    let indicatorSettings = {
      indicatorName: id,
      element: id,
      timeframe: "1-min",
      offset: "latest-candle",
      offset2: "all-candles",
      settings: [
        { name: "Length", value: 14 },
        {
          name: "Source",
          options: ["Open", "High", "Low", "Close", "SAR", "SMA", "WMA"],
          value: "Close",
        },
        ...curSett
      ],
    };

    if (id) {
      if (id === "or" || id === "and" || id === "substract") {
        _2dSettingsArray.push([{indicatorName:id}]);
        window.localStorage.setItem("j-pos", 0);
        window.localStorage.setItem("i-pos", _2dSettingsArray.length-1);
      } else {
        let lastIndex = _2dSettingsArray.length;
        if (lastIndex === 0) {
          // console.log("Hello", typeof _2dArray[lastIndex - 1])
          if(id==="number"){
            _2dSettingsArray.push([numberSettings]);
          }else if(id==="ltp"){
            _2dSettingsArray.push([ltpSettings]);
          }else if(operatorsArray.indexOf(id)!==-1){
            _2dSettingsArray.push([{indicatorName:id}]);
          }else{
            _2dSettingsArray.push([indicatorSettings]);
          }

          window.localStorage.setItem("i-pos", 0);
        } else {
          //to drop a component in the middle
          if(iPos!=null){
            let iPosFirst = _2dSettingsArray[iPos][0];
            if(iPosFirst.indicatorName == "or" || iPosFirst.indicatorName == "and" || iPosFirst.indicatorName == "substract"){

              if(id==="number"){
                _2dSettingsArray.push([numberSettings]);
              }else if(id==="ltp"){
                _2dSettingsArray.push([ltpSettings]);
              }else if(operatorsArray.indexOf(id)!==-1){
                _2dSettingsArray.push([{indicatorName:id}]);
              }else{
                _2dSettingsArray.push([indicatorSettings]);
              }

              window.localStorage.setItem("i-pos", _2dSettingsArray.length-1);
            }else{
              if(jPos!=null){
                try{

                  if(id==="number"){
                    _2dSettingsArray[iPos].splice(jPos, 0, numberSettings);
                  }else if(id==="ltp"){
                    _2dSettingsArray[iPos].splice(jPos, 0, ltpSettings);
                  }else if(operatorsArray.indexOf(id)!==-1){
                    _2dSettingsArray[iPos].splice(jPos, 0, {indicatorName:id});
                  }else{
                    _2dSettingsArray[iPos].splice(jPos, 0, indicatorSettings);
                  }
                }catch(err){
                  console.log(err);
                }
              }else{

                if(id==="number"){
                  _2dSettingsArray[iPos].push(numberSettings);
                }else if(id==="ltp"){
                  _2dSettingsArray[iPos].push(ltpSettings);
                }else if(operatorsArray.indexOf(id)!==-1){
                  _2dSettingsArray[iPos].push({indicatorName:id});
                }else{
                  _2dSettingsArray[iPos].push(indicatorSettings);
                }
              }
            }
          }
        }
      }

      setScannerSettArr(_2dSettingsArray);
      setIndicatorLength(indicatorLength + 1)
      dispatch(dispatchScanner());
      arr.push(id);
      setCurrSelectedIndicator([...arr]);
      setScannerConditionOptions(true);
    }
    if(!dblClicked) e.dataTransfer.clearData();
    enableCrossIcons();
  };

  const deleteComponent = (i, j) => {
    let tmpStateSettings = scannerSettArr;

    tmpStateSettings[i].splice(j, 1);

    if(tmpStateSettings[i].length === 0)
      tmpStateSettings.splice(i, 1);

    setScannerSettArr(tmpStateSettings);
    setIndicatorLength(indicatorLength > 0 ? indicatorLength - 1 : 0);
  
    if(tmpStateSettings.length === 0)
      setScannerConditionOptions(false);
  };

  useEffect(()=>{
    if(currScanner.state!==null && currScanner.state!==undefined){
      const state = currScanner.state;
      let arrLength = 0;
      setScannerSettArr(state.expression);
      setScannerConditionOptions(true);
      
      state.expression.forEach((e)=>{
        e.forEach(()=>{
          arrLength++;
        })
      });

      setIndicatorLength(arrLength);
    }
  }, []);

  useEffect(()=>{
    addElement(curElemId, true);
    setCurElemId("");
  }, [curElemId]);

  return (
    <div className="scanner-conditions">
      <div
        id="scanner-condition-indicators"
        className="scanner-condition-indicators-class"
        style={{ display: "flex", flexDirection: "column" }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e)=>addElement(e, false)}
      >
        {scannerSettArr.map((currExpression, index) => (
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
            Drag something here!
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

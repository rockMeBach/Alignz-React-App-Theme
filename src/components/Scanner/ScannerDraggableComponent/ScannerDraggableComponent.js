import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import IndicatorModal from "../IndicatorModal/IndicatorModal";
import NumberModal from "../NumberModal/NumberModal";
import CrossIcon from "../../../assets/icons/cross-icon.svg";
import "./ScannerDraggableComponent.scss";
import { DragContext } from "../../../contexts/DragContexts";
import LTPModal from "../LTPModal/LTPModal";

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
  const [ltpModalOpen, setLTPModalOpen] = useState(false);
  const [ltpModalInput, setLTPModalInput] = useState({});
  const {scannerSettArr} = useContext(DragContext);
  const {setScannerSettArr} = useContext(DragContext);
  const {allIndicators} = useContext(DragContext);
  const [allIndicatorsStrings, setAllIndicatorsStrings] = useState([]);

  let currScanner = useLocation();

  const openIndicatorModal = (eSettings) => {
    if (
      eSettings.indicatorName === ">" ||
      eSettings.indicatorName === "<" ||
      eSettings.indicatorName === "+" ||
      eSettings.indicatorName === "-" ||
      eSettings.indicatorName === "*" ||
      eSettings.indicatorName === "cfab" ||
      eSettings.indicatorName === "cfba" ||
      eSettings.indicatorName === "/" ||
      eSettings.indicatorName === "<=" ||
      eSettings.indicatorName === ">=" ||
      eSettings.indicatorName === "or" ||
      eSettings.indicatorName === "and" ||
      eSettings.indicatorName === "substract"
    )
      return;

    if(eSettings.indicatorName=="number"){
      setNumberModalInput(eSettings);
      setNumberModalOpen(true);
    }else if(eSettings.indicatorName=="ltp"){
      setLTPModalInput(eSettings);
      setLTPModalOpen(true);
    }else{
      eSettings.settings[1].options = eSettings.settings[1].options.concat(allIndicatorsStrings)
      setIndicatorModalInput(eSettings);
      setIndicatorModalOpen(true);
    }
  };

  const closeIndicatorModal = (indicatorSetting) => {
    setIndicatorModalOpen(false);
  };

  const closeNumberModal = (numberSettings) => {
    setNumberModalOpen(false);
  };

  const closeLTPModal = (ltpSettings) => {
    setLTPModalOpen(false);
  };

  const showFullFunction = (main, subindicators) => {
    let fullString = main+"()";

    subindicators.forEach((indicator, index)=>{
      if(index!==subindicators.length-1){
        fullString = fullString.replace("()", "("+indicator.indicatorName+"()"+")");
      }else{
        fullString = fullString.replace("()", "("+indicator.indicatorName+")");
      }
    })

    return fullString.toUpperCase();
  }

  useEffect(() => {
    let tmp = allIndicatorsStrings;
    allIndicators.forEach((indicator)=>{
      tmp.push(indicator.id);
    })
    setAllIndicatorsStrings(tmp);

    try{
      if(window.localStorage.getItem("scannerLoaded") === null){

        let jPos = window.localStorage.getItem("j-pos");
        let iPos = window.localStorage.getItem("i-pos");
        let dblclicked = window.localStorage.getItem("dblclicked");

        let e = document.querySelector(".scanner-condition-indicators-class").childNodes;
        let eSettings = scannerSettArr[iPos][jPos]!==undefined?scannerSettArr[iPos][jPos]:scannerSettArr[iPos][j];

        if(dblclicked==null){
          if(iPos!=null){
            if(jPos!=null){
              e = e[iPos].childNodes[jPos];
              window.localStorage.removeItem("j-pos");
            }else{
              e = e[iPos].childNodes[e[iPos].childNodes.length-1];
            }
          }
        }else{
          e = Array.from(
            document.getElementsByClassName("scanner-draggable-component-name")
          );
          e = e[e.length-1];
          window.localStorage.removeItem("dblclicked");
        }

        openIndicatorModal(eSettings);
      }
    }catch(err){
      console.log(err)
    }
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
        onDoubleClick={() => {
          if(!indicatorModalOpen && !numberModalOpen) {
            openIndicatorModal(scannerSettArr[i][j])
          }
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          window.localStorage.setItem("j-pos", e.target.getAttribute("data-index-j"));
        }}
        onDragLeave={(e)=>{
          e.preventDefault();
          window.localStorage.removeItem("j-pos");
        }}
        data-index-i={i}
        data-index-j={j}
      >
        <img
          src={CrossIcon}
          alt=""
          className="cross-icon"
          onClick={()=>{deleteComponent(i,j)}}
          style={{ top: "-70%", left: "-0.4rem" }}
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

        {ltpModalOpen && (
          <LTPModal
            ltpModalInput={ltpModalInput}
            closeLTPModal={closeLTPModal}
          />
        )}

        {scannerSettArr[i][j].indicatorName==="number" ? 
          scannerSettArr[i][j].value
          : 
          (scannerSettArr[i][j].subindicators!==undefined && scannerSettArr[i][j].subindicators.length!==0)?
          showFullFunction(scannerSettArr[i][j].indicatorName, scannerSettArr[i][j].subindicators)
          :
          scannerSettArr[i][j].indicatorName.toUpperCase()
        }
        
      </div>
    </>
  );
};

export default ScannerDraggableComponent;

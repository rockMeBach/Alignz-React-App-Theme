import React, { useState, useContext, useEffect } from "react"; 
import "./IndicatorModal.scss";
import { DragContext } from "../../../contexts/DragContexts";

const IndicatorModal = ({ indicatorModalInput, closeIndicatorModal }) => {
  // const [indicatorSettings, setIndicatorSettings] = useState(
  //   indicatorModalInput.settings
  // );
  const [tmpValue, setTmpValue] = useState(14);
  const [tmpSourceValue, setTmpSourceValue] = useState('Open');
  const [tmpTimeframeValue, setTmpTimeframeValue] = useState(indicatorModalInput.timeframe);
  const [offsetCandleValue, setOffsetCandleValue] = useState(indicatorModalInput.offset);
  const [offset2CandleValue, setOffset2CandleValue] = useState(indicatorModalInput.offset2);
  const [timeFrameValue, setTimeFrameValue] = useState("");
  const [source, setSource] = useState("");
  const [sourceIndicators, setSourceIndicators] = useState([indicatorModalInput]);
  const [selectedIndicator, setSelectedIndicator] = useState(0);
  const {scannerSettArr} = useContext(DragContext);
  const {allIndicators} = useContext(DragContext);
  const [allIndicatorsStrings, setAllIndicatorsStrings] = useState([]);
  const numberRegEx = /^\d+$/;

  const closeModal = () => {
    //avoid circular structure
    indicatorModalInput.subindicators = sourceIndicators.filter((indicator)=>{
      return !indicator.hasOwnProperty("subindicators");
    });
    closeIndicatorModal({
      indicatorName: indicatorModalInput.indicatorName,
      timeframe: document.getElementById("scanner-candelstick-timeframe").value,
      offset: document.getElementById("scanner-offset").value,
      settings: indicatorModalInput.settings,
    });
    document.getElementById("staticBackdropLive").style.display = "none";
  };

  const addSourceIndicator = (newIndicator) => {
    let tempArr = sourceIndicators;
    tempArr.push(newIndicator);
    setSourceIndicators(tempArr);
  }

  const updateSourceIndicator = (newIndicator, place) => {
    //let tempArr = sourceIndicators;
    //tempArr[place] = newIndicator;
    removeSourceIndicator(place);
    addSourceIndicator(newIndicator);
  }

  const removeSourceIndicator = (place) => {
    let tempArr = sourceIndicators;
    tempArr.splice(place, tempArr.length-place);
    setSourceIndicators(tempArr);
  }

  useEffect(() => {
    let tmp = allIndicatorsStrings;
    allIndicators.forEach((indicator)=>{
      tmp.push(indicator.id);
    })
    setAllIndicatorsStrings(tmp);

    document.getElementById("staticBackdropLive").style.background = "rgba(0, 0, 0, 0.9)";
    //set sourceIndicators to subindicators if subindicators is not null or does exist
    if(indicatorModalInput.subindicators!==undefined && indicatorModalInput.subindicators.length>0){
      //avoid circular structure
      const currIndicatorArr = [indicatorModalInput];
      setSourceIndicators(currIndicatorArr.concat(indicatorModalInput.subindicators));
    }
    indicatorModalInput.subindicators = sourceIndicators.filter((indicator)=>{
      return !indicator.hasOwnProperty("subindicators");
    });
  }, []);

  return (
    <div
      class="modal fade show blur"
      id="staticBackdropLive"
      style={{ display: "block" }}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLiveLabel"
      aria-modal="true"
      role="dialog"
      onDoubleClick={e => e.preventDefault()}
    >
      <div class="modal-dialog">
        <div
          class="modal-content"
          style={{ width: "max-content", padding: "0.5rem 1.5rem" }}
        >
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              {sourceIndicators.map((indicator, index)=>
                <span>
                  <a className="indicator-modal-indicators" onClick={(e)=>{
                    setSelectedIndicator(parseInt(e.target.dataset.index));
                    setTmpTimeframeValue(sourceIndicators[e.target.dataset.index].timeframe);
                    setOffsetCandleValue(sourceIndicators[e.target.dataset.index].offset);
                    setOffset2CandleValue(sourceIndicators[e.target.dataset.index].offset2);
                  }} data-index={index}>{indicator.indicatorName}</a>
                  {index!==sourceIndicators.length-1 && " | "}
                </span>
              )}
              {/*indicatorModalInput.indicatorName.toUpperCase()*/}
            </h5>
          </div>
          <div class="modal-body" style={{ margin: "0" }}>
            <div className="scanner-conditions-options">
              <div className="scanner-conditions-option">
                <h6>Candelstick timeframe</h6>
                <select
                  className="form-control scanner-condition-option"
                  name="candelstick-timeframe"
                  id="scanner-candelstick-timeframe"
                  value={tmpTimeframeValue}
                  onChange={e => {
                    let tempArr = sourceIndicators;
                    if(e.target.value === "daily" || e.target.value === "weekly"
                    || e.target.value === "monthly" || e.target.value === "quarterly"){
                      setOffset2CandleValue("all-candles");
                      tempArr[selectedIndicator].offset2 = "all-candles";
                    }
                    tempArr[selectedIndicator].timeframe = e.target.value;
                    setSourceIndicators(tempArr);
                    setTmpTimeframeValue(sourceIndicators[selectedIndicator].timeframe);
                    indicatorModalInput.subindicators = sourceIndicators;
                  }}
                >
                  <option value="1-min">1 min</option>
                  <option value="2-min">2 min</option>
                  <option value="3-min">3 min</option>
                  <option value="5-min">5 min</option>
                  <option value="10-min">10 min</option>
                  <option value="15-min">15 min</option>
                  <option value="30-min">30 min</option>
                  <option value="45-min">45 min</option>
                  <option value="60-min">60 min</option>
                  <option value="75-min">75 min</option>
                  <option value="90-min">90 min</option>
                  <option value="120-min">120 min</option>
                  <option value="180-min">180 min</option>
                  <option value="240-min">240 min</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </div>

              {/*disable if all-candles in offset 2 is NOT selected*/}
              <div className="scanner-conditions-option">
                <h6>Offset 1</h6>
                <select
                  className="form-control scanner-condition-option"
                  name="scanner-offset"
                  id="scanner-offset"
                  value={
                    (offsetCandleValue.split("-")[0]>5)?
                      "custom-candle"
                    :
                      offsetCandleValue
                  }
                  disabled={offset2CandleValue!=="all-candles"}
                  style = {{color:offset2CandleValue!=="all-candles"?"silver":""}}
                  onChange={e => {
                    let tempArr = sourceIndicators;
                    if(e.target.value==="custom-candle"){
                      let num = prompt("Select a number", 6);
                      if(numberRegEx.test(num) && num!="0"){
                        tempArr[selectedIndicator].offset = num+"-candle";
                      }else{
                        alert("Please type in a number(not zero)");
                      }
                    }else{
                      tempArr[selectedIndicator].offset = e.target.value;
                    }
                    setOffsetCandleValue(sourceIndicators[selectedIndicator].offset);
                    setSourceIndicators(tempArr);
                    indicatorModalInput.subindicators = sourceIndicators;
                  }}
                >
                  <option value="latest-candle">Latest Candle</option>
                  <option value="1-candle">1 Candle ago</option>
                  <option value="2-candle">2 Candle ago</option>
                  <option value="3-candle">3 Candle ago</option>
                  <option value="4-candle">4 Candle ago</option>
                  <option value="5-candle">5 Candle ago</option>
                  <option value="custom-candle" id="custom-candle">Custom candle ago</option>
                </select>
              </div>

              {/*to be disabled if there is NO min in the timeframe dropdown*/}
              {/*disable if latest-candle in offset 1 is NOT selected*/}
              <div className="scanner-conditions-option">
                <h6>Offset 2</h6>
                <select
                  className="form-control scanner-condition-option"
                  name="scanner-segment-2"
                  id="scanner-segment-2"
                  disabled={offsetCandleValue!=="latest-candle" || tmpTimeframeValue.indexOf("min")===-1}
                  style={{color:(offsetCandleValue!=="latest-candle" || tmpTimeframeValue.indexOf("min")===-1)?"silver":""}}
                  value={
                    (offset2CandleValue.startsWith("custom-"))?
                      "custom-days-custom-candle"
                    :
                    (offset2CandleValue.split("-")[1]!=="yester")?
                      (offset2CandleValue.split("-")[0]>5)?
                        "custom-todays-candle"
                      :
                        offset2CandleValue
                    :
                      (offset2CandleValue.split("-")[0]>3)?
                        "custom-yester-candle"
                      :
                        offset2CandleValue
                  }
                  onChange={e => {
                    let tempArr = sourceIndicators;
                    if(e.target.value==="custom-todays-candle"){
                      let num = prompt("Select a number", 6);
                      if(numberRegEx.test(num) && num!="0"){
                        tempArr[selectedIndicator].offset2 = num+"-candle";
                      }else{
                        alert("Please type in a number");
                      }
                    }else if(e.target.value==="custom-yester-candle"){
                      let num = prompt("Select a number", 4);
                      if(numberRegEx.test(num) && num!="0"){
                        tempArr[selectedIndicator].offset2 = num+"-yester-candle";
                      }else{
                        alert("Please type in a number");
                      }
                    }else if(e.target.value==="custom-days-custom-candle"){
                      let num = prompt("How many days ago?", 1);
                      if(numberRegEx.test(num) && num!="0"){
                        let num2 = prompt("Which candle?", 1);
                        if(numberRegEx.test(num2) && num2!="0"){
                          tempArr[selectedIndicator].offset2 = "custom-"+num2+"-"+num+"-candle";
                        }else{
                          alert("Please type in a number");  
                        }
                      }else{
                        alert("Please type in a number");
                      }
                    }else{
                      tempArr[selectedIndicator].offset2 = e.target.value;
                    }
                    setOffset2CandleValue(sourceIndicators[selectedIndicator].offset2);
                    setSourceIndicators(tempArr);
                    indicatorModalInput.subindicators = sourceIndicators;
                  }}
                >
                  <option value="all-candles">All candles</option>
                  <option value="1-candle">Todays 1st Candle</option>
                  <option value="2-candle">Todays 2nd Candle</option>
                  <option value="3-candle">Todays 3rd Candle</option>
                  <option value="4-candle">Todays 4th Candle</option>
                  <option value="5-candle">Todays 5th Candle</option>
                  <option value="custom-todays-candle">Todays Custom Candle</option>
                  <option value="1-yester-candle">Yesterdays 1st Candle</option>
                  <option value="2-yester-candle">Yesterdays 2nd Candle</option>
                  <option value="3-yester-candle">Yesterdays 3rd Candle</option>
                  <option value="custom-yester-candle">Yesterdays Custom Candle</option>
                  <option value="custom-days-custom-candle">Custom Days Custom Candle</option>
                </select>
              </div>
            </div>

            <hr />

            <div className="indicator-settings">
              {sourceIndicators[selectedIndicator].settings.map((e, i) => {
                return (
                  <div className="scanner-conditions-option">
                    <h6>{e.name}</h6>
                    {e.options === undefined ? (
                      <input
                        className="form-control scanner-condition-option"
                        type="number"
                        name="indicator-setting-length"
                        value={e.value}
                        onChange={(element) => {
                          if (element.target.value < 1) return;
                          e.value = element.target.value;
                          setTmpValue(element.target.value);
                        }}
                      />
                    ) : (
                      <select
                        className="form-control scanner-condition-option"
                        name="indicator-setting-source"
                        id="indicator-source"
                        value={e.value}
                        onChange={(element) => {
                          e.value = element.target.value;
                          setTmpSourceValue(element.target.value);
                          //add to indicator sources only if the e.name is source
                          //add to indicator sources via addSourceIndicator() method
                          //set indicatorModalInput.subindicators to the sourceIndicators array
                          if(e.name === "Source"){
                            const newIndicator = allIndicators.filter((indicator)=>{return indicator.id===element.target.value})[0];
                            if(newIndicator!==undefined){
                              //if selectedIndicator!=sourceIndicators.length-1 then update sourceIndicators[selectedIndicator+1]
                              //set sourceIndicators[selectedIndicator+1] to the new indicator
                              const newIndicatorSettings = newIndicator.settings!==undefined?newIndicator.settings:[];
                              const newIndicatorSettingsFinal = {
                                indicatorName: newIndicator.id,
                                element: newIndicator.id,
                                timeframe: "1-min",
                                offset: "latest-candle",
                                offset2: "all-candles",
                                settings: [
                                  { name: "Length", value: 14 },
                                  {
                                    name: "Source",
                                    options: ["Open", "High", "Low", "Close", ...allIndicatorsStrings],
                                    value: "Close",
                                  },
                                  ...newIndicatorSettings
                                ]
                              };

                              if(selectedIndicator<sourceIndicators.length-1){
                                updateSourceIndicator(newIndicatorSettingsFinal, selectedIndicator+1);
                              }else{
                                addSourceIndicator(newIndicatorSettingsFinal);
                              }
                              indicatorModalInput.subindicators = sourceIndicators;
                            }else {
                              //if any of open,close,high,low were selected remove all the indicators after the selected indicator
                              try{
                                removeSourceIndicator(selectedIndicator+1);
                              }catch(err){
                                console.log("can't remove here");
                              }
                            }
                          }
                        }}
                      >
                        {e.options.map((v) => (
                          <option value={v}>{v}</option>
                        ))}
                      </select>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndicatorModal;

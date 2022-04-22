import React, { useEffect, useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./WorkpanelFilter.scss";
import ScannerConditions from "../ScannerConditions/ScannerConditions";
import axios from "axios";
import BACKEND_URL from "../../../Backend_url";
import { DragContext } from "../../../contexts/DragContexts";
import {Row, Col, Form} from "react-bootstrap"
import Multiselect from 'multiselect-react-dropdown';
import ATMModal from "../ATMModal/ATMModal";
import PremiumModal from "../PremiumModal/PremiumModal";

const WorkpanelFilter = () => {
  const [indicators, setIndicators] = useState([]);
  const [searchedIndicators, setSearchedIndicators] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const [segment, setSegment] = useState(-1);
  const [segment1a, setSegment1a] = useState("");
  const [segment2a, setSegment2a] = useState([]);
  const [segment1aArr, setSegment1aArr] = useState([]);
  const [segment2aArr, setSegment2aArr] = useState([]);
  const {setCurElemId} = useContext(DragContext);
  const {setAllIndicators} = useContext(DragContext);
  const [segment2aOptions, setS2ao] = useState([]);
  const [atmModalOpen, setAtmModalOpen] = useState(false);
  const [premiumModalOpen, setPremiumModalOpen] = useState(false);
  const currScanner = useLocation();

  const disableCrossIcons = () => {
    Array.from(document.getElementsByClassName("cross-icon")).forEach(element => {
      element.style.pointerEvents="none";
    });
  }

  const dragStart = (e) => {
    window.localStorage.removeItem("scannerLoaded");
    e.dataTransfer.setData("text/plain", e.target.id);
    disableCrossIcons();
  };

  const dblClick = (e) => {
    window.localStorage.removeItem("scannerLoaded");
    setCurElemId(e.id)
    window.localStorage.setItem("curSett", e.settings!==undefined?JSON.stringify(e.settings):null);
  }

  const dblClickOperators = (e) => {
    window.localStorage.removeItem("scannerLoaded");
    setCurElemId(e.target.id)
  }

  const closeATMModal = (data) => {
    const tmp = segment2a;
    const atmObj = {
      cat: 'Strike',
      key: 'ATM',
      value: data
    }

    console.log("ATM VALUE:", data)

    tmp.push(atmObj)
    setSegment2a(tmp);

    setAtmModalOpen(false)
  }

  const closePremiumModal = (data) => {
    const tmp = segment2a;
    const premiumObj = {
      cat: 'Strike',
      key: 'Closest to '+data.closest+', Min '+data.min+', Max '+data.max,
      value: data
    }

    console.log("PREMIUM VALUE:", data)

    tmp.push(premiumObj)
    setSegment2a(tmp);

    setPremiumModalOpen(false)
  }

  const getTypesSelected = () => {
    return segment2a.filter((prop)=>{
      return prop.cat === "Type";
    })
  }

  useEffect(() => {
    window.localStorage.setItem("scannerLoaded", true)
    axios
      .get(`http://${BACKEND_URL}/api/scanner/overlap-studies`)
      .then((res) => {
        setIndicators(res.data)
        setAllIndicators(res.data)
        setSearchedIndicators(res.data)
      })
      .catch((err) => console.log(err));

    document.getElementById("satisfy").checked = true;

    setS2ao([
      {
        cat: 'Type',
        key: 'CE'
      },
      {
        cat: 'Type',
        key: 'PE'
      },
      {
        cat: 'Expiry',
        key: 'Current Week'
      },
      {
        cat: 'Expiry',
        key: 'Current Week +1'
      },
      {
        cat: 'Expiry',
        key: 'Current Week +2'
      },
      {
        cat: 'Expiry',
        key: 'Current Week +3'
      },
      {
        cat: 'Expiry',
        key: 'Current Month'
      },
      {
        cat: 'Expiry',
        key: 'Next Month'
      },
      {
        cat: 'Expiry',
        key: 'Far Month'
      },
      {
        cat: 'Strike',
        key: 'Number'
      },
      {
        cat: 'Strike',
        key: 'ATM'
      },
      {
        cat: 'Strike',
        key: 'Min/Max Premium, Closest to'
      },
    ])
  }, []);

  useEffect(() => {

    // console.log(searchedText);
    let searchText = searchedText.toLowerCase();
    let finalIndicators = [];
    indicators.forEach(e => {

      // console.log(e)
      if(e.id.toLowerCase().includes(searchText) || e.name.toLowerCase().includes(searchText)) {
        finalIndicators.push(e);
      }
    })

    setSearchedIndicators(finalIndicators);
  }, [searchedText]);

  useEffect(()=>{
    if(currScanner.state!==undefined){
      try{
        document.getElementById("scanner-timeframe").value = currScanner.state.timeframe;
        document.getElementById("duplicate-switch").checked = currScanner.state.duplicate;
        document.getElementById("scanner-start-time").childNodes[1].value = currScanner.state.starttime;
        document.getElementById("scanner-end-time").childNodes[1].value = currScanner.state.endtime;
        setSegment(parseInt(currScanner.state.segment));
        setSegment1a(currScanner.state.segment1a);
        setSegment2a(currScanner.state.segment2a);
        //setAtmModalOpen(true)
        document.getElementById("satisfy").checked = currScanner.state.satisfy;
        document.getElementById("not-satisfy").checked = !currScanner.state.satisfy;
      }catch(err){
        console.log("Something was probably undefined: "+err)
      }
    }else{
      setSegment(0)
    }
  }, [currScanner.state]);

  useEffect(()=>{
    console.log(segment)

    if(segment===0){
      axios.get(`http://${BACKEND_URL}/api/getAllEquities`)
      .then((res) => {
        setSegment1aArr(["Nifty 50",
          "Nifty 100",
          "Nifty 200",
          "Nifty 500",
          ...res.data
        ])
      })
      .catch((err) => console.log(err));

      setSegment2aArr([
        "X"
      ])

      if(currScanner.state===undefined) {
        setSegment1a("Nifty 50");
        setSegment2a("X");
      }
    }else if(segment===1){
      setSegment1aArr(["Nifty Spot",
        "Banknifty Spot"
      ])

      setSegment2aArr([
        "X"
      ])

      if(currScanner.state===undefined) {
        setSegment1a("Index Spot");
        setSegment2a("X");
      }
    }else if(segment===2){
      axios.get(`http://${BACKEND_URL}/api/getAllOptions`)
      .then((res) => {
        setSegment1aArr(["Nifty 50",
          ...res.data
        ])
      })
      .catch((err) => console.log(err));

      if(currScanner.state===undefined) {
        setSegment1a("Nifty 50");
        setSegment2a("");
      }

      document.getElementById("scanner-segment-2a").value = segment2a;
    }else if(segment===3){
      axios.get(`http://${BACKEND_URL}/api/getAllFutures`)
      .then((res) => {
        setSegment1aArr(["Nifty 50", ...res.data])
      })
      .catch((err) => console.log(err));

      setSegment2aArr([
        "Expiry",
        "1 (Current)",
        "2 (Next)",
        "3 (Far)"
      ])
      if(currScanner.state===undefined) {
        setSegment1a("Nifty 50");
        setSegment2a("Expiry");
      }
    }
  }, [segment]);

  useEffect(()=>{
    try{
      console.log("segment2a:", segment2a)
    }catch(err){
      console.log("New scanner")
    }
  }, [segment2a]);

  return (
    <div className="scanner-filter-component">
      {atmModalOpen && <ATMModal closeModal={closeATMModal} getTypesSelected={getTypesSelected} />}
      {premiumModalOpen && <PremiumModal closeModal={closePremiumModal} />}

      <div className="scanner-indicator-component">
        <form id="navbar-search" className="navbar-form search-form" style={{height:"10%"}}>
          <input
            className="form-control scanner-indicator-search"
            placeholder="Search"
            type="text"
            value={searchedText}
            onChange={e => setSearchedText(e.target.value)}
          />
          <button type="button" className="btn btn-default">
            <i className="icon-magnifier"></i>
          </button>
        </form>
        <hr />
        <div style={{height:"80%", overflow:"auto"}}>
          {searchedIndicators.map((indicator) => (
              <div
                className="scanner-indicator-name"
                style={{ paddingLeft: "1rem" }}
                id={indicator.id}
                draggable="true"
                onDragStart={(e)=>{
                  dragStart(e);
                  window.localStorage.setItem("curSett", indicator.settings!==undefined?JSON.stringify(indicator.settings):null);
                }}
                onDoubleClick={()=>{dblClick(indicator)}}>
                {indicator.name} ({indicator.id})
              </div>
          ))}
        </div>
      </div>
      <div className="scanner-filter">

        <h5>Filter</h5>
        <div className="scanner-custom-filter">
        <div className="scanner-segments">
        <select
          className="form-control scanner-segment-select"
          name="fno-lot-size"
          id="scanner-segment"
          value={segment}
          onChange={(e)=>{
            setSegment(parseInt(e.target.value))
          }}
        >
          <option value="0">Equity</option>
          <option value="1">Indices</option>
          <option value="2">Options</option>
          <option value="3">Futures</option>
        </select>

        <select
          className="form-control scanner-segment-select"
          name="fno-lot-size"
          id="scanner-segment-1a"
          value={segment1a}
          onChange={(e)=>{
            setSegment1a(e.target.value)
          }}
        >
          {
            segment1aArr.map((option)=>
              <option value={option}>{option}</option>
            )
          }
        </select>
      </div>

      <div className="segment-2-div">
      {segment!==2 && <select
          className="form-control scanner-segment-select"
          name="scanner-segment-2a"
          id="scanner-segment-2a"
          value={segment2a}
          onChange={(e)=>{
            setSegment2a(e.target.value)
          }}
        >
          {
            segment2aArr.map((option)=>
              <option value={option}>{option}</option>
            )
          }
        </select>}

        {segment===2 && <Multiselect
          id="scanner-segment-2a"
          name="scanner-segment-2a"
          displayValue="key"
          groupBy="cat"
          selectedValues={segment2a}
          onSelect={function onSelect(e){
            //don't allow multiple value selection in strike
            const segmentComp = document.getElementById("scanner-segment-2a");
            const canBeAdded = e[e.length-1].cat==="Strike"? e.filter((obj)=>{return obj.cat==="Strike"}).length===1:true;

            if(!canBeAdded){
              e.pop();
            }else{
              const latestAdded = e[e.length-1];

              if(latestAdded.cat==="Strike"){
                //we show a modal or a prompt
                if(latestAdded.key.startsWith("Number")){
                  //Number Strike
                  let number = prompt("Select a number", 0);
                  if(number!==null && number.trim()!=="" && !isNaN(number)){
                    latestAdded.key = "Number: " +number;
                    latestAdded.value = number;
                    e[e.length-1] = latestAdded;
                  }else{
                    e.pop();
                  }
                }else if(latestAdded.key.startsWith("ATM")){
                  //ATM Strike
                  //open a modal
                  const typesSelected = getTypesSelected();
                  e.pop();
                  if(typesSelected.length>0){
                    console.log("adding")
                    setAtmModalOpen(true);
                  }
                }else if(latestAdded.key.indexOf("Premium")!==-1){
                  //Premium Strike
                  e.pop();
                  setPremiumModalOpen(true);
                }
              }

            }

            //update the value of segment2a
            segmentComp.value = e;
            setSegment2a(e)

            console.log(e)
          }}
          onRemove={(e)=>{
            //update the value of segment2a
            const segmentComp = document.getElementById("scanner-segment-2a");
            segmentComp.value = e;
            setSegment2a(e)
          }}
          selectionLimit={10}
          options={segment2aOptions}
          showCheckbox
        />}
      </div>

          <div className="scanner-time-and-lot-size">
            <div className="scanner-time-input" id="scanner-start-time">
              <h6>Start Time</h6>
              <input
                className="form-control"
                id="scanner-start-time"
                type="text"
                min="09:00"
                max="15:00"
                placeholder="HH:MM"
                onFocus={(e) => (e.target.type = "time")}
                onBlur={(e) => (e.target.type = "text")}
                required
              />
            </div>
            <div className="scanner-time-input" id="scanner-end-time">
              <h6>End Time</h6>
              <input
                className="form-control"
                id="scanner-end-time"
                type="text"
                min="09:00"
                max="15:00"
                placeholder="HH:MM"
                onFocus={(e) => (e.target.type = "time")}
                onBlur={(e) => (e.target.type = "text")}
                required
              />
            </div>
          </div>

          <div className="scanner-satisfy">
            <span>
              which satisfy{" "}
            </span>
            <div className="scanner-satisfy-not-satisfy">
              <div className="scanner-alert-button">
                <input
                  type="radio"
                  id="satisfy"
                  name="satisfy-not-satisfy"
                />
                <label for="satisfy">Satisfy</label>
              </div>

              <div className="scanner-alert-button">
                <input
                  type="radio"
                  id="not-satisfy"
                  name="satisfy-not-satisfy"
                />
                <label for="not-satisfy">Not Satisfy</label>
              </div>
            </div>
          </div>

          <div className="scanner-duplicate-timeframe">
              <div className="form-check form-switch" style={{margin: '1rem', paddingLeft:'0', width:'50%'}}>
                <Row>
                  <Col md={10}>
                  <label className="form-check-label" for="alert-switch">
                    Duplicate Results
                  </label>
                  </Col>
                  <Col>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="duplicate-switch"
                    />
                  </Col>
                </Row>
              </div>
              <div className="form-check form-switch" style={{margin: '1rem', paddingLeft:'0', width:'50%'}}>
                <select
                  className="form-control scanner-condition-option"
                  name="candelstick-timeframe"
                  id="scanner-timeframe"
                >
                  <option value="timeframe">Timeframe</option>
                  <option value="1-min">1 min</option>
                  <option value="2-min">2 min</option>
                  <option value="3-min">3 min</option>
                  <option value="5-min">5 min</option>
                  <option value="10-min">10 min</option>
                  <option value="15-min">15 min</option>
                </select>
              </div>
            </div>
        </div>
      </div>

      <div className="scanner-filter-operation">
        <h5>Operations</h5>

        <div className="scanner-custom-filter">
          <div className="scanner-math-operation">
            <tr>
              <td>
                <h6>Math Operation</h6>
                <span
                  className="scanner-math-operation-icons"
                  id="+"
                  draggable="true"
                  onDragStart={dragStart}
                  onDoubleClick={(e)=>dblClickOperators(e)}
                >
                  <strong style={{pointerEvents:'none'}}>+</strong>
                </span>
                <span
                  className="scanner-math-operation-icons"
                  id="-"
                  draggable="true"
                  onDragStart={dragStart}
                  onDoubleClick={(e)=>dblClickOperators(e)}
                >
                  <strong style={{pointerEvents:'none'}}>-</strong>
                </span>
                <span
                  className="scanner-math-operation-icons"
                  id="*"
                  draggable="true"
                  onDragStart={dragStart}
                  onDoubleClick={(e)=>dblClickOperators(e)}
                >
                  <strong style={{pointerEvents:'none'}}>*</strong>
                </span>
                <span
                  className="scanner-math-operation-icons"
                  id="/"
                  draggable="true"
                  onDragStart={dragStart}
                  onDoubleClick={(e)=>dblClickOperators(e)}
                >
                  <strong style={{pointerEvents:'none'}}>/</strong>
                </span>
                <span
                  className="scanner-math-operation-icons"
                  id="number"
                  draggable="true"
                  onDragStart={dragStart}
                  onDoubleClick={(e)=>dblClickOperators(e)}
                >
                  <strong style={{pointerEvents:'none'}}>Number</strong>
                </span>
              </td>
              <td>
                <h6>Stock</h6>
                <span
                  className="scanner-math-operation-icons"
                  id="ltp"
                  draggable="true"
                  onDragStart={dragStart}
                  onDoubleClick={(e)=>dblClickOperators(e)}
                >
                  <strong style={{pointerEvents:'none'}}>Stock LTP</strong>
                </span>
              </td>
            </tr>
          </div>
          <div className="scanner-math-operation">
            <h6>Comparison / Cross</h6>

            <div
              className="scanner-math-operation-icons"
              id=">"
              draggable="true"
              onDragStart={dragStart}
              onDoubleClick={(e)=>dblClickOperators(e)}
            >
              <strong style={{pointerEvents:'none'}}>&gt;</strong>
            </div>

            <div
              className="scanner-math-operation-icons"
              id="<"
              draggable="true"
              onDragStart={dragStart}
              onDoubleClick={(e)=>dblClickOperators(e)}
            >
              <strong style={{pointerEvents:'none'}}>&lt;</strong>
            </div>
            <div
              className="scanner-math-operation-icons"
              id=">="
              draggable="true"
              onDragStart={dragStart}
              onDoubleClick={(e)=>dblClickOperators(e)}
            >
              <strong style={{pointerEvents:'none'}}>&gt;&#61;</strong>
            </div>
            <div
              className="scanner-math-operation-icons"
              id="<="
              draggable="true"
              onDragStart={dragStart}
              onDoubleClick={(e)=>dblClickOperators(e)}
            >
              <strong style={{pointerEvents:'none'}}>&lt;&#61;</strong>
            </div>

            <br/>

            <div
              className="scanner-binary-operation-icons"
              draggable="true"
              id="cfab"
              onDragStart={dragStart}
              onDoubleClick={(e)=>dblClickOperators(e)}
            >
              <strong style={{pointerEvents:'none'}}>Cross from above to below</strong>
            </div>

            <div
              className="scanner-binary-operation-icons"
              draggable="true"
              id="cfba"
              onDragStart={dragStart}
              onDoubleClick={(e)=>dblClickOperators(e)}
            >
              <strong style={{pointerEvents:'none'}}>Cross from below to above</strong>
            </div>
          </div>
          <div className="scanner-math-operation">
            <h6>Binary Operation</h6>

            <div
              className="scanner-binary-operation-icons"
              draggable="true"
              id="or"
              onDragStart={dragStart}
              onDoubleClick={(e)=>dblClickOperators(e)}
            >
              <strong style={{pointerEvents:'none'}}>OR</strong>
            </div>

            <div
              className="scanner-binary-operation-icons"
              draggable="true"
              id="and"
              onDragStart={dragStart}
              onDoubleClick={(e)=>dblClickOperators(e)}
            >
              <strong style={{pointerEvents:'none'}}>AND</strong>
            </div>

            <div
              className="scanner-binary-operation-icons"
              draggable="true"
              id="substract"
              onDragStart={dragStart}
              onDoubleClick={(e)=>dblClickOperators(e)}
            >
              <strong style={{pointerEvents:'none'}}>SUBSTRACT</strong>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkpanelFilter;

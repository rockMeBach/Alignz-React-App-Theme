import React, { useEffect, useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./WorkpanelFilter.scss";
import ScannerConditions from "../ScannerConditions/ScannerConditions";
import axios from "axios";
import BACKEND_URL from "../../../Backend_url";
import { DragContext } from "../../../contexts/DragContexts";
import {Col, Form} from "react-bootstrap"

const WorkpanelFilter = () => {
  const [indicators, setIndicators] = useState([]);
  const [searchedIndicators, setSearchedIndicators] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const [segment, setSegment] = useState(0);
  const [segment1a, setSegment1a] = useState("");
  const [segment2a, setSegment2a] = useState("");
  const [segment1aArr, setSegment1aArr] = useState([]);
  const [segment2aArr, setSegment2aArr] = useState([]);
  const {setCurElemId} = useContext(DragContext);
  const {setAllIndicators} = useContext(DragContext);
  const currScanner = useLocation();
  const [equityStocks, setEquityStocks] = useState([]);
  const [futureStocks, setFutureStocks] = useState([]);
  const [optionsStocks, setOptionsStocks] = useState([]);

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
        setSegment(currScanner.state.segment);
        setSegment1a(currScanner.state.segment1a);
        setSegment2a(currScanner.state.segment2a);
        document.getElementById("satisfy").checked = currScanner.state.satisfy;
        document.getElementById("not-satisfy").checked = !currScanner.state.satisfy;
      }catch(err){
        console.log("Something was probably undefined: "+err)
      }
    }
  }, [currScanner.state]);

  useEffect(()=>{
    if(segment===0){
      setSegment1aArr(["All",
        "Nifty 50",
        "Nifty 100",
        "Nifty 200",
        "Nifty 500",
        "Particular Stock"
      ])
      setSegment2aArr([
        "X"
      ])
      if(currScanner.state===undefined) {
        setSegment1a("All");
        setSegment2a("X");
      }
    }else if(segment===1){
      setSegment1aArr(["Index Spot",
        "Index Future",
        "Nifty Spot",
        "Nifty Future",
        "Banknifty Spot",
        "Banknifty Future"
      ])
      setSegment2aArr([
        "Expiry"
      ])
      if(currScanner.state===undefined) {
        setSegment1a("Index Spot");
        setSegment2a("Expiry");
      }
    }else if(segment===2){
      setSegment1aArr(["All",
        "Nifty 50",
        "Particular Option",
      ])
      setSegment2aArr([
        "Expiry",
        "Type",
        "CE",
        "PE",
        "Strike"
      ])
      if(currScanner.state===undefined) {
        setSegment1a("All");
        setSegment2a("Expiry");
      }
    }else if(segment===3){
      setSegment1aArr(["All",
        "Nifty 50",
        "Particular Future"
      ])
      setSegment2aArr([
        "Expiry",
        "1 (Current)",
        "2 (Next)",
        "3 (Far)"
      ])
      if(currScanner.state===undefined) {
        setSegment1a("All");
        setSegment2a("Expiry");
      }
    }
  }, [segment]);

  return (
    <div className="scanner-filter-component">
      <div className="scanner-indicator-component">
        <form id="navbar-search" className="navbar-form search-form">
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
        <div style={{ height: "18.2rem", overflow: "auto" }}>
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

        <select
          className="form-control scanner-segment-select"
          name="fno-lot-size"
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
        </select>
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
            <span style={{ width: "6rem", marginTop: "10px" }}>
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
              <div className="form-check form-switch" style={{margin: '1rem', paddingLeft:'0', width:'40%'}}>
                <label className="form-check-label" for="alert-switch">
                  Duplicate results
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="duplicate-switch"
                  style={{marginTop: '0.3rem'}}
                />
              </div>
              <div className="form-check form-switch" style={{margin: '1rem', paddingLeft:'0', width:'100%'}}>
                <label className="form-check-label">
                  Timeframe
                </label>
                <select
                  style={{width: '60%', display: 'inline-block', marginLeft: '1rem'}}
                  className="form-control scanner-condition-option"
                  name="candelstick-timeframe"
                  id="scanner-timeframe"
                >
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

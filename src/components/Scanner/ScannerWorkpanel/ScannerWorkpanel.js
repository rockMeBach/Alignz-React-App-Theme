import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams, useHistory } from "react-router-dom";
import "./ScannerWorkpanel.scss";
import ScannerConditions from "../ScannerConditions/ScannerConditions";
import WorkpanelHeading from "../WorkpanelHeading/WorkpanelHeading";
import WorkpanelFilter from "../WorkpanelFilter/WorkpanelFilter";
import queryCalculator from "../ScannerExpressionCalculator/ScannerexpressionCalculator";
import axios from "axios";
import BACKEND_URL from "../../../Backend_url"
import { DragContext } from "../../../contexts/DragContexts";
import LoadingModal from "../LoadingModal/LoadingModal";
import io from "socket.io-client"

const ScannerWorkpanel = ({ scannerResultDisplay }) => {
  const auth = useSelector((state) => state.auth);
  const [data, setData] = useState({});
  const [scannerInfo, setScannerInfo] = useState(null);
  const [apiResults, setApiResults] = useState([]);
  const [binaryOperator, setBinaryOperator] = useState([]);
  const [apiResultsLength, setApiResultsLength] = useState(0);
  const [finalResult, setFinalResult] = useState(null);
  const [curElemId, setCurElemId] = useState("");
  const [scannerSettArr, setScannerSettArr] = useState([]);
  const [allIndicators, setAllIndicators] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  let {id} = useParams();
  let currScanner = useLocation();

  const scannerData = (s) => {
    setData(s);
  };

  const getURL = async (results, owner) => {
    //console.log("getting url for", results);
    window.localStorage.setItem("url_status", 0);
    const res = await axios
      .post(`http://${BACKEND_URL}/api/getResultsUrl/`, {
        results,
        owner
      })
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  
    return res;
  }

  const saveScanner = async () => {

    let conditions = document.getElementById(
      "scanner-condition-indicators"
    ).childNodes;
    if(isExprValid() && conditions[0].className.trim() != "scanner-indicator-drag-request"){
      let date = new Date();
      let todaysDate = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
      let timeAdded = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

      let starttime =
        document.getElementById("scanner-start-time").childNodes[1].value;
      let endtime =
        document.getElementById("scanner-end-time").childNodes[1].value;
      let tmp = {
        name: data.name,
        description: data.description,
        publicChecked: document.getElementById("alert-public").checked,
        alerts: document.getElementById("alert-switch").checked,
        date: todaysDate,
        time: timeAdded,
        starttime: starttime,
        endtime: endtime,
        duplicate: document.getElementById('duplicate-switch').checked,
        fnoLotSize: "",
        satisfy: document.getElementById('satisfy').checked,
        segment: document.getElementById("scanner-segment").value,
        segment1a: document.getElementById("scanner-segment-1a").value,
        segment2a: document.getElementById("scanner-segment-2a").value,
        timeframe: document.getElementById("scanner-timeframe").value,
        owner: auth.user._id,
        expression: scannerSettArr,
        categories: currScanner.state!==undefined && currScanner.state.categories!==undefined?currScanner.state.categories:[]
      };
      
      if(currScanner.state!==undefined){
        const scannerId = currScanner.state._id;

        if(auth.user._id != currScanner.state.owner){
          if(confirm("This scanner will be saved as your own.") === true){
            tmp.categories = [];
            const res = await axios.post(
              `http://${BACKEND_URL}/api/scanner/setScanner`,
              {
                tmp,
              }
            );

            if(res.data!==undefined && res.data!==null){
              alert(res.data.msg);
              history.push("/scanners");
            }
          }
        }else{
          console.log("Editing mode");

          const res = await axios.post(
            `http://${BACKEND_URL}/api/scanner/updateScanner`,
            {
              scannerId,
              tmp,
            }
          );

          if(res.data!==undefined && res.data!==null){
            alert(res.data.msg);
          }
        }
      }else{
        const res = await axios.post(
          `http://${BACKEND_URL}/api/scanner/setScanner`,
          {
            tmp,
          }
        );
        console.log("Creation mode");

        if(res.data!==undefined && res.data!==null){
          alert(res.data.msg);
        }
      }
    }else{
      alert("Please create a valid expression");
    }
    // console.log(res);
  };

  const isExprValid = () => {
    let pseudoString = "";
    let isValid = false;
    let invalidConditionFound = false;

    scannerSettArr.forEach((condition)=>{
      if(!isLeftRightValid(condition)){
        invalidConditionFound = true;
      }else{
        for(let i=0;i<condition.length;i++){
          let curId = condition[i].indicatorName;
          if(curId=="+" || curId=="-" || curId=="*" || curId=="/" || (typeof curId=='number') || curId==">" || curId=="<"
          || curId==">=" || curId=="<="){
            pseudoString += curId+" ";
          }else if(curId == "cfab" || curId == "cfba"){
            pseudoString += "> ";
          }else if(curId=="or" || curId=="and" || curId=="substract"){
            pseudoString += "|| ";
          }else{
            pseudoString += 1+" ";
          }
        }
      }
    });

    try{
      let evalVal = eval(pseudoString.trim())+"";
      if(evalVal!="" && !invalidConditionFound){
        isValid = true;
      }
    }catch(err){
      isValid = false;
    }

    return isValid;
  }

  const isLeftRightValid = (conditions) => {
    let flag = true;
    let comparison = "";
    let LHS = [];
    let RHS = [];
    conditions.forEach((e) => {
      if(e.indicatorName !== "and" && e.indicatorName !== "or" && e.indicatorName !== "substract"){
        if (
          e.indicatorName === "<" ||
          e.indicatorName === ">" ||
          e.indicatorName === "cfab" ||
          e.indicatorName === "cfba" ||
          e.indicatorName === ">=" ||
          e.indicatorName === "<="
        ) {
          comparison = e.indicatorName;
          flag = false;
        } else if (flag) {
          LHS.push(e);
        } else {
          RHS.push(e);
        }
      }else{
        LHS.push(e);
        RHS.push(e);
      }
    });

    if(LHS.length!==0 && RHS.length!==0){
      return true;
    }else{
      return false;
    }
  }

  const fetchScannerResults = async (conditions) => {
    let flag = true;
    let comparison = "";
    let LHS = [];
    let RHS = [];
    conditions.forEach((e) => {
      // console.log("ID", e.id, e.data);

      if (
        e.indicatorName === "<" ||
        e.indicatorName === ">" ||
        e.indicatorName === "cfab" ||
        e.indicatorName === "cfba" ||
        e.indicatorName === ">=" ||
        e.indicatorName === "<="
      ) {
        comparison = e.indicatorName;
        flag = false;
      } else if (flag) {
        LHS.push(e);
      } else {
        RHS.push(e);
      }
    });

    if(LHS.length!==0 && RHS.length!==0){
      //if (!document.getElementById("satisfy").checked) comparison = !comparison;

      let starttime =
        document.getElementById("scanner-start-time").childNodes[1].value;
      let endtime =
        document.getElementById("scanner-end-time").childNodes[1].value;
      let query = {
        starttime: starttime,
        endtime: endtime,
        duplicate: document.getElementById('duplicate-switch').checked,
        fnoLotSize: "",
        satisfy: document.getElementById('satisfy').checked,
        segment: document.getElementById("scanner-segment").value,
        segment1a: document.getElementById("scanner-segment-1a").value,
        timeframe: document.getElementById("scanner-timeframe").value,
        comparison: comparison,
        LHS: LHS,
        RHS: RHS,
        tier: auth.user.tier
      };
      setScannerInfo(query);
      let res = await queryCalculator(query);
      if (res === undefined) res = [];

      let results = apiResults;
      results.push(res.data);
      //console.log("result", results);
      setApiResults(results);
      setApiResultsLength(apiResults.length);

      return res.data;
    }else{
      return -1;
    }
  };

  const submitScanner = async () => {
    let conditions = document.getElementById(
      "scanner-condition-indicators"
    ).childNodes;

    if(isExprValid() && conditions[0].className.trim() != "scanner-indicator-drag-request"){
      setLoading(true);
      // console.log("Duplicate", document.getElementById('duplicate-switch').checked)
      //alert("Expression is valid");

      /*let binary_operation = [];
      let results = [];

      scannerSettArr.forEach(async (e) => {
          if (
            e.length === 1 &&
            (e[0].indicatorName === "or" ||
              e[0].indicatorName === "and" ||
              e[0].indicatorName === "substract")
          ) {
            binary_operation.push(e[0].indicatorName);
            // setBinaryOperator(e.childNodes[0].id);
          } else {
            let tmp = await fetchScannerResults(e);
            if(tmp===-1){
              alert("Expression is not valid");
              return;
            }
          }
        });

      setBinaryOperator(binary_operation);*/
      //setApiResults(results);

      alert("Your results will be generated soon and you will be notified, please wait...");
      
      //new logic here
      let starttime =
        document.getElementById("scanner-start-time").childNodes[1].value;
      let endtime =
        document.getElementById("scanner-end-time").childNodes[1].value;
      let query = {
        starttime: starttime,
        endtime: endtime,
        duplicate: document.getElementById('duplicate-switch').checked,
        fnoLotSize: "",
        satisfy: document.getElementById('satisfy').checked,
        segment: document.getElementById("scanner-segment").value,
        segment1a: document.getElementById("scanner-segment-1a").value,
        segment2a: document.getElementById("scanner-segment-2a").value,
        timeframe: document.getElementById("scanner-timeframe").value,
        expression: scannerSettArr,
        user: auth.user
      };

      let res = await queryCalculator(query);
    }else{
      alert("Expression is not valid");
    }
    //setApiResultsLength(binary_operation.length);
    //console.log("Binary", binary_operation);

    console.log(scannerSettArr);
  };

  /*useEffect(() => {
    let conditions = document.getElementById(
      "scanner-condition-indicators"
    ).childNodes;

    let binaryOperatorsLength = document.querySelectorAll("#or").length
    +document.querySelectorAll("#and").length
    +document.querySelectorAll("#substract").length-3;

    console.log("Results", apiResults, apiResultsLength, conditions);
    console.log(conditions.length, apiResultsLength, apiResults.length);
    if (apiResultsLength === 0) {
      console.log("Final Result", finalResult);
      scannerResultDisplay(finalResult);
      setFinalResult(null);
      setBinaryOperator(null);
      setApiResults([]);
      return;
    }

    if (conditions.length === 1 || conditions.length === apiResultsLength+binaryOperatorsLength) {
      console.log(apiResultsLength, binaryOperatorsLength, conditions.length)
      calculateFinalResult();
      setApiResultsLength(0);
    }
  }, [apiResultsLength]);*/

  useEffect(()=>{
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }
  }, []);

  const calculateFinalResult = async () => {
    console.log("calculator");
    let final_result = undefined;
    let binaryOperatorIndex = 0;
    apiResults.forEach((e) => {
      if (final_result === undefined) {
        final_result = e;
      } else {
        let newFinalResult = {};
        let stocks = new Set([...Object.keys(final_result), ...Object.keys(e)]);

        try{

          Array.from(stocks).forEach((e2) => {
            newFinalResult[e2] = binaryCalculator(
              final_result[e2] ? final_result[e2] : [],
              e[e2] ? e[e2] : [],
              binaryOperator[binaryOperatorIndex]
            );
          });

        }catch(err){
          console.log("err in binary");
        }

        binaryOperatorIndex = binaryOperatorIndex + 1;
        final_result = newFinalResult;
      }
    });

    setFinalResult(final_result);
    setLoading(false);

    // console.log("Final Result 2", final_result);
    // scannerResultDisplay(final_result);
  };

  const getClippedResults = (final_result, duplicate) =>{
    let clipped_result = [];
    Object.entries(final_result).forEach(([key, value]) => {
      if(!duplicate){
        let tmp = [];

        value.forEach((e, i)=>{
          let previousRow = i ? value[i - 1] : undefined;

          if(previousRow && previousRow.date === e.date) {
            
            let pt = previousRow.time.split(':');
            let ct  = e.time.split(':');

            if(
                (
                    Number(ct[0]) === Number(pt[0])
                    &&
                    Number(ct[1]) - Number(pt[1]) === 1
                )
                ||
                (
                    Number(ct[0]) - Number(pt[0]) === 1
                    && 
                    Number(ct[1]) === 0
                    && 
                    Number(pt[1]) === 59
                )
            ) {
            }
          }else{
            tmp.push(e);
          }
        });

        clipped_result.push(...tmp);
      }else{
        clipped_result.push(...value);
      }
    });

    return clipped_result.slice(0,100);
  }

  const binaryCalculator = (array1, array2, binary_operator) => {
    var combine = [];
    if (binary_operator === "or") {
      combine = array1.concat(array2);
      for (let i = 0; i < combine.length - 1; i++) {
        for (let j = i + 1; j < combine.length; j++) {
          if (
            combine[i].close === combine[j].close &&
            combine[i].date === combine[j].date &&
            combine[i].high === combine[j].high &&
            combine[i].low === combine[j].low &&
            combine[i].open === combine[j].open &&
            combine[i].ticker === combine[j].ticker &&
            combine[i].time === combine[j].time
          ) {
            combine.splice(j, 1);
            j--;
          }
        }
      }
      // console.log("returned result", combine);
    } else if (binary_operator === "and") {
      combine = [];

      for (var i = 0; i < array1.length; i++) {
        var item1 = array1[i],
          found = false;
        for (var j = 0; j < array2.length && !found; j++) {
          found =
            array1[i].close === array2[j].close &&
            array1[i].date === array2[j].date &&
            array1[i].high === array2[j].high &&
            array1[i].low === array2[j].low &&
            array1[i].open === array2[j].open &&
            array1[i].ticker === array2[j].ticker &&
            array1[i].time === array2[j].time;
        }
        if (found === true) {
          combine.push(item1);
        }
      }
    } else if (binary_operator === "substract") {
      combine = [];

      for (var k = 0; k < array1.length; k++) {
        var item2 = array1[k],
          found1 = false;
        for (var l = 0; l < array2.length && !found1; l++) {
          found =
            array1[k].close === array2[l].close &&
            array1[k].date === array2[l].date &&
            array1[k].high === array2[l].high &&
            array1[k].low === array2[l].low &&
            array1[k].open === array2[l].open &&
            array1[k].ticker === array2[l].ticker &&
            array1[k].time === array2[l].time;
        }
        if (found === false) {
          combine.push(item2);
        }
      }
    }
    // console.log(binary_operator, combine);
    //console.log(array1, array2, combine);
    return combine;
  };

  return (
    <div className="col-lg-12 scanner-workpanel-component">
      {/*loading && <LoadingModal />*/}
      <DragContext.Provider value={{curElemId, setCurElemId, scannerSettArr, setScannerSettArr, allIndicators, setAllIndicators}}>
        <WorkpanelHeading scannerData={scannerData} scannerDetails={currScanner.state} />
        <WorkpanelFilter />
        <div className="scanner-conditions-component">
          <ScannerConditions />
        </div>
      </DragContext.Provider>
      <div className="submit-save-scanner-buttons">
        <button className="btn submit-btn" onClick={submitScanner}>
          Submit
        </button>
        <button className="btn submit-btn" onClick={saveScanner}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ScannerWorkpanel;

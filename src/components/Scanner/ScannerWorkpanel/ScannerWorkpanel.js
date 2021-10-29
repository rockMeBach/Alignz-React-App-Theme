import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./ScannerWorkpanel.scss";
import WorkpanelHeading from "../WorkpanelHeading/WorkpanelHeading";
import WorkpanelFilter from "../WorkpanelFilter/WorkpanelFilter";
import queryCalculator from "../ScannerExpressionCalculator/ScannerexpressionCalculator";
import axios from "axios";
import BACKEND_URL from "../../../Backend_url";

const ScannerWorkpanel = ({ scannerResultDisplay }) => {
  const auth = useSelector((state) => state.auth);
  const [data, setData] = useState(null);
  const [scannerInfo, setScannerInfo] = useState(null);
  const [apiResults, setApiResults] = useState([]);
  const [binaryOperator, setBinaryOperator] = useState([]);
  const [apiResultsLength, setApiResultsLength] = useState(0);
  const [finalResult, setFinalResult] = useState(null);

  const scannerData = (s) => {
    setData(s);
  };

  const saveScanner = async () => {
    var tmp = data;
    tmp.publicChecked = document.getElementById("alert-public").checked;
    tmp.starttime = scannerInfo.starttime;
    tmp.endtime = scannerInfo.endtime;
    tmp.fnoLotSize = scannerInfo.fnoLotSize;
    tmp.segment = scannerInfo.segment;
    tmp.segment1a = scannerInfo.segment1a;
    tmp.comparison = scannerInfo.comparison;
    tmp.LHS = scannerInfo.LHS;
    tmp.RHS = scannerInfo.RHS;
    tmp.owner = auth.user._id;
    const res = await axios.post(
      `http://${BACKEND_URL}/api/scanner/setScanner`,
      {
        tmp,
      }
    );
    console.log(res);
  };

  const fetchScannerResults = async (conditions) => {
    let flag = true;
    let comparison;
    let LHS = [];
    let RHS = [];
    conditions.forEach((e) => {
      // console.log(e)
      console.log("ID", e.id, e.data);

      if (
        e.id === "<" ||
        e.id === ">" ||
        e.id === "cfab" ||
        e.id === "cfba" ||
        e.id === ">=" ||
        e.id === "<="
      ) {
        comparison = e.id;
        flag = false;
      } else if (flag) {
        if (e.data) LHS.push(e.data);
        else LHS.push(e.id);
      } else {
        if (e.data) RHS.push(e.data);
        else RHS.push(e.id);
      }
    });

    if (!document.getElementById("satisfy").checked) comparison = !comparison;

    let starttime =
      document.getElementById("scanner-start-time").childNodes[1].value;
    let endtime =
      document.getElementById("scanner-end-time").childNodes[1].value;
    let query = {
      starttime: starttime,
      endtime: endtime,
      fnoLotSize: document.getElementById("scanner-fno-lot-size").value,
      segment: document.getElementById("scanner-segment").value,
      segment1a: document.getElementById("scanner-segment-1a").value,
      comparison: comparison,
      LHS: LHS,
      RHS: RHS,
    };
    setScannerInfo(query);
    let res = await queryCalculator(query);
    if (res === undefined) res = [];

    let results = apiResults;
    results.push(res.data);
    console.log("result", results);
    setApiResults(results);
    setApiResultsLength(apiResults.length + 1);

    return res.data;
  };

  const submitScanner = async () => {
    let conditions = document.getElementById(
      "scanner-condition-indicators"
    ).childNodes;

    let binary_operation = [];
    let results = [];

    conditions.forEach(async (e) => {
      if (
        e.childNodes.length === 1 &&
        (e.childNodes[0].id === "or" ||
          e.childNodes[0].id === "and" ||
          e.childNodes[0].id === "substract")
      ) {
        binary_operation.push(e.childNodes[0].id);
        // setBinaryOperator(e.childNodes[0].id);
      } else {
        let tmp = await fetchScannerResults(e.childNodes);
      }
    });

    setApiResults(results);
    // setApiResultsLength(binary_operation.length);
    console.log("Binary", binary_operation);
    setBinaryOperator(binary_operation);
  };

  useEffect(() => {
    let conditions = document.getElementById(
      "scanner-condition-indicators"
    ).childNodes;

    console.log("Results", apiResults, apiResultsLength, conditions);
    if (apiResultsLength === 0) {
      console.log("Final Result", finalResult);
      setFinalResult(null);
      // setMiddleResult(null);
      setBinaryOperator(null);
      setApiResults([]);
      scannerResultDisplay(finalResult);
      return;
    }

    if (conditions.length === apiResultsLength) {
      console.log("febjfejf");
      calculateFinalResult();
      setApiResultsLength(0);
    }
  }, [apiResultsLength]);

  const calculateFinalResult = () => {
    console.log("calculator");
    let final_result = null;
    let binaryOperatorIndex = 0;
    apiResults.forEach((e) => {
      if (final_result === null) {
        final_result = e;
      } else {
        let newFinalResult = {};
        // let finalResultKeys = Object.keys(final_result);
        // let MiddleResultKeys = Object.keys(e);
        let stocks = new Set([...Object.keys(final_result), ...Object.keys(e)]);

        Array.from(stocks).forEach((e2) => {
          console.log("Stocks", e2);
          newFinalResult[e2] = binaryCalculator(
            final_result[e2] ? final_result[e2] : [],
            e[e2] ? e[e2] : [],
            binaryOperator[binaryOperatorIndex]
          );
        });

        binaryOperatorIndex = binaryOperatorIndex + 1;
        final_result = newFinalResult;
      }
    });

    setFinalResult(final_result);
  };

  const binaryCalculator = (array1, array2, binary_operator) => {
    console.log("binary", array1, array2, binary_operator);

    if (binary_operator === "or") {
      var combine = array1.concat(array2);
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
      console.log("Suhas", combine);
    } else if (binary_operator === "and") {
    } else if (binaryOperator === "substract") {
      // array1 - array2
    }
  };

  return (
    <div className="col-lg-12 scanner-workpanel-component">
      <WorkpanelHeading scannerData={scannerData} />
      <WorkpanelFilter />
      <button className="btn submit-btn" onClick={submitScanner}>
        Submit
      </button>
      <button className="btn submit-btn" onClick={saveScanner}>
        Save Scanner
      </button>
    </div>
  );
};

export default ScannerWorkpanel;

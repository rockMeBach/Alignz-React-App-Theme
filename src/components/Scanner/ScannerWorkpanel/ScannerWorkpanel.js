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

    // let conditions = document.getElementById(
    //   "scanner-condition-indicators"
    // ).childNodes;
    
    let flag = true;
    let comparison;
    let LHS = [];
    let RHS = [];
    conditions.forEach((e) => {
      console.log(e)
      console.log(e.id, e.data);

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

    console.log(res.data);

    let response = apiResults;
    response.push(res.data);
    setApiResults(response);

    // return res.data;
    // scannerResultDisplay(res.data);
  };

  const submitScanner = () => {

    let conditions = document.getElementById(
      "scanner-condition-indicators"
    ).childNodes

    let binary_operation = [];
    conditions.forEach(async e => {
      console.log(Array.from(e.childNodes));

      if(e.childNodes.length === 1 && (
          e.childNodes[0].id === 'or' ||
          e.childNodes[0].id === 'and' ||
          e.childNodes[0].id === 'substract'
        ))
        binary_operation.push(e.childNodes[0].id)
      else {

        fetchScannerResults(Array.from(e.childNodes))
      }
    });

    console.log("Binary", binary_operation)
  };

  useEffect(() => {
    
    console.log("Results", apiResults)
  }, [apiResults]);

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

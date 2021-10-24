import React, { useState } from "react";
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
  const fetchScannerResults = async () => {
    let conditions = document.getElementById(
      "scanner-condition-indicators"
    ).childNodes;
    let flag = true;
    let comparison;
    let LHS = [];
    let RHS = [];
    conditions.forEach((e) => {
      console.log(e.childNodes[1].id, e.childNodes[1].data);

      if (
        e.childNodes[1].id === "<" ||
        e.childNodes[1].id === ">" ||
        e.childNodes[1].id === "cfab" ||
        e.childNodes[1].id === "cfba" ||
        e.childNodes[1].id === ">=" ||
        e.childNodes[1].id === "<="
      ) {
        comparison = e.childNodes[1].id;
        flag = false;
      } else if (flag) {
        if (e.childNodes[1].data) LHS.push(e.childNodes[1].data);
        else LHS.push(e.childNodes[1].id);
      } else {
        if (e.childNodes[1].data) RHS.push(e.childNodes[1].data);
        else RHS.push(e.childNodes[1].id);
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

    console.log(res);

    scannerResultDisplay(res.data);
  };

  return (
    <div className="col-lg-12 scanner-workpanel-component">
      <WorkpanelHeading scannerData={scannerData} />
      <WorkpanelFilter />
      <button className="btn submit-btn" onClick={fetchScannerResults}>
        Submit
      </button>
      <button className="btn submit-btn" onClick={saveScanner}>
        Save Scanner
      </button>
    </div>
  );
};

export default ScannerWorkpanel;

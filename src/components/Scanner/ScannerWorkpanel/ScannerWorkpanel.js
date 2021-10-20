import React from "react";
import "./ScannerWorkpanel.scss";
import WorkpanelHeading from "../WorkpanelHeading/WorkpanelHeading";
import WorkpanelFilter from "../WorkpanelFilter/WorkpanelFilter";
import queryCalculator from "../ScannerExpressionCalculator/ScannerexpressionCalculator";

const ScannerWorkpanel = ({ scannerResultDisplay }) => {
  
  const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(" ");

    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  };

  const fetchScannerResults = async () => {

    let conditions = document.getElementById(
      "scanner-condition-indicators"
    ).childNodes;

    console.log("Hi", document.getElementById('alert-public').checked);

    let flag = true;
    let comparison;
    let LHS = [];
    let RHS = [];
    conditions.forEach((e) => {
      console.log(e.childNodes[1].id, e.childNodes[1].data);
      if (e.childNodes[1].id === "<" || e.childNodes[1].id === ">") {
        comparison = e.childNodes[1].id;
        flag = false;
      } else if (flag) LHS.push(e.childNodes[1].data);
      else RHS.push(e.childNodes[1].data);
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

    let res = await queryCalculator(query);

    if (res === undefined) res = [];

    console.log(res)
    scannerResultDisplay(res.data);
  };

  return (
    <div className="col-lg-12 scanner-workpanel-component">
      <WorkpanelHeading />
      <WorkpanelFilter />

      <button className="btn submit-btn" onClick={fetchScannerResults}>
        Submit
      </button>
    </div>
  );
};

export default ScannerWorkpanel;

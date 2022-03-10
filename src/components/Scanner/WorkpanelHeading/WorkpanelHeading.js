import React, { useEffect, useState } from "react";
import "./WorkpanelHeading.scss";
import "bootstrap/dist/css/bootstrap.css";

const WorkpanelHeading = ({ scannerData, scannerDetails }) => {
  const [data, setData] = useState({
    name: "",
    description: "",
    publicChecked: "",
    alerts: ""
  });
  const { name, description, publicChecked, alerts } = data;

  useEffect(()=>{
    if(scannerDetails!==undefined && scannerDetails!==null){
      let temp = {
        name: scannerDetails.name,
        description: scannerDetails.description,
        publicChecked: scannerDetails.publicChecked,
        alerts: scannerDetails.alerts
      };
      setData(temp);
      scannerData(temp);
    }
  }, []);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    let temp = { ...data, [name]: value };
    setData(temp);
    scannerData(temp);
  };

  const handleSwitches = (e, value) => {
    const { name } = e.target;
    let temp = { ...data, [name]: value };
    setData(temp);
    scannerData(temp);
  };

  return (
    <div className="scanner-workpanel-heading">
      <div className="scanner-workpanel-header">
        <div className="scanner-name">
          <strong>Scanner Name</strong>
          <form id="navbar-search" className="navbar-form search-form">
            <input
              name="name"
              className="form-control"
              placeholder="Scanner Name"
              value={name}
              type="text"
              onChange={handleChangeInput}
            />
          </form>
        </div>

        <div className="scanner-description">
          <strong>Description</strong>
          <form id="navbar-search" className="navbar-form search-form">
            <input
              name="description"
              className="form-control"
              placeholder="Description"
              type="text"
              value={description}
              onChange={handleChangeInput}
            />
          </form>
        </div>

        <div className="scanner-header-options form">
          <div className="scanner-alert-button">
            <input
              type="radio"
              id="alert-public"
              name="publicChecked"
              value="Public"
              checked={publicChecked}
              onClick={(e)=>{handleSwitches(e, true)}}
            />
            <label for="alert-public">Public</label>
          </div>
          <div className="scanner-alert-button">
            <input
              type="radio"
              id="alert-private"
              name="publicChecked"
              value="Private"
              checked={!publicChecked}
              onClick={(e)=>{handleSwitches(e, false)}}
            />
            <label for="alert-private">Private</label>
          </div>

          <div className="form-check form-switch">
            <input
              name="alerts"
              className="form-check-input"
              type="checkbox"
              id="alert-switch"
              checked={alerts}
              onClick={(e)=>{handleSwitches(e, !alerts)}}
            />
            <label className="form-check-label" for="alert-switch">
              Alerts
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkpanelHeading;

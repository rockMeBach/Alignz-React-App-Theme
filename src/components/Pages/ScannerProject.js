import React, { useEffect, useState } from "react";
import "./ProjectListTable.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import BACKEND_URL from "../../Backend_url";

const Toggle = styled.button`
  width: 50px;
  height: 30px;
  position: relative;
  cursor: pointer;
  border-radius: 25px;
  outline: none;
  background-color: ${(props) => (props.on ? "#4cd137" : "red")};
  border: 3px solid white;

  &::after {
    content: "";
    position: absolute;
    top: 1.5px;
    will-change: transform;
    transform: translate(${(props) => (props.on ? -24.5 : -44)}px);
    transition: transform 0.2s ease-out;
    width: 20px;
    height: 20px;
    background: white;
    border: 2px solid #7f8fa6;
    outline: none;
    border-radius: 50%;
    left: 45px;
  }
`;

const deleteScanner = (scannerId) => {
  axios
  .post(`http://${BACKEND_URL}/api/scanner/deleteScanner`, {scannerId: scannerId})
  .then((res) => {
  })
  .catch((err) => console.log(err));
}

const updateAlerts = (scannerId, tmp) => {
  const res = axios.post(
    `http://${BACKEND_URL}/api/scanner/updateScanner`,
    {
      scannerId,
      tmp,
    }
  );
}

const ScannerProject = ({settings, index, scanners, setScanners}) => {
  const [on, toggle] = useState(settings.alerts);

  return (
    <tr style={{ background: "#F8F9FA 0% 0% no-repeat padding-box" }}>
        <td className="project-list-table-row">{index+1}</td>
        <td className="project-list-table-row project-list-table-scanner-name">
          <Link to={{
            pathname: "/scanners/scanner/",
            state: settings
          }}>{settings.name}</Link>
        </td>
        <td className="project-list-table-row">
        {settings.description}
        </td>
        <td className="project-list-table-row">{settings.publicChecked?"Public":"Private"}</td>
        <td className="project-list-table-row">{settings.date}</td>
        <td className="project-list-table-row">
        <Link to={{
          pathname: "/scanners/scanner/",
          state: settings
        }}>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pencil-square"
              viewBox="0 0 16 16"
              style={{ margin: "5px" }}
          >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
              fill-rule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
          </svg>
        </Link>

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-trash"
            viewBox="0 0 16 16"
            style={{ margin: "5px", cursor:"pointer"}}
            onClick={()=>{
              if(confirm("Are you sure you want to delete this scanner?")){
                deleteScanner(settings._id)
                let tmpArr = scanners;
                tmpArr = tmpArr.filter(e=>{return e._id!=settings._id});
                setScanners(tmpArr)
              }
            }}
        >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path
            fill-rule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
        </svg>

        </td>
        <td className="project-list-table-row">
        <div className="form-check form-switch">
            <input
            className="form-check-input scanner-list-alert-toggle"
            type="checkbox"
            id="alert-switch"
            checked={on}
            onClick={()=>{
                toggle(!on);
                settings.alerts = !settings.alerts;
                console.log(settings);
                updateAlerts(settings._id, settings);
            }}
            />
        </div>
        </td>
    </tr>
  );
};
export default ScannerProject;

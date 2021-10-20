import React, { useState } from "react";
import "./ProjectListTable.css";
import styled from "styled-components";

const Toggle = styled.button`
  width: 50px;
  height: 30px;
  position: relative;
  cursor: pointer;
  border-radius: 25px;
  outline: none;
  background-color: ${(props) => (props.on ? "#4cd137" : "#353b48")};
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

const ProjectsListTable = () => {
  const [on, toggle] = useState(false);
  return (
    <div className="table-responsive">
      <table className="table m-b-0 table-hover">
        <thead>
          <tr style={{ background: "white" }}>
            <th className="project-list-table-heading">Sr. No.</th>
            <th className="project-list-table-heading">Scanner Name</th>
            <th className="project-list-table-heading">Description</th>
            <th className="project-list-table-heading">Type</th>
            <th className="project-list-table-heading">Creation Date</th>
            <th className="project-list-table-heading">Action</th>
            <th className="project-list-table-heading">Alerts</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ background: "#F8F9FA 0% 0% no-repeat padding-box" }}>
            <td className="project-list-table-row">1</td>
            <td className="project-list-table-row project-list-table-scanner-name">
              Intraday seeing in the last 15 days
            </td>
            <td className="project-list-table-row">
              lorem isoum sdojicf edcfv cd fv 3ecv 4rc fvtg
            </td>
            <td className="project-list-table-row">Public</td>
            <td className="project-list-table-row">25/10/12</td>
            <td className="project-list-table-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pencil-square"
                viewBox="0 0 16 16"
                style={{ margin: "5px" }}
                width="25"
                height="20"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash"
                viewBox="0 0 16 16"
                style={{ margin: "5px" }}
                width="25"
                height="20"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path
                  fill-rule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
            </td>
            <td className="project-list-table-row">
              <Toggle on={on} onClick={() => toggle(!on)} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default ProjectsListTable;

import React, { useEffect, useState } from "react";
import "./ProjectListTable.css";
import ScannerProject from "./ScannerProject";

const ProjectsListTable = ({scanners, setScanners}) => {
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
          {scanners.map((e, i)=>
            <ScannerProject settings={e} index={i} scanners={scanners} setScanners={setScanners} />
          )}
        </tbody>
      </table>
    </div>
  );
};
export default ProjectsListTable;

import React from "react";
import { ProgressBar } from "react-bootstrap";

const ProjectsListTable = () => {
  return (
    <div className="table-responsive">
      <table className="table m-b-0 table-hover">
        <thead className="thead-light">
          <tr>
            <th>Status</th>
            <th>Project</th>
            <th>Prograss</th>
            <th>Team</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};
export default ProjectsListTable;

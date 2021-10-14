import React from "react";

const ProjectsListTable = () => {
  return (
    <div className="table-responsive">
      <table className="table m-b-0 table-hover">
        <thead>
          <tr style={{ background: "white" }}>
            <th
              style={{
                border: "none",

                fontSize: "normal normal medium 24px/28px Ubuntu;",
                color: "#000",
                fontWeight: "600",
              }}
            >
              Sr. No.
            </th>
            <th
              style={{
                border: "none",

                fontSize: "normal normal medium 24px/28px Ubuntu;",
                color: "#000",
                fontWeight: "600",
              }}
            >
              Scanner Name
            </th>
            <th
              style={{
                border: "none",

                fontSize: "normal normal medium 24px/28px Ubuntu;",
                color: "#000",
                fontWeight: "600",
              }}
            >
              Description
            </th>
            <th
              style={{
                border: "none",

                fontSize: "normal normal medium 24px/28px Ubuntu;",
                color: "#000",
                fontWeight: "600",
              }}
            >
              Type
            </th>
            <th
              style={{
                border: "none",

                fontSize: "normal normal medium 24px/28px Ubuntu;",
                color: "#000",
                fontWeight: "600",
              }}
            >
              Creation Date
            </th>
            <th
              style={{
                border: "none",

                fontSize: "normal normal medium 24px/28px Ubuntu;",
                color: "#000",
                fontWeight: "600",
              }}
            >
              Action
            </th>
            <th
              style={{
                border: "none",

                fontSize: "normal normal medium 24px/28px Ubuntu;",
                color: "#000",
                fontWeight: "600",
              }}
            >
              Alerts
            </th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};
export default ProjectsListTable;

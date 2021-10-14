import React from "react";

import DownloadIcon from "../../assets/images/download.svg";
import ProjectsListTable from "../../components/Pages/ProjectsListTable";
const ProjectsList = () => {
  return (
    <div
      style={{ flex: 1 }}
      onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}
    >
      <div>
        <div className="container">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-5 col-md-6 col-sm-12">
                <h2>Scanners</h2>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="dashboard">
                      <i className="icon-home"></i>
                    </a>
                  </li>
                  <li className="breadcrumb-item active">Scanners</li>
                </ul>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 text-right"></div>
              <div className="col-lg-3 col-md-2 col-sm-12 text-right">
                <div className="download-historical-scanner-results">
                  <img src={DownloadIcon} alt="" />
                  <span className="scanner-extension-span">
                    Download Scanner Example
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="row clearfix mt-5 pt-5">
            <div className="col-lg-12 col-md-12">
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div
                    style={{
                      marginBottom: "10px",
                      fontSize: "25px",
                      color: "#e27498",
                      fontWeight: "500",
                      paddingBottom: "5px",
                      width: "max-content",
                      borderBottom: "2px solid #e27498",
                    }}
                  >
                    My Scanner
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <a href="/scanners/scanner">
                    <div className="add-scanner" style={{ float: "right" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-plus-lg"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                          fill="#000"
                        />
                      </svg>
                      <span className="scanner-extension-span">Add New</span>
                    </div>
                  </a>
                </div>
              </div>
              <div className="card" style={{ borderRadius: "16px" }}>
                <div
                  className="body project_report"
                  style={{ padding: "5px " }}
                >
                  <ProjectsListTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;

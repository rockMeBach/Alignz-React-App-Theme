import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import BACKEND_URL from "../../Backend_url";

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

const FundamentalScanner = () => {
  const [on, toggle] = useState(false);

  const [scanners, setScanners] = useState([]);

  useEffect(()=>{
    axios
        .get(`http://${BACKEND_URL}/api/scanner/getAllScanners`)
        .then((res) => {
          setScanners(res.data.filter((scanner)=>{
            return scanner.categories.indexOf("fundamental")!==-1 && scanner.publicChecked;
          }));
        })
        .catch((err) => console.log(err));
  }, []);
  
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
                  <li className="breadcrumb-item active">
                    <a
                      href="/scanners"
                      style={{ textDecoration: "none", color: "gray" }}
                    >
                      Scanners
                    </a>
                  </li>
                  <li className="breadcrumb-item active">
                    Fundamental Scanners
                  </li>
                </ul>
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
                    }}
                  >
                    Fundamental Scanners
                  </div>
                </div>
              </div>
              <div className="card" style={{ borderRadius: "16px" }}>
                <div
                  className="body project_report"
                  style={{ padding: "5px " }}
                >
                  <div className="table-responsive">
                    <table className="table m-b-0 table-hover">
                      <thead>
                        <tr style={{ background: "white" }}>
                          <th className="project-list-table-heading">
                            Sr. No.
                          </th>
                          <th className="project-list-table-heading">
                            Scanner Name
                          </th>
                          <th className="project-list-table-heading">
                            Description
                          </th>
                          <th className="project-list-table-heading">
                            Number of Subscriber
                          </th>

                          <th className="project-list-table-heading">Action</th>
                          <th className="project-list-table-heading">Alerts</th>
                        </tr>
                      </thead>
                      {scanners.map((scanner, index)=>
                        <tbody>
                          <tr
                            style={{
                              background: "#F8F9FA 0% 0% no-repeat padding-box",
                            }}
                          >
                            <td className="project-list-table-row">{index+1}</td>
                            <td className="project-list-table-row project-list-table-scanner-name">
                              {scanner.name}
                            </td>
                            <td className="project-list-table-row">
                              {scanner.description}
                            </td>
                            <td className="project-list-table-row">10000</td>
                            <td
                              className="project-list-table-row"
                              style={{ color: "#E27498", fontWeight: "bold" }}
                            >
                              subscribed
                            </td>

                            <td className="project-list-table-row">
                              <Toggle on={on} onClick={() => toggle(!on)} />
                            </td>
                          </tr>
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FundamentalScanner;

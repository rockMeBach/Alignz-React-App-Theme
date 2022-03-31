import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import BACKEND_URL from "../../Backend_url";

import DownloadIcon from "../../assets/images/download.svg";
import ProjectsListTable from "../../components/Pages/ProjectsListTable";

import { Link } from "react-router-dom";

const ProjectsList = () => {
  
  const auth = useSelector((state) => state.auth);
  const [scanners, setScanners] = useState([]);
  const [fundamental, setFundamental] = useState([]);
  const [topLoved, setTopLoved] = useState([]);
  const [candlestickPatterns, setCandlestickPatterns] = useState([]);
  const [rangeBreakouts, setRangeBreakouts] = useState([]);
  const [bullish, setBullish] = useState([]);
  const [bearish, setBearish] = useState([]);

  useEffect(()=>{
    if(auth.user._id!==undefined && auth.user._id!==""){
      axios
        .post(`http://${BACKEND_URL}/api/scanner/getScanners`, {id: auth.user._id})
        .then((res) => {
          setScanners(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [auth]);

  useEffect(()=>{
    axios
        .get(`http://${BACKEND_URL}/api/scanner/getAllScanners`)
        .then((res) => {
          categorizeScanners(res.data);
        })
        .catch((err) => console.log(err));
  }, []);
  
  const categorizeScanners = (data) => {
    if(data.length>0){
      data.filter(e => {return e.publicChecked;}).forEach(element => {
        if(element.categories!==undefined){
          if(element.categories.indexOf("fundamental")!==-1){
            let tempArr = fundamental;
            tempArr.push(element);
            setFundamental(tempArr);
          }
          if(element.categories.indexOf("top-loved")!==-1){
            let tempArr = topLoved;
            tempArr.push(element);
            setTopLoved(tempArr);
          }
          if(element.categories.indexOf("candlestick-patterns-scan")!==-1){
            let tempArr = candlestickPatterns;
            tempArr.push(element);
            setCandlestickPatterns(tempArr);
          }
          if(element.categories.indexOf("range-breakouts")!==-1){
            let tempArr = rangeBreakouts;
            tempArr.push(element);
            setRangeBreakouts(tempArr);
          }
          if(element.categories.indexOf("bullish")!==-1){
            let tempArr = bullish;
            tempArr.push(element);
            setBullish(tempArr);
          }
          if(element.categories.indexOf("bearish")!==-1){
            let tempArr = bearish;
            tempArr.push(element);
            setBearish(tempArr);
          }
        }
      });
    }
  }

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
                  <ProjectsListTable scanners={scanners.reverse()} setScanners={setScanners} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container" id="searchresults"></div> */}
      <div className="container" id="allresults">
        <div className="row clearfix mt-5">
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
              Public Scanners
            </div>
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-lg-6 col-md-6">
            <div
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                width: "max-content",
              }}
            >
              Search Scanners
            </div>
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-lg-6 col-md-6">
            <div
              style={{
                fontSize: "10px",
                width: "max-content",
              }}
            >
              Search over 150,000+ scans or create your own customized screener.
            </div>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-12">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Search"
                id="searchName"
              />
              <div class="input-group-append">
                <button
                  className="btn"
                  type="button"
                  style={{
                    backgroundColor: "#E27498",
                    color: "white",
                    fontWeight: "bold",
                    width: "100px",
                  }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-4 cool-md-6 col-sm-12 mt-3">
            <div className="card" style={{ borderRadius: "15px" }}>
              <ul
                className="pricing body"
                style={{
                  fontSize: "15px",
                  textAlign: "left",
                  padding: "0px",
                }}
              >
                <li>
                  <h2
                    style={{
                      fontSize: "25px",
                      fontWeight: "bold",
                      color: "#E27498",
                      paddingLeft: "20px",
                    }}
                  >
                    Fundamental Scanners
                  </h2>
                </li>
                {fundamental.length<=0 &&
                <li
                style={{ background: "#F8F9FA", paddingLeft: "35px" }}
                className="wcard"
                >
                  No scanners here
                </li>}
                {
                  fundamental.length>0 && fundamental.map((e, i)=>
                  (i<7)?
                  <Link to={{
                    pathname: "/scanners/scanner/",
                    state: e
                  }}>
                  <li
                  style={{ background: i%2==0?"#F8F9FA":"", paddingLeft: "35px" }}
                  className="wcard"
                  >
                    {e.name}
                  </li>
                  </Link>:"")
                }
                <a
                  href="/scanners/fundamental-scanner"
                  style={{ textDecoration: "none" }}
                >
                  <li
                    style={{
                      padding: "13px",
                      paddingLeft: "35px",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    More
                  </li>
                </a>
              </ul>
            </div>
          </div>

          <div className="col-lg-4 cool-md-6 col-sm-12 mt-3">
            <div className="card" style={{ borderRadius: "15px" }}>
              <ul
                className="pricing body"
                style={{
                  fontSize: "15px",
                  textAlign: "left",
                  padding: "0px",
                }}
              >
                <li>
                  <h2
                    style={{
                      fontSize: "25px",
                      fontWeight: "bold",
                      color: "#E27498",
                      paddingLeft: "20px",
                    }}
                  >
                    Top Loved
                  </h2>
                </li>
                {topLoved.length<=0 && 
                <li
                style={{ background: "#F8F9FA", paddingLeft: "35px" }}
                className="wcard"
                >
                  No scanners here
                </li>}
                {
                  topLoved.map((e, i)=>
                  (i<7)?
                  <Link to={{
                    pathname: "/scanners/scanner/",
                    state: e
                  }}>
                  <li
                  style={{ background: i%2==0?"#F8F9FA":"", paddingLeft: "35px" }}
                  className="wcard"
                  >
                    {e.name}
                  </li>
                  </Link>:"")
                }
                <a
                  href="/scanners/top-loved-scanner"
                  style={{ textDecoration: "none" }}
                >
                  <li
                    style={{
                      padding: "13px",
                      paddingLeft: "35px",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    More
                  </li>
                </a>
              </ul>
            </div>
          </div>

          <div className="col-lg-4 cool-md-6 col-sm-12 mt-3">
            <div className="card" style={{ borderRadius: "15px" }}>
              <ul
                className="pricing body"
                style={{
                  fontSize: "15px",
                  textAlign: "left",
                  padding: "0px",
                }}
              >
                <li>
                  <h2
                    style={{
                      fontSize: "25px",
                      fontWeight: "bold",
                      color: "#E27498",
                      paddingLeft: "20px",
                    }}
                  >
                    Candlestick Patterns Scan
                  </h2>
                </li>

                {candlestickPatterns.length<=0 &&
                <li
                style={{ background: "#F8F9FA", paddingLeft: "35px" }}
                className="wcard"
                >
                  No scanners here
                </li>}
                {
                  candlestickPatterns.map((e, i)=>
                  (i<7)?
                  <Link to={{
                    pathname: "/scanners/scanner/",
                    state: e
                  }}>
                  <li
                  style={{ background: i%2==0?"#F8F9FA":"", paddingLeft: "35px" }}
                  className="wcard"
                  >
                    {e.name}
                  </li>
                  </Link>:"")
                }

                <a
                  href="/scanners/candlestick-scanner"
                  style={{ textDecoration: "none" }}
                >
                  <li
                    style={{
                      padding: "13px",
                      paddingLeft: "35px",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    More
                  </li>
                </a>
              </ul>
            </div>
          </div>

          <div className="col-lg-4 cool-md-6 col-sm-12 mt-3">
            <div className="card" style={{ borderRadius: "15px" }}>
              <ul
                className="pricing body"
                style={{
                  fontSize: "15px",
                  textAlign: "left",
                  padding: "0px",
                }}
              >
                <li>
                  <h2
                    style={{
                      fontSize: "25px",
                      fontWeight: "bold",
                      color: "#E27498",
                      paddingLeft: "20px",
                    }}
                  >
                    Range Breakouts Scan
                  </h2>
                </li>
                
                {rangeBreakouts.length<=0 &&
                <li
                style={{ background: "#F8F9FA", paddingLeft: "35px" }}
                className="wcard"
                >
                  No scanners here
                </li>}
                {
                  rangeBreakouts.map((e, i)=>
                  (i<7)?
                  <Link to={{
                    pathname: "/scanners/scanner/",
                    state: e
                  }}>
                  <li
                  style={{ background: i%2==0?"#F8F9FA":"", paddingLeft: "35px" }}
                  className="wcard"
                  >
                    {e.name}
                  </li>
                  </Link>:"")
                }

              </ul>
            </div>
          </div>

          <div className="col-lg-4 cool-md-6 col-sm-12 mt-3">
            <div className="card" style={{ borderRadius: "15px" }}>
              <ul
                className="pricing body"
                style={{
                  fontSize: "15px",
                  textAlign: "left",
                  padding: "0px",
                }}
              >
                <li>
                  <h2
                    style={{
                      fontSize: "25px",
                      fontWeight: "bold",
                      color: "#E27498",
                      paddingLeft: "20px",
                    }}
                  >
                    Bullish Scan
                  </h2>
                </li>
                
                {bullish.length<=0 &&
                <li
                style={{ background: "#F8F9FA", paddingLeft: "35px" }}
                className="wcard"
                >
                  No scanners here
                </li>}
                {
                  bullish.map((e, i)=>
                  (i<7)?
                  <Link to={{
                    pathname: "/scanners/scanner/",
                    state: e
                  }}>
                  <li
                  style={{ background: i%2==0?"#F8F9FA":"", paddingLeft: "35px" }}
                  className="wcard"
                  >
                    {e.name}
                  </li>
                  </Link>:"")
                }

              </ul>
            </div>
          </div>

          <div className="col-lg-4 cool-md-6 col-sm-12 mt-3">
            <div className="card" style={{ borderRadius: "15px" }}>
              <ul
                className="pricing body"
                style={{
                  fontSize: "15px",
                  textAlign: "left",
                  padding: "0px",
                }}
              >
                <li>
                  <h2
                    style={{
                      fontSize: "25px",
                      fontWeight: "bold",
                      color: "#E27498",
                      paddingLeft: "20px",
                    }}
                  >
                    Bearish Scan
                  </h2>
                </li>
                
                {bearish.length<=0 &&
                <li
                style={{ background: "#F8F9FA", paddingLeft: "35px" }}
                className="wcard"
                >
                  No scanners here
                </li>}
                {
                  bearish.map((e, i)=>
                  (i<7)?
                  <Link to={{
                    pathname: "/scanners/scanner/",
                    state: e
                  }}>
                  <li
                  style={{ background: i%2==0?"#F8F9FA":"", paddingLeft: "35px" }}
                  className="wcard"
                  >
                    {e.name}
                  </li>
                  </Link>:"")
                }

              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;

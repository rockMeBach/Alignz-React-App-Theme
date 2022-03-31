import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import PageHeader from "../../components/PageHeader";
import Plane from "../../assets/images/plane.png";
import SpaceShip from "../../assets/images/space-ship.png";
import PaperPlane from "../../assets/images/paper-plane.png";
import BACKEND_URL from "../../Backend_url";
import Subscription from "../../components/Pages/Subscription";
import axios from "axios";

const Pricing = () => {
  const auth = useSelector((state) => state.auth);
  const [tier0, setTier0] = useState([]);
  const [tier1, setTier1] = useState([]);
  const [tier2, setTier2] = useState([]);
  const [tier3, setTier3] = useState([]);
  const [subvalue, setSubvalue] = useState(0);
  const name = auth.user.name;
  const email = auth.user.email;
  const tier = auth.user.tier;

  const leftTextStyle = {
    fontSize: "12px"
  };

  const rightTextStyle = {
    fontWeight: "500",
    color: "rgb(226, 116, 152)",
    fontSize: "12px",
  };

  const handleScroll = () => {
    window.scroll({
      top: 1000,
      left: 0,
      behavior: "smooth",
    });
  };

  let res;

  useEffect(async () => {
    res = await axios.get(`http://${BACKEND_URL}/api/payment/paymentDatabase`);
    setTier0(res.data[0]);
    setTier1(res.data[1]);
    setTier2(res.data[2]);
    setTier3(res.data[3]);
  }, []);

  useEffect(() => {
    handleScroll();
  }, [subvalue]);

  return (
    <div
      style={{ flex: 1, fontSize: "15px"}}
      onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}
    >
      <div>
        <div className="container">
          <PageHeader
            HeaderText="Pricing"
            Breadcrumb={[{ name: "Pricing", navigate: "" }]}
          />
          <div className="row clearfix">
            {/*FREE PRICING PLAN*/}
            <div className="col-lg-3 col-md-12">
              <div className="card pricing2">
                <div className="body" style={{padding:"0"}}>
                  <div className="pricing-plan">
                    <img alt="" className="pricing-img" src={PaperPlane} />
                    <h2 className="pricing-header">FREE</h2>
                    <ul className="pricing-features">
                      <div className="container-fluid">
                        <div className="row ">
                          <div className="col-6 text-left" style={leftTextStyle}>Historical Scans</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            Results from {tier0.scans_start_year}
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Historical Scans</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            Max {tier0.scans_max_results} results
                          </div>

                          <div className="col-6 text-left" style={leftTextStyle}>Live Scanner Email Alerts</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            {tier0.live_scanner_emails}
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Live Scanner Telegram Alerts</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            {tier0.live_scanner_telegrams}
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Historical Charts Equities</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            Available from {tier0.charts_equities}
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Historical Charts FnO</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            Available from {tier0.charts_fno}
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Historical Charts Crypto</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            Yes
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Options Analyzer</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            {tier0.options_analyzer==="true"?"Yes":"No"}
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Virtual Trading</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            Yes
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Backtests</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            {tier0.backtests}
                          </div>
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/*BASIC PRICING PLAN*/}
            <div className="col-lg-3 col-md-12">
              <div className="card pricing2">
                <div className="body" style={{padding:"0"}}>
                  <div className="pricing-plan">
                    <img alt="" className="pricing-img" src={PaperPlane} />
                    <h2 className="pricing-header">BASIC</h2>
                    <ul className="pricing-features">
                      <div className="container-fluid">
                        <div className="row ">
                          <div className="col-6 text-left" style={leftTextStyle}>Historical Scans</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            Results from {tier1.scans_start_year}
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Historical Scans</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            Max {tier1.scans_max_results} results
                          </div>

                          <div className="col-6 text-left" style={leftTextStyle}>Live Scanner Email Alerts</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            {tier1.live_scanner_emails}
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Live Scanner Telegram Alerts</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            {tier1.live_scanner_telegrams}
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Historical Charts Equities</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            Available from {tier1.charts_equities}
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Historical Charts FnO</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            Available from {tier1.charts_fno}
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Historical Charts Crypto</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            Yes
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Options Analyzer</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            {tier1.options_analyzer==="true"?"Yes":"No"}
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Virtual Trading</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            Yes
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Backtests</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            {tier1.backtests}
                          </div>
                        </div>
                      </div>
                    </ul>
                    <span className="pricing-price">Rs. {tier1.cost}</span>
                    {tier === 1 ? (
                      <button className="btn btn-success disable">
                        Already Subscribed
                      </button>
                    ) : (
                      <a
                        className="btn"
                        style={{
                          background: "#E27498",
                          color: "white",
                          fontWeight: "bold",
                        }}
                        onClick={() =>
                          setSubvalue(1)
                        }
                        href
                      >
                        Buy Now
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/*ADVANCED PRICING PLAN*/}
            <div className="col-lg-3 col-md-12">
              <div className="card pricing2">
                <div className="body" style={{padding:"0"}}>
                  <div className="pricing-plan">
                    <img alt="" className="pricing-img" src={Plane} />
                    <h2 className="pricing-header">ADVANCED</h2>
                    <ul className="pricing-features">
                      <div className="container-fluid">
                        <div className="row ">
                          <div className="col-6 text-left" style={leftTextStyle}>Historical Scans</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            Results from {tier2.scans_start_year}
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Historical Scans</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            Max {tier2.scans_max_results} results
                          </div>

                          <div className="col-6 text-left" style={leftTextStyle}>Live Scanner Email Alerts</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            {tier2.live_scanner_emails}
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Live Scanner Telegram Alerts</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            {tier2.live_scanner_telegrams}
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Historical Charts Equities</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            Available from {tier2.charts_equities}
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Historical Charts FnO</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            Available from {tier2.charts_fno}
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Historical Charts Crypto</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            Yes
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Options Analyzer</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            {tier2.options_analyzer==="true"?"Yes":"No"}
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Virtual Trading</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            Yes
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Backtests</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            {tier2.backtests}
                          </div>
                        </div>
                      </div>
                    </ul>
                    <span className="pricing-price">Rs. {tier2.cost}</span>
                    {tier === 2 ? (
                      <button className="btn btn-success disable">
                        Already Subscribed
                      </button>
                    ) : (
                      <a
                        className="btn"
                        style={{
                          background: "#E27498",
                          color: "white",
                          fontWeight: "bold",
                        }}
                        onClick={() =>
                          setSubvalue(2)
                        }
                        href
                      >
                        Buy Now
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/*PRO PRICING PLAN*/}
            <div className="col-lg-3 col-md-12">
              <div className="card pricing2">
                <div className="body" style={{padding:"0"}}>
                  <div className="pricing-plan">
                    <img alt="" className="pricing-img" src={SpaceShip} />
                    <h2 className="pricing-header">PRO</h2>
                    <ul className="pricing-features">
                      <div className="container-fluid">
                        <div className="row ">
                          <div className="col-6 text-left" style={leftTextStyle}>Historical Scans</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            Results from {tier3.scans_start_year}
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Historical Scans</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            Max {tier3.scans_max_results} results
                          </div>

                          <div className="col-6 text-left" style={leftTextStyle}>Live Scanner Email Alerts</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            {tier3.live_scanner_emails}
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Live Scanner Telegram Alerts</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            {tier3.live_scanner_telegrams}
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Historical Charts Equities</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            Available from {tier3.charts_equities}
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Historical Charts FnO</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            Available from {tier3.charts_fno}
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Historical Charts Crypto</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            Yes
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Options Analyzer</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            {tier3.options_analyzer==="true"?"Yes":"No"}
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Virtual Trading</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            Yes
                          </div>
                          <div className="col-6 text-left" style={leftTextStyle}>Backtests</div>
                          <div
                            className="col-6 text-right"
                            style={rightTextStyle}
                          >
                            {tier3.backtests}
                          </div>
                        </div>
                      </div>
                    </ul>
                    <span className="pricing-price">Rs. {tier3.cost}</span>
                    {tier === 3 ? (
                      <button className="btn btn-success disable">
                        Already Subscribed
                      </button>
                    ) : (
                      <a
                        className="btn"
                        style={{
                          background: "#E27498",
                          color: "white",
                          fontWeight: "bold",
                        }}
                        onClick={() =>
                          setSubvalue(3)
                        }
                        href
                      >
                        Buy Now
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/*PLANS END*/}
          </div>
        </div>

        <div className="container">
          <div className="row clearfix">
            {subvalue === 1 && (
              <div
                className="col-12"
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.125)",
                  borderRadius: "16px",
                  opacity: "1",
                  marginBottom: "50px",
                  paddingBottom: "40px",
                }}
              >
                <Subscription tier={tier1} email={email} name={name} />
              </div>
            )}
            {subvalue === 2 && (
              <div
                className="col-12"
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.125)",
                  borderRadius: "16px",
                  opacity: "1",
                  marginBottom: "50px",
                  paddingBottom: "40px",
                }}
              >
                <Subscription tier={tier2} email={email} name={name} />
              </div>
            )}
            {subvalue === 3 && (
              <div
                className="col-12"
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.125)",
                  borderRadius: "16px",
                  opacity: "1",
                  marginBottom: "50px",
                  paddingBottom: "40px",
                }}
              >
                <Subscription tier={tier3} email={email} name={name} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

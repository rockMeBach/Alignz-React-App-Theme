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
  const [tier1, setTier1] = useState([]);
  const [tier2, setTier2] = useState([]);
  const [tier3, setTier3] = useState([]);
  const [subvalue, setSubvalue] = useState(1);
  const name = auth.user.name;
  const email = auth.user.email;
  const tier = auth.user.tier;

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
    setTier1(res.data[0]);
    setTier2(res.data[1]);
    setTier3(res.data[2]);
  }, []);

  useEffect(() => {
    handleScroll();
  }, [subvalue]);

  return (
    <div
      style={{ flex: 1 }}
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
            <div className="col-lg-4 col-md-12">
              <div className="card pricing2">
                <div className="body">
                  <div className="pricing-plan">
                    <img alt="" className="pricing-img" src={PaperPlane} />
                    <h2 className="pricing-header">Basic</h2>
                    <ul className="pricing-features">
                      <div className="container-fluid">
                        <div className="row ">
                          <div className="col-6 text-left">Live Scans</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            5 mins delay
                          </div>
                          <div className="col-6 text-left">Historic Scans</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            upto {tier1.scans}
                          </div>

                          <div className="col-6 text-left">Virtual Trading</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            {tier1.trades} per month
                          </div>
                          <div className="col-6 text-left">Historic Charts</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            {tier1.charts} old
                          </div>
                          <div className="col-6 text-left">Backtests</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            {tier1.backtest} per month
                          </div>
                          <div className="col-6 text-left">Emails Alerts</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            {tier1.email} per month
                          </div>
                          <div className="col-6 text-left">Whatsapp Alerts</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            {tier1.whatsapp} per month
                          </div>
                          <div className="col-6 text-left">Telegram Alerts</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            {tier1.telegram} per month
                          </div>
                        </div>
                      </div>
                    </ul>
                    <span className="pricing-price">FREE</span>
                    <a className="btn disable" style={{ color: "white" }}>
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="card pricing2">
                <div className="body">
                  <div className="pricing-plan">
                    <img alt="" className="pricing-img" src={Plane} />
                    <h2 className="pricing-header">Advanced</h2>
                    <ul className="pricing-features">
                      <div className="container-fluid">
                        <div className="row ">
                          <div className="col-6 text-left">Live Scans</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            No Delay
                          </div>
                          <div className="col-6 text-left">Historic Scans</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            upto {tier2.scans}
                          </div>

                          <div className="col-6 text-left">Virtual Trading</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            {tier2.trades} per month
                          </div>
                          <div className="col-6 text-left">Historic Charts</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            {tier2.charts} old
                          </div>
                          <div className="col-6 text-left">Backtests</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            {tier2.backtest} per month
                          </div>
                          <div className="col-6 text-left">Emails Alerts</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            {tier2.email} per month
                          </div>
                          <div className="col-6 text-left">Whatsapp Alerts</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            {tier2.whatsapp} per month
                          </div>
                          <div className="col-6 text-left">Telegram Alerts</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            {tier2.telegram} per month
                          </div>
                        </div>
                      </div>
                    </ul>
                    <span className="pricing-price">Rs. {tier2.price}</span>
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
                          //createOrder(tier2.price)
                          setSubvalue(2)
                        }
                      >
                        Buy Now
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="card pricing2">
                <div className="body">
                  <div className="pricing-plan">
                    <img alt="" className="pricing-img" src={SpaceShip} />
                    <h2 className="pricing-header">Pro</h2>
                    <ul className="pricing-features">
                      <div className="container-fluid">
                        <div className="row ">
                          <div className="col-6 text-left">Live Scans</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            No Delay
                          </div>
                          <div className="col-6 text-left">Historic Scans</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            upto {tier3.scans}
                          </div>

                          <div className="col-6 text-left">Virtual Trading</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            {tier3.trades}
                          </div>
                          <div className="col-6 text-left">Historic Charts</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            {tier3.charts} old
                          </div>
                          <div className="col-6 text-left">Backtests</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            {tier3.backtest} per month
                          </div>
                          <div className="col-6 text-left">Emails Alerts</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            {tier3.email} per month
                          </div>
                          <div className="col-6 text-left">Whatsapp Alerts</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            {tier3.whatsapp} per month
                          </div>
                          <div className="col-6 text-left">Telegram Alerts</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            {tier3.telegram} per month
                          </div>
                        </div>
                      </div>
                    </ul>
                    <span className="pricing-price">Rs. {tier3.price}</span>
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
                        onClick={() => {
                          setSubvalue(3);
                        }}
                      >
                        Buy Now
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
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
                  display: "none",
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

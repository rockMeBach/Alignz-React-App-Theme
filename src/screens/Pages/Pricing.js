import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import PageHeader from "../../components/PageHeader";
import Plane from "../../assets/images/plane.png";
import SpaceShip from "../../assets/images/space-ship.png";
import PaperPlane from "../../assets/images/paper-plane.png";
import axios from "axios";

const Pricing = () => {
  const auth = useSelector((state) => state.auth);
  const [tier1, setTier1] = useState([]);
  const [tier2, setTier2] = useState([]);
  const [tier3, setTier3] = useState([]);
  const name = auth.user.name;
  const email = auth.user.email;
  const tier = auth.user.tier;
  let res;
  useEffect(async () => {
    res = await axios.get("http://localhost/api/payment/paymentDatabase");
    setTier1(res.data[0]);
    setTier2(res.data[1]);
    setTier3(res.data[2]);
  }, []);

  const [values, setValues] = useState({
    amount: 0,
    orderID: "",
    error: "",
    success: false,
  });
  const { amount, orderID, error, success } = values;
  console.log("tier1", tier1);
  console.log("tier2", tier2);
  console.log("tier3", tier3);
  const createOrder = async (a) => {
    const res = await axios
      .get(`http://localhost/api/payment/createOrder?amount=${a}`)
      .then((res) => res)
      .catch((err) => console.log(err));
    if (res) {
      setValues({
        error: "",
        success: true,
        orderID: res.data.id,
        amount: res.data.amount,
      });
    }
  };

  const showRazorPay = () => {
    const form = document.createElement("form");
    form.setAttribute("action", "http://localhost/api/payment/callback");
    form.setAttribute("method", "POST");
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.setAttribute("data-key", "rzp_test_yPJvTUYJKWzCa6");
    script.setAttribute("data-amount", amount);
    script.setAttribute("data-name", "Unfluke");
    // script.setAttribute("data-prefill.contact", "9650324051");
    script.setAttribute("data-prefill.email", email);
    script.setAttribute("data-order_id", orderID);
    script.setAttribute("data-prefill.name", name);
    document.getElementById("root").appendChild(form);
    form.appendChild(script);
    console.log(form);

    script.onload = () => {
      console.log(form.childNodes[1]);
      form.childNodes[1].click();
      form.childNodes[1].style.display = "none";
    };
  };

  useEffect(() => {
    if (amount && orderID && amount > 0 && orderID !== "") {
      showRazorPay();
    }
  }, [values]);
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
                    <h2 className="pricing-header">Tier 1</h2>
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
                          <div className="col-6 text-left">Emails ALerts</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            {tier1.email} per month
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
                          <div className="col-6 text-left">Whatsapp ALerts</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            {tier1.whatsapp} per month
                          </div>
                          <div className="col-6 text-left">Telegram ALerts</div>
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
                    <h2 className="pricing-header">Tier 2</h2>
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
                          <div className="col-6 text-left">Emails ALerts</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            {tier2.email} per month
                          </div>
                          <div className="col-6 text-left">Whatsapp ALerts</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            {tier2.whatsapp} per month
                          </div>
                          <div className="col-6 text-left">Telegram ALerts</div>
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
                        className="btn btn-primary"
                        onClick={() => createOrder(tier2.price)}
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
                    <h2 className="pricing-header">Tier 3</h2>
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
                          <div className="col-6 text-left">Emails ALerts</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            {tier3.email} per month
                          </div>
                          <div className="col-6 text-left">Whatsapp ALerts</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            {tier3.whatsapp} per month
                          </div>
                          <div className="col-6 text-left">Telegram ALerts</div>
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
                        className="btn btn-primary"
                        onClick={() => createOrder(tier3.price)}
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
      </div>
    </div>
  );
};

export default Pricing;

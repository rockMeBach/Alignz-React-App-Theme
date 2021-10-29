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
  const name = auth.user.name;
  const email = auth.user.email;

  const [values, setValues] = useState({
    amount: 0,
    orderID: "",
    error: "",
    success: false,
  });
  const { amount, orderID, error, success } = values;

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
                            Upto 6 months
                          </div>
                          <div className="col-6 text-left">Emails ALerts</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            5 per month
                          </div>
                          <div className="col-6 text-left">Whatsapp ALerts</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            5 per month
                          </div>
                          <div className="col-6 text-left">Telegram ALerts</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            5 per month
                          </div>
                          <div className="col-6 text-left">Virtual Trading</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            200 trades
                          </div>
                          <div className="col-6 text-left">Historic Charts</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            1 month old
                          </div>
                          <div className="col-6 text-left">Backtests</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            2 per month
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
                            Upto 1 year
                          </div>
                          <div className="col-6 text-left">Emails ALerts</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            50 per month
                          </div>
                          <div className="col-6 text-left">Whatsapp ALerts</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            50 per month
                          </div>
                          <div className="col-6 text-left">Telegram ALerts</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            50 per month
                          </div>
                          <div className="col-6 text-left">Virtual Trading</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            500 trades
                          </div>
                          <div className="col-6 text-left">Historic Charts</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            1 year old
                          </div>
                          <div className="col-6 text-left">Backtests</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            10 per month
                          </div>
                        </div>
                      </div>
                    </ul>
                    <span className="pricing-price">Rs.399</span>
                    <a
                      className="btn btn-primary"
                      onClick={() => createOrder(399)}
                    >
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
                            Upto 3 years
                          </div>
                          <div className="col-6 text-left">Emails ALerts</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            150 per month
                          </div>
                          <div className="col-6 text-left">Whatsapp ALerts</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            150 per month
                          </div>
                          <div className="col-6 text-left">Telegram ALerts</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            150 per month
                          </div>
                          <div className="col-6 text-left">Virtual Trading</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            Unlimited
                          </div>
                          <div className="col-6 text-left">Historic Charts</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            3 years old
                          </div>
                          <div className="col-6 text-left">Backtests</div>
                          <div
                            className="col-6 text-right"
                            style={{ fontWeight: "800" }}
                          >
                            50 per month
                          </div>
                        </div>
                      </div>
                    </ul>
                    <span className="pricing-price">Rs.599</span>
                    <a
                      className="btn btn-primary"
                      onClick={() => createOrder(599)}
                    >
                      Buy Now
                    </a>
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

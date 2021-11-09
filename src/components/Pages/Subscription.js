import React, { useState } from "react";
import BACKEND_URL from "../../Backend_url";

import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

const Subscription = ({ tier, name, email }) => {
  const auth = useSelector((state) => state.auth);
  var points = auth.user.points;
  const [checkerTier, setCheckerTier] = useState(tier);
  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState(0);
  const [values, setValues] = useState({
    amount: 0,
    orderID: "",
    error: "",
    success: false,
  });
  const { amount, orderID, error, success } = values;

  const couponChecker = async () => {
    const res = await axios
      .post(`http://${BACKEND_URL}/api/payment/coupon`, { couponCode })
      .then((res) => res)
      .catch((err) => console.log(err));
    if (res) {
      setCoupon(res.data[0].discount);
    }
  };

  const createOrder = async (a) => {
    const res = await axios
      .get(`http://${BACKEND_URL}/api/payment/createOrder?amount=${a}`)
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
    const t = checkerTier.tier;
    const form = document.createElement("form");
    form.setAttribute(
      "action",
      `http://${BACKEND_URL}/api/payment/callback?tier=${t}&points=${points}`
    );
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
    <div>
      <div className="col-12">
        <h1
          style={{
            fontSize: "24px",
            textAlign: "left",
            padding: "40px 0px 30px 0px",
            opacity: "0.6",
          }}
        >
          Subscription Bill
        </h1>
      </div>
      <div className="container-fluid">
        <div className="row">
          {checkerTier.tier === "2" && (
            <div
              className="col-sm-12 col-md-8 p-5"
              style={{ background: "#00000008", borderRadius: "12px" }}
            >
              <div className="row">
                <div
                  className="col-6"
                  style={{
                    fontSize: "32px",
                    font: "normal normal bold 32px/37px Ubuntu",
                  }}
                >
                  Ultima Pack
                </div>
                <div
                  className="col-6"
                  style={{
                    fontSize: "32px",
                    font: "normal normal bold 32px/37px Ubuntu",
                    textAlign: "right",
                  }}
                >
                  ₹ {checkerTier.price}
                </div>
              </div>
              <div className="row">
                <hr />
              </div>
              <div className="row">
                <div
                  className="col-8"
                  style={{
                    fontSize: "20px",
                    opacity: "0.6",
                  }}
                >
                  Real Money already in the account ( in Points )
                </div>
                <div
                  className="col-4 text-right"
                  style={{ fontSize: "20px", opacity: "0.6" }}
                >
                  <span style={{ color: "#DC3545" }}> - ₹ {points}</span>
                </div>
              </div>
              {coupon !== 0 && (
                <div className="row">
                  <div
                    className="col-8"
                    style={{
                      fontSize: "20px",
                      opacity: "0.6",
                    }}
                  >
                    Offer Discount
                  </div>
                  <div
                    className="col-4 text-right"
                    style={{ color: "#DC3545", fontSize: "20px" }}
                  >
                    {" "}
                    - ₹ {coupon}
                  </div>
                </div>
              )}

              <div className="row">
                <div
                  className="col-8"
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  Net amount
                </div>
                <div
                  className="col-4 text-right"
                  style={{ fontSize: "24px", fontWeight: "bold" }}
                >
                  ₹ {checkerTier.price - coupon - points}
                </div>
              </div>
              {/* <div className="row">
                <div
                  className="col-8"
                  style={{
                    fontSize: "24px",
                    opacity: "0.6",
                  }}
                >
                  GST ( 18% )
                </div>
                <div
                  className="col-4 text-right"
                  style={{
                    color: "#28A745",
                    fontSize: "24px",
                    opacity: "0.6",
                    fontWeight: "500",
                  }}
                >
                  + ₹ 1000
                </div>
              </div> */}
              <div className="row">
                <div
                  className="col-8"
                  style={{
                    fontSize: "26px",
                    fontWeight: "bold",
                  }}
                >
                  Total Amount
                </div>
                <div
                  className="col-4 text-right"
                  style={{ fontSize: "26px", fontWeight: "bold" }}
                >
                  ₹ {checkerTier.price - coupon - points * 0.1}
                </div>
              </div>
            </div>
          )}
          {checkerTier.tier === "3" && (
            <div
              className="col-sm-12 col-md-8 p-5"
              style={{ background: "#00000008", borderRadius: "12px" }}
            >
              <div className="row">
                <div
                  className="col-6"
                  style={{
                    fontSize: "32px",
                    font: "normal normal bold 32px/37px Ubuntu",
                  }}
                >
                  Ultima Pack
                </div>
                <div
                  className="col-6"
                  style={{
                    fontSize: "32px",
                    font: "normal normal bold 32px/37px Ubuntu",
                    textAlign: "right",
                  }}
                >
                  ₹ {checkerTier.price}
                </div>
              </div>
              <div className="row">
                <hr />
              </div>
              <div className="row">
                <div
                  className="col-8"
                  style={{
                    fontSize: "20px",
                    opacity: "0.6",
                  }}
                >
                  Real Money already in the account ( in Points )
                </div>
                <div
                  className="col-4 text-right"
                  style={{ fontSize: "20px", opacity: "0.6" }}
                >
                  <span style={{ color: "#DC3545" }}> - ₹ {points}</span>
                </div>
              </div>
              {coupon !== 0 && (
                <div className="row">
                  <div
                    className="col-8"
                    style={{
                      fontSize: "20px",
                      opacity: "0.6",
                    }}
                  >
                    Offer Discount
                  </div>
                  <div
                    className="col-4 text-right"
                    style={{ color: "#DC3545", fontSize: "20px" }}
                  >
                    {" "}
                    - ₹ {coupon}
                  </div>
                </div>
              )}
              <div className="row">
                <div
                  className="col-8"
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  Net amount
                </div>
                <div
                  className="col-4 text-right"
                  style={{ fontSize: "24px", fontWeight: "bold" }}
                >
                  ₹ {checkerTier.price - coupon - points}
                </div>
              </div>
              {/* <div className="row">
                <div
                  className="col-8"
                  style={{
                    fontSize: "24px",
                    opacity: "0.6",
                  }}
                >
                  GST ( 18% )
                </div>
                <div
                  className="col-4 text-right"
                  style={{
                    color: "#28A745",
                    fontSize: "24px",
                    opacity: "0.6",
                    fontWeight: "500",
                  }}
                >
                  + ₹ 1000
                </div>
              </div> */}
              <div className="row">
                <div
                  className="col-8"
                  style={{
                    fontSize: "26px",
                    fontWeight: "bold",
                  }}
                >
                  Total Amount
                </div>
                <div
                  className="col-4 text-right"
                  style={{ fontSize: "26px", fontWeight: "bold" }}
                >
                  ₹ {checkerTier.price - coupon - points}
                </div>
              </div>
            </div>
          )}
          <div className="col-sm-12 col-md-4 ">
            <div className="col-12">
              <form>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Coupon Code"
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                    }}
                    value={couponCode}
                  />
                  <div class="input-group-append">
                    <button
                      className="btn"
                      type="submit"
                      style={{
                        backgroundColor: "#E27498",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "13px",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        couponChecker();
                      }}
                    >
                      Apply Coupon Code
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <hr style={{ marginTop: "30px", marginBottom: "30px" }} />
            <div className="row">
              <div className="col-4"></div>
              <div className="col-8">
                {" "}
                <button
                  className="btn"
                  type="button"
                  style={{
                    backgroundColor: "#E27498",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                  onClick={() =>
                    createOrder(checkerTier.price - coupon - points)
                  }
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Subscription;

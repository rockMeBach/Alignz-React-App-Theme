import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import BACKEND_URL from "../../Backend_url";
import Logo from "../../assets/images/after_payment.jpg";
const Checkout = ({ match }) => {
  const auth = useSelector((state) => state.auth);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const getPaymentStatus = async (payment_id, i) => {
    const payment_status = await axios
      .get(
        `http://${BACKEND_URL}/api/payment/status/${payment_id}/?id=${i}&tier={tier}`
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    setPaymentStatus(payment_status);
    return payment_status;
  };
  useEffect(() => {
    const i = auth.user._id;
    if (i !== undefined) getPaymentStatus(match.params.paymentId, i);
  }, [auth]);
  console.log(auth.user);
  return (
    <div>
      <div className="container">
        <div className="row mt-5 px-5">
          <div className="col-12">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <img src={Logo} className="img-fluid" alt="" />
              </div>
              <div className="col-sm-12 col-md-6 my-auto">
                <h1
                  style={{
                    color: "#28A745",
                    fontWeight: "bold",
                  }}
                >
                  You're Successfully Subscribed to our package
                </h1>
                <h1
                  style={{
                    fontWeight: "500",
                    fontSize: "15px",
                  }}
                >
                  Welcome to the family of 10,000 investors. You can now start
                  investing
                </h1>

                {/* <div className="row">
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
                    ₹ 5,500
                  </div>
                </div> */}
                {/* <div className="row">
                  <div
                    className="col-12"
                    style={{
                      fontSize: "18px",
                      opacity: "0.6",
                    }}
                  >
                    10,000 points add on
                    <hr />
                  </div>
                </div> */}

                {/* <div className="row py-1">
                  <div
                    className="col-8"
                    style={{
                      fontSize: "15px",
                      opacity: "0.6",
                    }}
                  >
                    Real Money already in the account ( in Points )
                  </div>
                  <div
                    className="col-4 text-right"
                    style={{ fontSize: "15px", opacity: "0.6" }}
                  >
                    ₹ 500
                  </div>
                </div> */}
                {/* <div className="row py-1">
                  <div
                    className="col-8"
                    style={{
                      fontSize: "15px",
                      opacity: "0.6",
                    }}
                  >
                    Offer Discount
                  </div>
                  <div
                    className="col-4 text-right"
                    style={{ color: "#DC3545", fontSize: "15px" }}
                  >
                    {" "}
                    - ₹ 100
                  </div>
                </div> */}
                {/* <div className="row py-1">
                  <div
                    className="col-8"
                    style={{
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    Net amount
                  </div>
                  <div
                    className="col-4 text-right"
                    style={{ fontSize: "15px", fontWeight: "bold" }}
                  >
                    ₹ 4900
                  </div>
                </div> */}
                {/* <div className="row py-1">
                  <div
                    className="col-8"
                    style={{
                      fontSize: "15px",
                      opacity: "0.6",
                    }}
                  >
                    GST ( 18% )
                  </div>
                  <div
                    className="col-4 text-right"
                    style={{
                      color: "#28A745",
                      fontSize: "15px",
                      opacity: "0.6",
                      fontWeight: "500",
                    }}
                  >
                    + ₹ 1000
                  </div>
                </div>
                <div className="row py-1">
                  <div
                    className="col-8"
                    style={{
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    Total Amount
                  </div>
                  <div
                    className="col-4 text-right"
                    style={{ fontSize: "15px", fontWeight: "bold" }}
                  >
                    ₹ 5900
                  </div>
                </div>
                <hr />
                <div className="row py-1">
                  <div
                    className="col-8"
                    style={{
                      fontSize: "15px",
                      opacity: "0.6",
                    }}
                  >
                    Subscription length
                  </div>
                  <div
                    className="col-4 text-right"
                    style={{
                      fontSize: "15px",
                      fontWeight: "700",
                    }}
                  >
                    3 months
                  </div>
                </div>
                <div className="row py-1">
                  <div
                    className="col-8"
                    style={{
                      fontSize: "15px",
                      opacity: "0.6",
                    }}
                  >
                    First Payment
                  </div>
                  <div
                    className="col-4 text-right"
                    style={{
                      fontSize: "15px",
                      fontWeight: "700",
                    }}
                  >
                    May 1,2021
                  </div>
                </div>
                <div className="row py-1">
                  <div
                    className="col-8"
                    style={{
                      fontSize: "15px",
                      opacity: "0.6",
                    }}
                  >
                    Billed Amount
                  </div>
                  <div
                    className="col-4 text-right"
                    style={{
                      fontSize: "15px",
                      fontWeight: "700",
                    }}
                  >
                    ₹ 5,500
                  </div>
                </div> */}
                <div className="row">
                  <div className="col-12 mt-2">
                    <a href="/dashboard">
                      <button
                        className="btn"
                        type="button"
                        style={{
                          backgroundColor: "#E27498",
                          color: "white",
                          fontWeight: "bold",
                          width: "100%",
                        }}
                      >
                        Continue
                      </button>
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
export default Checkout;

import React, { useState } from "react";
import { useEffect } from "react";
import OTPVerification from "./OTPVerification";
import { useSelector } from "react-redux";
const ProfileV1Setting = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const auth = useSelector((state) => state.auth);
  const [d, setD] = useState([]);
  const [phoneCode, setPhoneCode] = useState("");
  var de;
  var t = [1, 2];
  useEffect(() => {
    if (auth.user.tierEnded) {
      de = auth.user.tierEnded;
      t = de.split(" ");
      setD([t[2], t[1]]);
    }
  }, [auth.user]);

  const phoneChecker = () => {
    if (!phoneCode) {
      setPhoneCode(auth.user.phoneNos);
    }
  };
  // var tierEnd =  auth.user.tierEnded;
  var backtestWidth;
  var emailWidth;
  var telegramWidth;
  var whatsappWidth;
  var virtualWidth;
  if (auth.user.tier === 0) {
    backtestWidth = (auth.user.backtest / 2) * 100;
    emailWidth = (auth.user.emailNotification / 5) * 100;
    telegramWidth = (auth.user.telegramNotification / 5) * 100;
    whatsappWidth = (auth.user.whatsappNotification / 5) * 100;
    virtualWidth = (auth.user.virtualTradesNotification / 200) * 100;
  } else if (auth.user.tier === 2) {
    backtestWidth = (auth.user.backtest / 10) * 100;
    emailWidth = (auth.user.emailNotification / 50) * 100;
    telegramWidth = (auth.user.telegramNotification / 50) * 100;
    whatsappWidth = (auth.user.whatsappNotification / 50) * 100;
    virtualWidth = (auth.user.virtualTradesNotification / 500) * 100;
  } else if (auth.user.tier === 3) {
    backtestWidth = (auth.user.backtest / 50) * 100;
    emailWidth = (auth.user.emailNotification / 150) * 100;
    telegramWidth = (auth.user.telegramNotification / 150) * 100;
    whatsappWidth = (auth.user.whatsappNotification / 150) * 100;
    virtualWidth = -1;
  }
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-12 pl-4">
            <div
              style={{
                border: "1px solid rgba(0, 0, 0, 0.125)",
                borderRadius: "20px",
                marginBottom: "30px",
              }}
            >
              <h3 className="p-3">Personal Information</h3>

              <form className="p-3">
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="name">Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="name"
                      value={auth.user.name}
                      disabled
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="email">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      value={auth.user.email}
                      disabled
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="phone">Phone Number</label>
                  <input
                    type="phone"
                    class="form-control"
                    id="phone"
                    placeholder={auth.user.phoneNos}
                    onChange={(e) => {
                      setPhoneCode(e.target.value);
                    }}
                    value={phoneCode}
                  />
                </div>
                {modalOpen && <OTPVerification />}
                <button
                  class="btn"
                  style={{
                    background: "rgb(226, 116, 152)",
                    color: "white",
                    fontWeight: "bold",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    phoneChecker();
                    setModalOpen(true);
                    console.log(phoneCode);
                  }}
                >
                  Verify Phone Number
                </button>
              </form>
            </div>
            <div
              className="mt-4"
              style={{
                border: "1px solid rgba(0, 0, 0, 0.125)",
                borderRadius: "20px",
                marginBottom: "30px",
              }}
            >
              <h3 className="px-3 pt-3">Account Information</h3>
              <div className="p-3">
                <div style={{ fontSize: "30px", fontWeight: "bold" }}>
                  Your Tier : {auth.user.tier}
                </div>
                <p style={{ marginBottom: "0" }} className="pt-3">
                  Backtests
                </p>
                <div class="progress">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    style={{ width: `${backtestWidth}%` }}
                    aria-valuenow="20"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                {virtualWidth !== -1 && (
                  <>
                    {" "}
                    <p style={{ marginBottom: "0" }} className="pt-3">
                      Virtual Trades
                    </p>
                    <div class="progress">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style={{ width: `${virtualWidth}%` }}
                        aria-valuenow="35"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </>
                )}

                <p style={{ marginBottom: "0" }} className="pt-3">
                  Email Alerts
                </p>
                <div class="progress">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    style={{ width: `${emailWidth}%` }}
                    aria-valuenow="35"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>

                <p style={{ marginBottom: "0" }} className="pt-3">
                  Whatsapp Alerts
                </p>
                <div class="progress">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    style={{ width: `${whatsappWidth}%` }}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <p style={{ marginBottom: "0" }} className="pt-3">
                  Telegram Alerts
                </p>
                <div class="progress">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    style={{ width: `${telegramWidth}%` }}
                    aria-valuenow="35"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <div
                  style={{ fontSize: "30px", fontWeight: "bold" }}
                  className="pt-3"
                >
                  Last Date :{" "}
                  <span style={{ color: "green" }}>
                    {d[0]} {d[1]}
                  </span>
                </div>
              </div>
            </div>
            <div
              style={{
                border: "1px solid rgba(0, 0, 0, 0.125)",
                borderRadius: "20px",
                marginBottom: "30px",
              }}
            >
              <h3 className="p-3">Share Your Code</h3>
              <p className="pl-3">
                Share the redeem code with others to get extra cashbacks and
                rewards
              </p>
              <p
                className="p-3 text-center"
                style={{ fontSize: "40px", fontWeight: "bold", color: "green" }}
              >
                {auth.user.hisReferral}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileV1Setting;

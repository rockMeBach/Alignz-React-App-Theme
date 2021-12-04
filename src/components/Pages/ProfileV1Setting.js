import React, { useState } from "react";
import { useEffect } from "react";
import OTPVerification from "./OTPVerification";
import { showErrMsg } from "../../screens/Auth/Notification/Notification";
import { isPhone } from "../../screens/Auth/Validation";
import { useSelector } from "react-redux";
import BACKEND_URL from "../../Backend_url";
import coin from "../../assets/images/coin/coin.jpg";
import axios from "axios";
const ProfileV1Setting = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [errorHandling, setHandlingError] = useState("");
  const auth = useSelector((state) => state.auth);
  const [phoneData, setPhoneData] = useState([]);
  const [d, setD] = useState([]);
  const [phoneCode, setPhoneCode] = useState("");
  const [alertWhatsapp, setAlertWhatsapp] = useState();
  const [alertTelegram, setAlertTelegram] = useState();
  const [alertEmail, setAlertEmail] = useState();
  const [scroller, setScroller] = useState(false);
  const closeModalUpper = () => setModalOpen(false);
  var de;
  var t = [1, 2];
  const handleScroll = () => {
    window.scroll({
      top: -1000,
      left: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    if (auth.user.tierEnded) {
      de = auth.user.tierEnded;
      t = de.split(" ");
      console.log(t);
      setD([t[2], t[1], t[3]]);
    }
    if (auth.user.alertWhatsapp) {
      setAlertWhatsapp(auth.user.alertWhatsapp);
    }
    if (auth.user.alertEmail) {
      setAlertEmail(auth.user.alertEmail);
    }
    if (auth.user.alertTelegram) {
      setAlertTelegram(auth.user.alertTelegram);
    }

    setPhoneCode(auth.user.phoneNos);
  }, [auth.user]);
  var backtestWidth;
  var emailWidth;
  var telegramWidth;
  var whatsappWidth;
  var virtualWidth;
  var totalAlerts;
  var totalVirtual;
  var totalbacktest;
  var plan;
  if (auth.user.tier === 0) {
    plan = "Basic";
    totalAlerts = 5;
    totalVirtual = 200;
    totalbacktest = 2;
    backtestWidth = (auth.user.backtest / 2) * 100;
    emailWidth = (auth.user.emailNotification / 5) * 100;
    telegramWidth = (auth.user.telegramNotification / 5) * 100;
    whatsappWidth = (auth.user.whatsappNotification / 5) * 100;
    virtualWidth = (auth.user.virtualTrades / 200) * 100;
  } else if (auth.user.tier === 2) {
    plan = "Advanced";
    totalAlerts = 50;
    totalVirtual = 500;
    totalbacktest = 10;
    backtestWidth = (auth.user.backtest / 10) * 100;
    emailWidth = (auth.user.emailNotification / 50) * 100;
    telegramWidth = (auth.user.telegramNotification / 50) * 100;
    whatsappWidth = (auth.user.whatsappNotification / 50) * 100;
    virtualWidth = (auth.user.virtualTrades / 500) * 100;
  } else if (auth.user.tier === 3) {
    plan = "Pro";
    totalAlerts = 150;
    totalVirtual = -1;
    totalbacktest = 50;
    backtestWidth = (auth.user.backtest / 50) * 100;
    emailWidth = (auth.user.emailNotification / 150) * 100;
    telegramWidth = (auth.user.telegramNotification / 150) * 100;
    whatsappWidth = (auth.user.whatsappNotification / 150) * 100;
    virtualWidth = -1;
  }
  let res;
  const codeSender = async () => {
    if (!isPhone(phoneCode)) {
      return setHandlingError("Invalid Phone Number");
    }
    try {
      res = await axios.post(`http://${BACKEND_URL}/api/phone/sendOTP`, {
        phone: phoneCode,
      });
      setPhoneData(res.data);
      setModalOpen(true);
    } catch (err) {
      err.response.data.msg && setHandlingError(err.response.data.msg);
    }
  };
  const deactivateTelegram = async () => {
    const res = await axios.post(
      `http://${BACKEND_URL}/api/alert/deactivateTelegram`,
      {
        userId: auth.user._id,
      }
    );
    if (res.status === 200) {
      window.location.href =
        "http://ec2-13-235-48-197.ap-south-1.compute.amazonaws.com:3000/profile";
    }
  };
  console.log("suhas", virtualWidth);
  return (
    <div>
      <div className="container">
        <div className="row">
          {errorHandling && showErrMsg(errorHandling)}
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
                {auth.user.phoneVerified === true && (
                  <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input
                      type="phone"
                      class="form-control"
                      id="phone"
                      value={phoneCode}
                      disabled
                    />
                  </div>
                )}
                {auth.user.phoneVerified === false && (
                  <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input
                      type="phone"
                      class="form-control"
                      id="phone"
                      onChange={(e) => {
                        setPhoneCode(e.target.value);
                      }}
                      value={phoneCode}
                    />
                  </div>
                )}
                {modalOpen && (
                  <OTPVerification
                    closeModalUpper={closeModalUpper}
                    data1={phoneData}
                  />
                )}
                {auth.user.phoneVerified === false && (
                  <button
                    class="btn"
                    style={{
                      background: "rgb(226, 116, 152)",
                      color: "white",
                      fontWeight: "bold",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      codeSender();
                    }}
                  >
                    Verify Phone Number
                  </button>
                )}
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
                <div
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                  }}
                >
                  Your Plan :{" "}
                  <a style={{ color: "rgb(226, 116, 152)" }} href>
                    {plan}
                  </a>
                </div>

                <p
                  style={{
                    marginBottom: "0",
                    color: "#35baf6",
                    fontWeight: "600",
                  }}
                  className="pt-3"
                >
                  <a style={{ color: "rgb(226, 116, 152)" }} href>
                    Backtests{" "}
                  </a>
                  ({auth.user.backtest}/{totalbacktest} Left)
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
                    <p
                      style={{
                        marginBottom: "0",
                        color: "#35baf6",
                        fontWeight: "600",
                      }}
                      className="pt-3"
                    >
                      <a style={{ color: "rgb(226, 116, 152)" }} href>
                        Virtual Trades
                      </a>{" "}
                      ({auth.user.virtualTrades}/{totalVirtual} Left)
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

                <p
                  style={{
                    marginBottom: "0",
                    color: "#35baf6",
                    fontWeight: "600",
                  }}
                  className="pt-3"
                >
                  <a style={{ color: "rgb(226, 116, 152)" }} href>
                    {" "}
                    Email Alerts{" "}
                  </a>
                  ({auth.user.emailNotification}/{totalAlerts} Left)
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

                <p
                  style={{
                    marginBottom: "0",
                    color: "#35baf6",
                    fontWeight: "600",
                  }}
                  className="pt-3"
                >
                  <a style={{ color: "rgb(226, 116, 152)" }} href>
                    Whatsapp Alerts
                  </a>{" "}
                  ({auth.user.whatsappNotification}/{totalAlerts} Left)
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
                <p
                  style={{
                    marginBottom: "0",
                    color: "#35baf6",
                    fontWeight: "600",
                  }}
                  className="pt-3"
                >
                  <a style={{ color: "rgb(226, 116, 152)" }} href>
                    Telegram Alerts
                  </a>{" "}
                  ({auth.user.telegramNotification}/{totalAlerts} Left)
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
                  <span style={{ color: "rgb(226, 116, 152)" }}>
                    {d[0]} {d[1]} {d[2]}
                  </span>
                </div>
              </div>
            </div>

            <div
              className="mt-4"
              style={{
                border: "1px solid rgba(0, 0, 0, 0.125)",
                borderRadius: "20px",
                marginBottom: "30px",
              }}
            >
              <h3 className="px-3 pt-3">Alerts</h3>
              <div className="container">
                <div className="row mt-4">
                  <div className="col-6 col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        disabled
                      />
                      <label style={{ color: "black" }}>Whatsapp</label>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <button
                      class="btn"
                      style={{
                        background: "rgb(226, 116, 152)",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Activate
                    </button>
                  </div>
                </div>
                {auth.user.telegramUsername && (
                  <div className="row mt-4">
                    <div className="col-6 col-md-3">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexCheckDefault"
                          checked
                          disabled
                        />
                        <label style={{ color: "black" }}>Telegram</label>
                      </div>
                    </div>
                    <div className="col-6 col-md-3">
                      <a
                        class="btn btn-success"
                        style={{
                          fontWeight: "bold",
                        }}
                        href="https://t.me/unflukebotbot"
                      >
                        Open Telegram
                      </a>
                      <button
                        class="btn btn-danger ms-3"
                        style={{
                          fontWeight: "bold",
                        }}
                        onClick={() => deactivateTelegram()}
                      >
                        Deactivate
                      </button>
                    </div>
                  </div>
                )}

                {!auth.user.telegramUsername && (
                  <div className="row mt-4">
                    <div className="col-6 col-md-3">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                          disabled
                        />
                        <label style={{ color: "black" }}>Telegram</label>
                      </div>
                    </div>
                    <div className="col-6 col-md-3">
                      <a href="/activate/telegram">
                        <button
                          class="btn"
                          style={{
                            background: "rgb(226, 116, 152)",
                            color: "white",
                            fontWeight: "bold",
                          }}
                        >
                          Activate
                        </button>
                      </a>
                    </div>
                  </div>
                )}

                <div className="row mt-4 mb-4">
                  <div className="col-6 col-md-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        disabled
                      />
                      <label style={{ color: "black" }}>Email</label>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <button
                      class="btn"
                      style={{
                        background: "rgb(226, 116, 152)",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Activate
                    </button>
                  </div>
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
                style={{
                  fontSize: "40px",
                  fontWeight: "bold",
                  color: "rgb(226, 116, 152)",
                }}
              >
                {auth.user.hisReferral}
              </p>
            </div>
            <div
              style={{
                border: "1px solid rgba(0, 0, 0, 0.125)",
                borderRadius: "20px",
                marginBottom: "30px",
              }}
            >
              <h3 className="p-3">Your Points</h3>
              <p className="pl-3">Use your points to avail discounts !!</p>
              {!auth.user.phoneVerified && (
                <button
                  className="pl-3 btn"
                  style={{ color: "rgb(226, 116, 152)", fontWeight: "600" }}
                  onClick={() => handleScroll()}
                >
                  Verify your phone number to avail points
                </button>
              )}
              <p
                className="p-3 text-center"
                style={{
                  fontSize: "40px",
                  fontWeight: "bold",
                  color: "rgb(226, 116, 152)",
                }}
              >
                <div>
                  <img src={coin} height="80px" />
                  {auth.user.points}
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileV1Setting;

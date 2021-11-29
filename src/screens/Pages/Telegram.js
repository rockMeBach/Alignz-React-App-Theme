import React, { useState } from "react";
import BACKEND_URL from "../../Backend_url";
import { useSelector } from "react-redux";
import axios from "axios";

import step1 from "../../assets/images/STEP1.jpg";
import step2 from "../../assets/images/STEP2.jpg";
import step3 from "../../assets/images/STEP3.jpg";
const Telegram = () => {
  const auth = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const submitUsername = async () => {
    const res = await axios.post(
      `http://${BACKEND_URL}/api/alert/addUsername`,
      { username: username, userId: auth.user._id }
    );
    if (res.status === 200) {
      console.log(res);
      return (window.location.href = "https://t.me/unflukebotbot");
    }
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 mt-5">
            <div class="mb-3 mx-auto" style={{ width: "500px" }}>
              <input
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter your Telegram username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
              />
            </div>
          </div>
          <div className="col-12 text-center">
            <button
              class="btn"
              style={{
                background: "rgb(226, 116, 152)",
                color: "white",
                fontWeight: "bold",
                width: "300px",
              }}
              onClick={(e) => {
                e.preventDefault();
                submitUsername();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 mt-5">
            <h4 style={{ color: "rgb(108, 108, 108)" }}>
              How to get your Telegram username?
            </h4>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 col-md-4">
            <h2 className="mb-3">Step 1</h2>
            <img src={step1} className="img-fluid" width="300px" />
            <div className="mt-3">
              <p>
                * Open Telegram on your PC or phone
                <br /> * Click on the Settings tab at the bottom of the screen
              </p>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <h2 className="mb-3">Step 2</h2>
            <img src={step2} className="img-fluid" width="300px" />
            <p className="mt-3">
              {" "}
              * On the top of the screen, Click on the profile tab
            </p>
          </div>
          <div className="col-12 col-md-4">
            <h2 className="mb-3">Step 3</h2>
            <img src={step3} className="img-fluid" width="300px" />
            <p className="mt-3">
              {" "}
              * Your username will be shown on the screen , if its not shown you
              can enter your username
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Telegram;

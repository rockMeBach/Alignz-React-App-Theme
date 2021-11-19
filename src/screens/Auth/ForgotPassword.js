import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../../assets/images/logo-white.svg";
import { isEmail } from "./Validation";
import axios from "axios";
import BACKEND_URL from "../../Backend_url";
import { showErrMsg, showSuccessMsg } from "./Notification/Notification";

const initialState = {
  email: "",
  err: "",
  success: "",
};
const ForgotPassword = () => {
  const [data, setData] = useState(initialState);

  const { email, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const forgotPassword = async (e) => {
    e.preventDefault();
    if (!isEmail(email))
      return setData({ ...data, err: "Invalid emails.", success: "" });

    try {
      const res = await axios.post(
        `http://${BACKEND_URL}/api/user/forgot-password`,
        {
          email,
        }
      );

      return setData({ ...data, err: "", success: res.data.msg });
    } catch (err) {
      if (!err.response) {
        setData({ ...data, err: "Server Error from Unfluke", success: "" });
      } else {
        err.response.data.msg &&
          setData({ ...data, err: err.response.data.msg, success: "" });
      }
    }
  };
  return (
    <div className="theme-cyan">
      <div>
        <div className="vertical-align-wrap">
          <div className="vertical-align-middle auth-main">
            <div className="auth-box">
              <div className="top">
                <img
                  src={Logo}
                  alt="Lucid"
                  style={{ height: "40px", margin: "10px" }}
                />
              </div>
              {err && showErrMsg(err)}
              {success && showSuccessMsg(success)}
              <div className="card">
                <div className="header">
                  <p className="lead">Recover my password</p>
                </div>
                <div className="body">
                  <p>
                    Please enter your email address below to receive
                    instructions for resetting password.
                  </p>
                  <form className="form-auth-small" onSubmit={forgotPassword}>
                    <div className="form-group">
                      <input
                        className="form-control"
                        placeholder="Enter your Email"
                        name="email"
                        type="email"
                        value={email}
                        id="email"
                        onChange={handleChangeInput}
                      />
                    </div>
                    <button
                      className="btn btn-primary btn-lg btn-block"
                      type="submit"
                    >
                      RESET PASSWORD
                    </button>
                  </form>
                  <div className="bottom">
                    <span className="helper-text">
                      Know your password? <a href="login">Login</a>
                    </span>
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
export default ForgotPassword;

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../../assets/images/logo-white.svg";
import { useParams } from "react-router-dom";
import { isMatch, isLength } from "./Validation";
import axios from "axios";

const initialState = {
  password: "",
  cf_password: "",
  err: "",
  success: "",
};
const ResetPassword = () => {
  const [data, setData] = useState(initialState);
  const { token } = useParams();
  const { password, cf_password, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const handleResetPass = async (e) => {
    e.preventDefault();
    if (isLength(password))
      return setData({
        ...data,
        err: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setData({ ...data, err: "Password did not match.", success: "" });

    try {
      const res = await axios.post(
        "http://localhost/api/user/reset-password",
        { password },
        {
          headers: { Authorization: token },
        }
      );

      return setData({ ...data, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setData({ ...data, err: err.response.data.msg, success: "" });
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

              <div className="card">
                <div className="header">
                  <p className="lead">Enter Your Details</p>
                </div>
                <div className="body">
                  <form className="form-auth-small" onSubmit={handleResetPass}>
                    <div className="form-group">
                      <label className="control-label sr-only">Password</label>
                      <input
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={handleChangeInput}
                      />
                    </div>
                    <div className="form-group">
                      <label className="control-label sr-only">
                        Confirm Password
                      </label>
                      <input
                        className="form-control"
                        id="cf_password"
                        name="cf_password"
                        placeholder="Confirm Password"
                        type="password"
                        value={cf_password}
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
export default ResetPassword;

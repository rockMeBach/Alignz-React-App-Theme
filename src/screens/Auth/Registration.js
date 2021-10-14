import React, { useState } from "react";
import axios from "axios";
import { showErrMsg, showSuccessMsg } from "../Auth/Notification/Notification";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../../assets/images/logo-white.svg";
import { isEmpty, isLength, isEmail, isMatch } from "./Validation";

const initialState = {
  name: "",
  email: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
  referral: "",
};

const Registration = () => {
  const [user, setUser] = useState(initialState);
  const { name, email, password, cf_password, err, success, referral } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(name) || isEmpty(password))
      return setUser({
        ...user,
        err: "Please fill in all fields.",
        success: "",
      });

    if (!isEmail(email))
      return setUser({ ...user, err: "Invalid emails.", success: "" });

    if (isLength(password))
      return setUser({
        ...user,
        err: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setUser({ ...user, err: "Password did not match.", success: "" });

    try {
      const res = await axios.post("http://localhost/api/user/register", {
        name,
        email,
        password,
        referral,
      });

      setUser({ ...user, err: "", success: "Verification Email Send" });
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
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
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
                <div className="header">
                  <p className="lead">Create an account</p>
                </div>
                <div className="body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="control-label sr-only">Name</label>
                      <input
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Name"
                        type="name"
                        value={name}
                        onChange={handleChangeInput}
                      />
                    </div>
                    <div className="form-group">
                      <label className="control-label sr-only">Email</label>
                      <input
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter Email Address"
                        type="email"
                        value={email}
                        onChange={handleChangeInput}
                      />
                    </div>
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
                    <div className="form-group">
                      <label className="control-label sr-only">
                        Referral Code
                      </label>
                      <input
                        className="form-control"
                        id="referral"
                        name="referral"
                        placeholder="Referral Code"
                        type="name"
                        value={referral}
                        onChange={handleChangeInput}
                      />
                    </div>
                    <button
                      className="btn btn-primary btn-lg btn-block"
                      type="submit"
                    >
                      Register your Account
                    </button>
                  </form>
                  <div className="bottom">
                    <span className="helper-text">
                      Already have an account? <a href="login">Login</a>
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
export default Registration;

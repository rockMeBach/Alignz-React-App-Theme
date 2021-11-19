import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../assets/images/logo-white.svg";
import { useDispatch } from "react-redux";
import { showErrMsg, showSuccessMsg } from "./Auth/Notification/Notification";
import axios from "axios";
import { dispatchLogin } from "../actions/authAction";
import { useHistory } from "react-router";
import BACKEND_URL from "../Backend_url";

const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};

const Login = () => {
  const [user, setUser] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();
  const { email, password, err, success } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://${BACKEND_URL}/api/user/login`, {
        email,
        password,
      });
      const rf_token = res.data.refresh_token;
      const temp = await axios.post(
        `http://${BACKEND_URL}/api/user/refresh_token`,
        {
          rf_token,
        }
      );
      setUser({ ...user, err: "", success: res.data.msg });
      localStorage.setItem("access", temp.data.access_token);
      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      history.push("/dashboard");
    } catch (err) {
      if (!err.response) {
        setUser({ ...user, err: "Server Error from Unfluke", success: "" });
      } else {
        err.response.data.msg &&
          setUser({ ...user, err: err.response.data.msg, success: "" });
      }
    }
  };

  return (
    <div className="theme-cyan">
      <div className="page-loader-wrapper" style={{ display: "none" }}>
        <div className="loader">
          <div className="m-t-30">
            <img
              src={require("../assets/images/logo-icon.svg")}
              width="48"
              height="48"
              alt="Lucid"
            />
          </div>
          <p>Please wait...</p>
        </div>
      </div>
      <div className="hide-border">
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
                  <p className="lead">Login to your account</p>
                </div>
                <div className="body">
                  <div className="form-auth-small" action="index.html">
                    <form onSubmit={handleSubmit}>
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
                        <label className="control-label sr-only">
                          Password
                        </label>
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
                      <button
                        className="btn btn-primary btn-lg btn-block"
                        type="submit"
                      >
                        Login
                      </button>
                    </form>

                    <div className="bottom">
                      <span className="helper-text m-b-10">
                        <i className="fa fa-lock"></i>{" "}
                        <a href={`${process.env.PUBLIC_URL}/forgotpassword`}>
                          Forgot Password?
                        </a>
                      </span>
                      <span>
                        Don't have an account?{" "}
                        <a href="registration">Register</a>
                      </span>
                    </div>
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

export default Login;

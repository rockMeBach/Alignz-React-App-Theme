import React, { useState } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../../assets/images/logo-white.svg";
import { isEmpty, isLength, isEmail, isMatch } from "./Validation";

const initialState = {
  name: "",
  email: " ",
  password: "",
  cf_password: "",
  err: " ",
  success: " ",
};

const Registration = () => {
  const [user, setUser] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();
  const { name, email, password, cf_password, err, success } = user;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: " ", success: " " });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(name) || isEmpty(password))
      return setUser({
        ...user,
        err: "Please fill all the details",
        success: " ",
      });

    if (!isEmail(email))
      return setUser({
        ...user,
        err: "Invalid Email",
        success: " ",
      });

    if (isLength(password))
      return setUser({
        ...user,
        err: "Password must be of length 6",
        success: " ",
      });

    if (!isMatch(password, cf_password))
      return setUser({
        ...user,
        err: "Confirm password and password do not match",
        success: " ",
      });

    try {
      const res = await axios.post("http://localhost/api/user/register", {
        name,
        email,
        password,
      });

      setUser({
        ...user,
        err: "",
        success: res.data.msg,
      });
    } catch (err) {
      setUser({
        ...user,
        err: err.msg,
        success: " ",
      });
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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

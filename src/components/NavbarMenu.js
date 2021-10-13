import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Logo from "../assets/images/logo.svg";
import LogoWhite from "../assets/images/logo-white.svg";

const NavbarMenu = () => {
  return (
    <div>
      <nav className="navbar navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-brand">
            <a href="dashboard">
              <img
                src={
                  document.body.classList.contains("full-dark")
                    ? LogoWhite
                    : Logo
                }
                alt="Lucid Logo"
                className="img-responsive logo"
              />
            </a>
          </div>

          <div className="navbar-right">
            <form id="navbar-search" className="navbar-form search-form">
              <input
                className="form-control"
                placeholder="Search here..."
                type="text"
              />
              <button type="button" className="btn btn-default">
                <i className="icon-magnifier"></i>
              </button>
            </form>

            <div id="navbar-menu">
              <ul className="nav navbar-nav">
                <li>
                  <a
                    href="filedocuments"
                    className="icon-menu d-none d-sm-block d-md-none d-lg-block"
                  >
                    <i className="fa fa-folder-open-o"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="appcalendar"
                    className="icon-menu d-none d-sm-block d-md-none d-lg-block"
                  >
                    <i className="icon-calendar"></i>
                  </a>
                </li>
                <li>
                  <a href="appchat" className="icon-menu d-none d-sm-block">
                    <i className="icon-bubbles"></i>
                  </a>
                </li>
                <li>
                  <a href="appinbox" className="icon-menu d-none d-sm-block">
                    <i className="icon-envelope"></i>
                    <span className="notification-dot"></span>
                  </a>
                </li>

                <li>
                  <a
                    href="login"
                    className="icon-menu"
                    onClick={() => {
                      localStorage.removeItem("firstLogin");
                    }}
                  >
                    <i className="icon-login"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <nav class="navbar navbar-expand-lg ">
        <a
          class="navbar-brand"
          href="/dashboard"
          style={{ color: "violet", fontWeight: "bold" }}
        >
          Dashboard
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{
                  color: "black",
                  fontSize: "20px",
                  paddingLeft: "20px",
                }}
              >
                Virtual Trading
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#" style={{ color: "black" }}>
                  Action
                </a>
                <a class="dropdown-item" href="" style={{ color: "black" }}>
                  Another action
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" style={{ color: "black" }}>
                  Something else here
                </a>
              </div>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="#"
                style={{
                  color: "black",
                  fontSize: "20px",
                  paddingLeft: "20px",
                }}
              >
                Historical
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="/scanner"
                style={{
                  color: "black",
                  fontSize: "20px",
                  paddingLeft: "20px",
                }}
              >
                Scanner
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="#"
                style={{
                  color: "black",
                  fontSize: "20px",
                  paddingLeft: "20px",
                }}
              >
                Backtest
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="#"
                style={{
                  color: "black",
                  fontSize: "20px",
                  paddingLeft: "20px",
                }}
              >
                Pricing
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavbarMenu;

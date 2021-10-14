import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import user from "../assets/images/user.png";
import Logo from "../assets/images/logo.svg";
import LogoWhite from "../assets/images/logo-white.svg";

const NavbarMenu = () => {
  return (
    <div>
      <nav className="navbar navbar-fixed-top ">
        <div className="container">
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
                  <a href="appinbox" className="icon-menu d-none d-sm-block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-envelope"
                      viewBox="0 0 16 16"
                      style={{ color: "black" }}
                    >
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="appinbox" className="icon-menu d-none d-sm-block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-bell"
                      viewBox="0 0 16 16"
                      style={{ color: "black" }}
                    >
                      <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="appinbox" className="icon-menu d-none d-sm-block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-gear"
                      viewBox="0 0 16 16"
                      style={{ color: "black" }}
                    >
                      <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                      <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="login"
                    className="icon-menu d-none d-sm-block"
                    onClick={() => {
                      localStorage.removeItem("firstLogin");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-box-arrow-right"
                      viewBox="0 0 16 16"
                      style={{ color: "red" }}
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                      />
                    </svg>
                  </a>
                </li>
                <li className="mx-4">
                  <img
                    src={user}
                    alt="user"
                    className="img-fluid"
                    style={{
                      height: "30px",
                      borderRadius: "50px",
                      border: "1px solid black",
                    }}
                  ></img>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <nav class="navbar navbar-expand-lg navbar-fixed-top">
        <div className="container">
          <a
            class="navbar-brand"
            href="/dashboard"
            style={{ color: "#E27498 ", fontWeight: "bold", fontSize: "15px" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-microsoft"
              viewBox="0 0 16 16"
              style={{ marginRight: "10px", marginBottom: "2px" }}
            >
              <path d="M7.462 0H0v7.19h7.462V0zM16 0H8.538v7.19H16V0zM7.462 8.211H0V16h7.462V8.211zm8.538 0H8.538V16H16V8.211z" />
            </svg>
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
                    fontSize: "15px",
                    paddingLeft: "20px",
                    fontWeight: "600",
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
                    fontSize: "15px",
                    paddingLeft: "20px",
                    fontWeight: "600",
                  }}
                >
                  Historical
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="/scanners"
                  style={{
                    color: "black",
                    fontSize: "15px",
                    paddingLeft: "20px",
                    fontWeight: "600",
                  }}
                >
                  Scanners
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="#"
                  style={{
                    color: "black",
                    fontSize: "15px",
                    paddingLeft: "20px",
                    fontWeight: "600",
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
                    fontSize: "15px",
                    paddingLeft: "20px",
                    fontWeight: "600",
                  }}
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarMenu;

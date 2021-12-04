import React from "react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import user from "../assets/images/monkey.jpg";
import coin from "../assets/images/coin/coin.jpeg";

const NavbarMenu = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <div>
      <nav
        class="navbar navbar-expand-lg navbar-light"
        style={{ background: "white", borderBottom: "1px solid #ececec" }}
      >
        <div class="container">
          <a class="navbar-brand" href="/dashboard">
            Unfluke
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link">
                  {" "}
                  <div>
                    <img
                      src={coin}
                      alt="coin"
                      className="img-fluid mt-1"
                      style={{
                        height: "25px",
                      }}
                    ></img>
                  </div>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link px-0 me-3 mt-1"> {auth.user.points}</a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  href
                >
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
                </a>
                <ul
                  class="dropdown-menu"
                  aria-labelledby="navbarDropdown"
                  style={{ padding: "0px", left: "-50px" }}
                >
                  <li>
                    <a class="dropdown-item" href="/profile">
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="/change-password">
                      Change Password
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="/"
                      onClick={() => {
                        localStorage.removeItem("firstLogin");
                        localStorage.removeItem("access");
                      }}
                      style={{ color: "red" }}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
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
                  href
                >
                  Virtual Trading
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href style={{ color: "black" }}>
                    Holdings
                  </a>
                  <a class="dropdown-item" href style={{ color: "black" }}>
                    Positions
                  </a>

                  <a class="dropdown-item" href="/trading" style={{ color: "black" }}>
                    Tradings
                  </a>
                </div>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href
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
                  href
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
                  href="/pricing"
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

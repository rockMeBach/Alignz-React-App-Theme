import React from "react";
import "./Home.css";
const Home = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg pt-3">
        <div className="container" style={{ width: "1100px" }}>
          <a className="navbar-brand1" href="#">
            UnFluke
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link px-4">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-4">Why Mixing?</a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-4">Fee</a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-4">FAQ</a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-4">Blog</a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-4">Support</a>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
              <li>
                {" "}
                <a className="btn btn-login mr-3" href="/login">
                  Login
                </a>
              </li>
              <li>
                {" "}
                <a className="btn btn-signup" href="/register">
                  Sign Up
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <p>Middle</p>
      {/* FOOTER */}
      <div className="container-fluid" style={{ backgroundColor: "#ffe0e5" }}>
        <div className="row">
          <div className="col-12">
            <div className="text-center text-lg-start text-muted">
              <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                <div className="me-5 d-none d-lg-block ">
                  <span style={{ color: "black", fontWeight: "600" }}>
                    Get connected with us on social networks:
                  </span>
                </div>

                <div>
                  <a href="" className="me-4 text-reset">
                    <ion-icon name="logo-youtube" size="large"></ion-icon>
                  </a>
                  <a href="" className="me-4 text-reset">
                    <ion-icon name="logo-twitter" size="large"></ion-icon>
                  </a>
                  <a href="" className="me-4 text-reset">
                    <ion-icon name="logo-instagram" size="large"></ion-icon>
                  </a>
                  <a href="" className="me-4 text-reset">
                    <ion-icon name="logo-linkedin" size="large"></ion-icon>
                  </a>
                </div>
              </section>

              <section className="">
                <div className="container text-center text-md-start mt-5">
                  <div className="row mt-3">
                    <div
                      className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4"
                      style={{ color: "black" }}
                    >
                      <h6 className="text-uppercase fw-bold mb-4">UnFluke</h6>
                      <p>
                        Here you can use rows and columns to organize your
                        footer content. Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit.
                      </p>
                    </div>

                    <div
                      className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4"
                      style={{ color: "black" }}
                    >
                      <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                      <p>
                        <a
                          href="#!"
                          className="text-reset"
                          style={{ textDecoration: "none" }}
                        >
                          Scanner
                        </a>
                      </p>
                      <p>
                        <a
                          href="#!"
                          className="text-reset"
                          style={{ textDecoration: "none" }}
                        >
                          Backtest
                        </a>
                      </p>
                      <p>
                        <a
                          href="#!"
                          className="text-reset"
                          style={{ textDecoration: "none" }}
                        >
                          Virtual Trading
                        </a>
                      </p>
                      <p>
                        <a
                          href="#!"
                          className="text-reset"
                          style={{ textDecoration: "none" }}
                        >
                          Historical Charts
                        </a>
                      </p>
                    </div>

                    <div
                      className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4"
                      style={{ color: "black" }}
                    >
                      <h6 className="text-uppercase fw-bold mb-4">
                        Useful links
                      </h6>
                      <p>
                        <a
                          href="#!"
                          className="text-reset"
                          style={{ textDecoration: "none" }}
                        >
                          Pricing
                        </a>
                      </p>
                      <p>
                        <a
                          href="#!"
                          className="text-reset"
                          style={{ textDecoration: "none" }}
                        >
                          Settings
                        </a>
                      </p>
                      <p>
                        <a
                          href="#!"
                          className="text-reset"
                          style={{ textDecoration: "none" }}
                        >
                          Orders
                        </a>
                      </p>
                      <p>
                        <a
                          href="#!"
                          className="text-reset"
                          style={{ textDecoration: "none" }}
                        >
                          Help
                        </a>
                      </p>
                    </div>

                    <div
                      className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4"
                      style={{ color: "black" }}
                    >
                      <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                      <p>
                        <ion-icon name="location-outline"></ion-icon> New York,
                        NY 10012, US
                      </p>
                      <p>
                        <ion-icon name="mail-outline"></ion-icon>{" "}
                        info@example.com
                      </p>
                      <p>
                        <ion-icon name="call-outline"></ion-icon> + 01 234 567
                        88
                      </p>
                      <p>
                        <ion-icon name="call-outline"></ion-icon> + 01 234 567
                        89
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              <div
                className="text-center p-4"
                style={{ backgroundColor: "#ffc0cb", color: "black" }}
              >
                © 2021 Copyright:
                <a
                  className="text-reset fw-bold"
                  href="/"
                  style={{ textDecoration: "none" }}
                >
                  unfluke.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

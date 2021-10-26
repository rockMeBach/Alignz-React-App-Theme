import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import PageHeader from "../../components/PageHeader";
import axios from "axios";

const Pricing = () => {
  const auth = useSelector((state) => state.auth);
  const name = auth.user.name;
  const email = auth.user.email;

  const [values, setValues] = useState({
    amount: 0,
    orderID: "",
    error: "",
    success: false,
  });
  const { amount, orderID, error, success } = values;

  const createOrder = async (a) => {
    const res = await axios
      .get(`http://localhost/api/payment/createOrder?amount=${a}`)
      .then((res) => res)
      .catch((err) => console.log(err));
    if (res) {
      setValues({
        error: "",
        success: true,
        orderID: res.data.id,
        amount: res.data.amount,
      });
    }
  };

  const showRazorPay = () => {
    const form = document.createElement("form");
    form.setAttribute("action", "http://localhost/api/payment/callback");
    form.setAttribute("method", "POST");
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.setAttribute("data-key", "rzp_test_yPJvTUYJKWzCa6");
    script.setAttribute("data-amount", amount);
    script.setAttribute("data-name", "Unfluke");
    script.setAttribute("data-prefill.contact", "9650324051");
    script.setAttribute("data-prefill.email", email);
    script.setAttribute("data-order_id", orderID);
    script.setAttribute("data-prefill.name", name);
    document.getElementById("root").appendChild(form);
    form.appendChild(script);
    console.log(form);

    script.onload = () => {
      console.log(form.childNodes[1]);
      form.childNodes[1].click();
      form.childNodes[1].style.display = "none";
    };
  };

  useEffect(() => {
    if (amount && orderID && amount > 0 && orderID !== "") {
      showRazorPay();
    }
  }, [values]);
  return (
    <div
      style={{ flex: 1 }}
      onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}
    >
      <div>
        <div className="container">
          <PageHeader
            HeaderText="Pricing"
            Breadcrumb={[{ name: "Pricing", navigate: "" }]}
          />
          <div className="row clearfix">
            <div className="col-lg-4 col-md-12">
              <div className="card pricing2">
                <div className="body">
                  <div className="pricing-plan">
                    {/* <img alt="" className="pricing-img" src={imag} /> */}
                    <h2 className="pricing-header">Tier 1</h2>
                    <ul className="pricing-features">
                      <li>Responsive Design</li>
                      <li>Color Customization</li>
                      <li>HTML5 &amp; CSS3</li>
                      <li>Styled elements</li>
                    </ul>
                    <span className="pricing-price">FREE</span>
                    <a
                      className="btn btn-primary"
                      onClick={() => createOrder(0)}
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="card pricing2">
                <div className="body">
                  <div className="pricing-plan">
                    {/* <img alt="" className="pricing-img" src={imag} /> */}
                    <h2 className="pricing-header">Tier 2</h2>
                    <ul className="pricing-features">
                      <li>Responsive Design</li>
                      <li>Color Customization</li>
                      <li>HTML5 &amp; CSS3</li>
                      <li>Styled elements</li>
                    </ul>
                    <span className="pricing-price">Rs.199</span>
                    <a
                      className="btn btn-primary"
                      onClick={() => createOrder(199)}
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="card pricing2">
                <div className="body">
                  <div className="pricing-plan">
                    {/* <img alt="" className="pricing-img" src={imag} /> */}
                    <h2 className="pricing-header">tier 3</h2>
                    <ul className="pricing-features">
                      <li>Responsive Design</li>
                      <li>Color Customization</li>
                      <li>HTML5 &amp; CSS3</li>
                      <li>Styled elements</li>
                    </ul>
                    <span className="pricing-price">Rs.399</span>
                    <a
                      className="btn btn-primary"
                      onClick={() => createOrder(399)}
                    >
                      Buy Now
                    </a>
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

export default Pricing;

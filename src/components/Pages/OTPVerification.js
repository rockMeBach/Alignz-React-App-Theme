import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BACKEND_URL from "../../Backend_url";
import axios from "axios";
const OTPVerification = ({ closeModalUpper, data1 }) => {
  const [otpCode, setOtpCode] = useState("");
  const auth = useSelector((state) => state.auth);
  //   const closeModal = () => {
  //     closeModalUpper();
  //   };
  console.log("suhas", data1);
  const OTPVerify = async () => {
    const res = await axios.post(
      `http://${BACKEND_URL}/api/phone/verifyOTP?id=${auth.user._id}&otp=${otpCode}`,
      { phone: data1.phone, hash: data1.hash }
    );
    if (res.status === 200) {
      closeModalUpper();
      window.location.reload();
    }
  };

  useEffect(() => {
    document.getElementById("staticBackdropLive").style.background =
      "rgba(0, 0, 0, 0.9)";
  }, []);

  return (
    <div>
      <div
        class="modal fade show blur"
        id="staticBackdropLive"
        style={{ display: "block" }}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLiveLabel"
        aria-modal="true"
        role="dialog"
        onDoubleClick={(e) => e.preventDefault()}
      >
        <div class="modal-dialog">
          <div
            class="modal-content"
            style={{ width: "max-content", padding: "0.5rem 1.5rem" }}
          >
            <div class="modal-header">
              <h1>Enter the Verification Code</h1>
            </div>
            <div class="modal-body" style={{ margin: "0" }}>
              <div class="input-group">
                <input
                  type="Number"
                  class="form-control"
                  placeholder="Enter 6 digit OTP code"
                  value={otpCode}
                  onChange={(e) => {
                    e.preventDefault();
                    setOtpCode(e.target.value);
                  }}
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={OTPVerify}
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OTPVerification;

import React, { useState } from "react";
import PageHeader from "../PageHeader";
import axios from "axios";
import { useSelector } from "react-redux";
import BACKEND_URL from "../../Backend_url";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../screens/Auth/Notification/Notification";
import {
  isEmpty,
  isLength,
  isEmail,
  isMatch,
  isPhone,
} from "../../screens/Auth/Validation";
const ChangePassword = () => {
  const auth = useSelector((state) => state.auth);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const changeYourPassword = async () => {
    if (
      isEmpty(oldPassword) ||
      isEmpty(newPassword) ||
      isEmpty(confirmPassword)
    ) {
      return setError("Please fill all the Details.");
    }
    if (
      isLength(oldPassword) ||
      isLength(newPassword) ||
      isLength(confirmPassword)
    ) {
      return setError("The password must be of length 6");
    }
    if (!isMatch(newPassword, confirmPassword))
      return setError("Password did not match.");
    try {
      const res = await axios.post(
        `http://${BACKEND_URL}/api/user/changePassword`,
        { userId: auth.user._id, oldPassword, newPassword }
      );
      return setSuccess("Password changed Successfully");
    } catch (err) {
      return setError(err.response.data.msg);
    }
  };
  return (
    <div>
      <div className="container">
        <PageHeader
          HeaderText="Pricing"
          Breadcrumb={[{ name: "Change Password", navigate: "" }]}
        />
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">Change Your Password</h1>
          </div>
        </div>
        {error && showErrMsg(error)}
        {success && showSuccessMsg(success)}
        <div className="col-12 my-4 px-5">
          <label for="inputPassword5" class="form-label">
            Old Password
          </label>
          <input
            type="password"
            id="inputPassword5"
            class="form-control"
            onChange={(e) => {
              e.preventDefault();
              setOldPassword(e.target.value);
            }}
            value={oldPassword}
          />
        </div>
        <div className="col-12 my-4 px-5">
          <label for="inputPassword5" class="form-label">
            New Password
          </label>
          <input
            type="password"
            id="inputPassword5"
            class="form-control"
            onChange={(e) => {
              e.preventDefault();
              setNewPassword(e.target.value);
            }}
            value={newPassword}
          />
          <div id="passwordHelpBlock" class="form-text">
            Your password must be atleast 6 characters long.
          </div>
        </div>
        <div className="col-12 my-4 px-5">
          <label for="inputPassword5" class="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="inputPassword5"
            class="form-control"
            onChange={(e) => {
              e.preventDefault();
              setConfirmPassword(e.target.value);
            }}
            value={confirmPassword}
          />
        </div>
        <div className="col-12 my-4 px-5">
          <button
            type="button"
            class="btn"
            style={{ background: "rgb(226, 116, 152)", color: "white" }}
            onClick={(e) => {
              e.preventDefault();
              changeYourPassword();
            }}
          >
            Change your Password
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChangePassword;

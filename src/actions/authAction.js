import ACTIONS from "./index";
import axios from "axios";
import BACKEND_URL from "../Backend_url";

export const dispatchLogin = () => {
  return {
    type: ACTIONS.LOGIN,
  };
};

export const fetchUser = async (token) => {
  let res;
  try {
    res = await axios.get(`http://${BACKEND_URL}/api/user/info`, {
      headers: { Authorization: token },
    });
    return res;
  } catch (err) {
    localStorage.removeItem("firstLogin");
    localStorage.removeItem("access");
  }

  console.log("suhas", res);
};

export const dispatchGetUser = (res) => {
  if (!res) {
    localStorage.removeItem("firstLogin");
    localStorage.removeItem("access");
    return (window.location.href = "http://localhost:3000/login");
  }
  return {
    type: ACTIONS.GET_USER,
    payload: {
      user: res.data,
      isAdmin: res.data.role === 1 ? true : false,
    },
  };
};

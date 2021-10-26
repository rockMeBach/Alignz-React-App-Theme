import { combineReducers } from "redux";
import navigationReducer from "./navigationReducer";
import analyticalReducer from "./analyticalReducer";
import demographicReducer from "./demographicReducer";
import ioTReducer from "./ioTReducer";
import mailInboxReducer from "./mailInboxReducer";
import UIElementsReducer from "./UIElementsReducer";
import auth from "./authReducer";
import token from "./tokenReducer";
import users from "./usersReducer";
// import scannerReducer from "./scannerReducer";

export default combineReducers({
  auth,
  token,
  users,
  // scannerReducer,
  navigationReducer: navigationReducer,
  analyticalReducer: analyticalReducer,
  demographicReducer: demographicReducer,
  ioTReducer: ioTReducer,
  mailInboxReducer: mailInboxReducer,
  UIElementsReducer: UIElementsReducer,
});

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

export default combineReducers({
  auth,
  token,
  users,
  navigationReducer: navigationReducer,
  analyticalReducer: analyticalReducer,
  demographicReducer: demographicReducer,
  ioTReducer: ioTReducer,
  mailInboxReducer: mailInboxReducer,
  UIElementsReducer: UIElementsReducer,
});

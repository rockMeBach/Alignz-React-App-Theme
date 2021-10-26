import ACTIONS from "../actions/";

const scannerCondition = [];

const scannerReducer = (state = scannerCondition, action) => {
  switch (action.type) {
    case ACTIONS.SCANNER:
      return action.payload;
    default:
      return state;
  }
};

export default scannerReducer;

import { SHOW_ALERT, HIDDEN_ALERT } from "../../types";
const alertReducer = (state, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        alert: action.payload,
      };
    case HIDDEN_ALERT:
      return {
        alert: null,
      };
    default:
      return state;
  }
};
export default alertReducer;

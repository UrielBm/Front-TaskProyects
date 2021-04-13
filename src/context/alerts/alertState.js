import { useReducer } from "react";
import { SHOW_ALERT, HIDDEN_ALERT } from "../../types";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
const AlertState = (props) => {
  const initialState = {
    alert: null,
  };
  const [state, dispatch] = useReducer(alertReducer, initialState);
  const showAlert = (msg, category) => {
    dispatch({
      type: SHOW_ALERT,
      payload: {
        msg,
        category,
      },
    });
    setTimeout(() => {
      dispatch({
        type: HIDDEN_ALERT,
      });
    }, 5000);
  };
  return (
    <AlertContext.Provider value={{ alert: state.alert, showAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};
export default AlertState;

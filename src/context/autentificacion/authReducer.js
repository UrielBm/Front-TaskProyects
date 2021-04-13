import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  GET_USER,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  LOGOUT,
} from "../../types";
const authReducer = (state, action) => {
  switch (action.type) {
    case REGISTRO_EXITOSO:
    case LOGIN_EXITOSO:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        autenticado: true,
        mensaje: null,
        loading: false,
      };
    case GET_USER:
      return {
        ...state,
        autenticado: true,
        user: action.payload,
        loading: false,
      };
    case LOGOUT:
    case LOGIN_ERROR:
    case REGISTRO_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        autenticado: null,
        mensaje: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
export default authReducer;

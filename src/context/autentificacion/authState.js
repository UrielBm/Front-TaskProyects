import { useReducer } from "react";
import ClienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";
import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  GET_USER,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  LOGOUT,
} from "../../types";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: null,
    user: null,
    mensaje: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  const RegisterUser = async (data) => {
    try {
      const response = await ClienteAxios.post("/users/create", data);
      const token = response.data;
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: token,
      });
      //obtener Usuario
      AuthUser();
    } catch (error) {
      const alert = {
        msg: error.response.data.msg,
        category: "alerta-error",
      };
      dispatch({
        type: REGISTRO_ERROR,
        payload: alert,
      });
    }
  };
  const AuthUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const response = await ClienteAxios.get("/auth/user");
      const User = response.data;
      dispatch({
        type: GET_USER,
        payload: User,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };
  const DoLogin = async (data) => {
    try {
      const response = await ClienteAxios.post("/auth", data);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: response.data,
      });
      AuthUser();
    } catch (error) {
      const alert = {
        msg: error.response.data.msg,
        category: "alerta-error",
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alert,
      });
    }
  };
  const LogOut = () => {
    dispatch({
      type: LOGOUT,
    });
  };
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        user: state.user,
        mensaje: state.mensaje,
        loading: state.loading,
        RegisterUser,
        AuthUser,
        DoLogin,
        LogOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;

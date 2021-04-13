import { useReducer } from "react";
import ProjectContext from "./projectContext";
import ProjectReducer from "./projectReducer";
import {
  FORMULARIO_PROJECT,
  GET_PROYECTOS,
  SET_PROYECTOS,
  ERROR_CREATE,
  PROYECTO_ACTUAL,
  DELETE_PROYECTO,
  ERROR_PROYECTO,
} from "../../types";
import ClienteAxios from "../../config/axios";
const ProyectoState = (props) => {
  const initialState = {
    proyectos: [],
    formulario: false,
    error_form: false,
    proyecto_actual: null,
    mensaje: null,
  };
  const [state, dispatch] = useReducer(ProjectReducer, initialState);
  // serie de funciones para el CRUD
  const showForm = () => {
    dispatch({
      type: FORMULARIO_PROJECT,
    });
  };
  const GetProyectos = async () => {
    try {
      const response = await ClienteAxios.get("/projects");
      dispatch({
        type: GET_PROYECTOS,
        payload: response.data,
      });
    } catch (error) {
      const alert = {
        msg: "hubo un error al obtener lista de proyectos",
        category: "alerta-error",
      };
      dispatch({
        type: ERROR_PROYECTO,
        payload: alert,
      });
    }
  };
  const SetProyectos = async (proyecto) => {
    try {
      const response = await ClienteAxios.post("/project/create", proyecto);
      dispatch({
        type: SET_PROYECTOS,
        payload: response.data,
      });
    } catch (error) {
      const alert = {
        msg: "hubo un error al registrar proyecto",
        category: "alerta-error",
      };
      dispatch({
        type: ERROR_PROYECTO,
        payload: alert,
      });
    }
  };
  const SetErrorCreate = () => {
    dispatch({
      type: ERROR_CREATE,
    });
  };
  const SetProyectoActual = (proyectoId) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId,
    });
  };
  const SetDeleteProyecto = async (proyectoId) => {
    try {
      await ClienteAxios.delete(`/project/delete/${proyectoId}`);
      dispatch({
        type: DELETE_PROYECTO,
        payload: proyectoId,
      });
    } catch (error) {
      const alert = {
        msg: "hubo un error al eliminar proyecto",
        category: "alerta-error",
      };
      dispatch({
        type: ERROR_PROYECTO,
        payload: alert,
      });
    }
  };
  return (
    <ProjectContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        error_form: state.error_form,
        proyecto_actual: state.proyecto_actual,
        mensaje: state.mensaje,
        showForm,
        GetProyectos,
        SetProyectos,
        SetErrorCreate,
        SetProyectoActual,
        SetDeleteProyecto,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};
export default ProyectoState;

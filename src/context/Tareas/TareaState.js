import { useReducer } from "react";
import TareaContext from "./TareaContext";
import TareaReducer from "./TareaReducer";
import {
  GET_TAREAS,
  ADD_TAREAS,
  ERROR_TAREA,
  DELETE_TAREA,
  TAREA_ACTUAL,
  UPDATE_TAREA,
} from "../../types/index";
import ClienteAxios from "../../config/axios";
const TareaState = (props) => {
  const initialState = {
    tareas_proyecto: [],
    error_tarea: false,
    tarea_actual: null,
  };
  const [state, dispatch] = useReducer(TareaReducer, initialState);
  // Serie de funciones para el CRUD
  const GetTareas = async (proyectoId) => {
    try {
      const resultado = await ClienteAxios.get("/tarea", {
        params: { proyectoId },
      });
      const tareas = resultado.data;
      dispatch({
        type: GET_TAREAS,
        payload: tareas,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const AddTareas = async (tarea) => {
    try {
      const response = await ClienteAxios.post("/tarea/create", tarea);
      const newTarea = response.data;
      dispatch({
        type: ADD_TAREAS,
        payload: newTarea,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  const SetErrorTarea = () => {
    dispatch({
      type: ERROR_TAREA,
    });
  };
  const DeleteTarea = async (tareaId, proyectoId) => {
    try {
      await ClienteAxios.delete(`/tarea/delete/${tareaId}`, {
        params: { proyectoId },
      });
      dispatch({
        type: DELETE_TAREA,
        payload: tareaId,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  const UpdateTarea = async (tarea) => {
    try {
      const response = await ClienteAxios.put(
        `/tarea/update/${tarea._id}`,
        tarea
      );
      const tarea_update = response.data;
      dispatch({
        type: UPDATE_TAREA,
        payload: tarea_update,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  const SetTareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };
  return (
    <TareaContext.Provider
      value={{
        tareas_proyecto: state.tareas_proyecto,
        error_tarea: state.error_tarea,
        tarea_actual: state.tarea_actual,
        GetTareas,
        AddTareas,
        SetErrorTarea,
        DeleteTarea,
        SetTareaActual,
        UpdateTarea,
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};
export default TareaState;

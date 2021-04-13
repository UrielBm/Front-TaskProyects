import {
  GET_TAREAS,
  ADD_TAREAS,
  ERROR_TAREA,
  DELETE_TAREA,
  TAREA_ACTUAL,
  UPDATE_TAREA,
} from "../../types/index";
const TareaReducer = (state, action) => {
  switch (action.type) {
    case GET_TAREAS:
      return {
        ...state,
        tareas_proyecto: action.payload,
        tarea_actual: null,
        error_tarea: false,
      };
    case ADD_TAREAS:
      return {
        ...state,
        tareas_proyecto: [action.payload, ...state.tareas_proyecto],
        error_tarea: false,
      };
    case ERROR_TAREA:
      return {
        ...state,
        error_tarea: true,
      };
    case DELETE_TAREA:
      return {
        ...state,
        tareas_proyecto: state.tareas_proyecto.filter(
          (tarea) => tarea._id !== action.payload
        ),
      };
    case UPDATE_TAREA:
      return {
        ...state,
        tareas_proyecto: state.tareas_proyecto.map((tarea) =>
          tarea._id === action.payload._id ? action.payload : tarea
        ),
        tarea_actual: null,
      };
    case TAREA_ACTUAL:
      return {
        ...state,
        tarea_actual: action.payload,
      };
    default:
      return state;
  }
};
export default TareaReducer;

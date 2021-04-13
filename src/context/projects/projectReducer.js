import {
  FORMULARIO_PROJECT,
  GET_PROYECTOS,
  SET_PROYECTOS,
  ERROR_CREATE,
  PROYECTO_ACTUAL,
  DELETE_PROYECTO,
  ERROR_PROYECTO,
} from "../../types";
const ProjectReducer = (state, action) => {
  switch (action.type) {
    case FORMULARIO_PROJECT:
      return {
        ...state,
        formulario: true,
      };
    case GET_PROYECTOS:
      return {
        ...state,
        proyectos: action.payload,
      };
    case SET_PROYECTOS:
      return {
        ...state,
        proyectos: [...state.proyectos, action.payload],
        formulario: false,
        error_form: false,
      };
    case ERROR_CREATE:
      return {
        ...state,
        error_form: true,
      };
    case PROYECTO_ACTUAL:
      return {
        ...state,
        proyecto_actual: state.proyectos.filter(
          (proyect) => proyect._id === action.payload
        ),
      };
    case DELETE_PROYECTO:
      return {
        ...state,
        proyectos: state.proyectos.filter(
          (proyect) => proyect._id !== action.payload
        ),
        proyecto_actual: null,
      };
    case ERROR_PROYECTO:
      return {
        ...state,
        mensaje: action.payload,
      };
    default:
      return state;
  }
};
export default ProjectReducer;

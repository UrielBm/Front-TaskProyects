import React, { useContext } from "react";
import ProjectContext from "../../context/projects/projectContext";
import TareaContext from "../../context/Tareas/TareaContext";

const Tarea = ({ Tarea }) => {
  const contextTarea = useContext(TareaContext);
  const contextProyecto = useContext(ProjectContext);
  const { DeleteTarea, GetTareas, UpdateTarea, SetTareaActual } = contextTarea;
  const { proyecto_actual } = contextProyecto;
  const [proyecto] = proyecto_actual;
  const { _id, tarea, status } = Tarea;
  const handleOnChangeStatus = (tarea) => {
    if (tarea.status) {
      tarea.status = false;
    } else {
      tarea.status = true;
    }
    UpdateTarea(tarea);
  };
  const handleOnClick = (idtarea) => {
    DeleteTarea(idtarea, proyecto._id);
    GetTareas(proyecto._id);
  };
  return (
    <li className="tarea">
      <p>{tarea}</p>
      <div className="estado">
        {status ? (
          <button
            type="button"
            className="completo"
            onClick={() => handleOnChangeStatus(Tarea)}
          >
            Completado
          </button>
        ) : (
          <button
            type="button"
            className="incompleto"
            onClick={() => handleOnChangeStatus(Tarea)}
          >
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => SetTareaActual(Tarea)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => handleOnClick(_id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;

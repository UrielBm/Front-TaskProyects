import React, { useContext } from "react";
import ProjectContext from "../../context/projects/projectContext";
import TareaContext from "../../context/Tareas/TareaContext";

const Proyecto = ({ proyecto }) => {
  const contextProyecto = useContext(ProjectContext);
  const contextTarea = useContext(TareaContext);
  const { SetProyectoActual } = contextProyecto;
  const { GetTareas } = contextTarea;
  const { name, _id } = proyecto;

  // función para agregar el proyecto Actual
  const handleOnClick = (idProyecto) => {
    SetProyectoActual(idProyecto);
    GetTareas(idProyecto);
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => handleOnClick(_id)}
      >
        {name}
      </button>
    </div>
  );
};

export default Proyecto;

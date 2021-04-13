import { useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ProjectContext from "../../context/projects/projectContext";
import TareaContext from "../../context/Tareas/TareaContext";
import Tarea from "./Tarea";
const ListTareas = () => {
  const contextProyecto = useContext(ProjectContext);
  const contextTarea = useContext(TareaContext);
  const { proyecto_actual, SetDeleteProyecto } = contextProyecto;
  const { tareas_proyecto } = contextTarea;
  if (!proyecto_actual) return <h2>Selecciona algun proyecto</h2>;
  const [proyecto] = proyecto_actual;
  return (
    <>
      <h2>Proyecto: {proyecto.name}</h2>
      <ul className="listado-tareas">
        {tareas_proyecto.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas asignadas</p>
          </li>
        ) : (
          <TransitionGroup>
            {tareas_proyecto.map((tarea) => (
              <CSSTransition key={tarea._id} timeout={300} classNames="tarea">
                <Tarea Tarea={tarea} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={() => {
          SetDeleteProyecto(proyecto._id);
        }}
      >
        Eliminar Proyecto &times;
      </button>
    </>
  );
};

export default ListTareas;

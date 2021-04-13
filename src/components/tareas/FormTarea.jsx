import { useContext, useEffect, useState } from "react";
import ProjectContext from "../../context/projects/projectContext";
import TareaContext from "../../context/Tareas/TareaContext";

const FormTarea = () => {
  const contextProyecto = useContext(ProjectContext);
  const contextTarea = useContext(TareaContext);
  const { proyecto_actual } = contextProyecto;
  const {
    error_tarea,
    tarea_actual,
    AddTareas,
    SetErrorTarea,
    GetTareas,
    UpdateTarea,
  } = contextTarea;
  const [Tarea, setTarea] = useState({
    tarea: "",
  });
  useEffect(() => {
    if (tarea_actual) {
      setTarea(tarea_actual);
    } else {
      setTarea({
        tarea: "",
      });
    }
  }, [tarea_actual]);
  if (!proyecto_actual) return null;
  const [Proyecto] = proyecto_actual;
  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setTarea({ ...Tarea, [name]: value });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    //validación de tareas
    if (tarea.trim() === "") {
      SetErrorTarea();
      return;
    }
    if (tarea_actual === null) {
      //creación de una nueva tarea Y agregando tarea al state de tareas
      Tarea.proyectoId = Proyecto._id;
      AddTareas(Tarea);
    } else {
      UpdateTarea(Tarea);
    }
    //Actualizando lista tareas con la tarea nueva
    GetTareas(Proyecto._id);
    // reset valores de la tarea
    setTarea({ tarea: "" });
  };
  const { tarea } = Tarea;
  return (
    <div className="formulario">
      <form onSubmit={handleOnSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="nombre de la tarea"
            name="tarea"
            value={tarea}
            onChange={handleOnChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            value={tarea_actual ? "Editar Tarea" : "Agregar Tarea"}
            className="btn btn-primario btn-block btn-submit"
          />
        </div>
      </form>
      {error_tarea ? (
        <p className="mensaje error">Ingresa el nombre de la tarea</p>
      ) : null}
    </div>
  );
};

export default FormTarea;

import React, { useContext, useState } from "react";
import ProjectContext from "../../context/projects/projectContext";
const FormNewProject = () => {
  const proyectContext = useContext(ProjectContext);
  const {
    formulario,
    error_form,
    showForm,
    SetProyectos,
    SetErrorCreate,
  } = proyectContext;
  const [proyecto, setproyecto] = useState({
    name: "",
  });
  const { name } = proyecto;
  //función de captura del valor del input
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setproyecto({
      ...proyecto,
      [name]: value,
    });
  };
  // función del envio del form
  const handleOnSubmit = (e) => {
    e.preventDefault();
    // validación del form
    if (name.trim() === "") {
      SetErrorCreate();
      return;
    }
    // send del form
    SetProyectos(proyecto);
    // reset de form
    setproyecto({
      name: "",
    });
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={() => showForm()}
      >
        Crear Proyecto
      </button>
      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={handleOnSubmit}>
          {error_form ? (
            <p className="mensaje error">El campo nombre es requerido</p>
          ) : null}

          <input
            type="text"
            className="input-text"
            placeholder="Nombre del proyecto"
            name="name"
            value={name}
            onChange={handleOnChange}
          />
          <input
            type="submit"
            className="btn btn-block btn-primario"
            value="Agregar"
          />
        </form>
      ) : null}
    </>
  );
};

export default FormNewProject;

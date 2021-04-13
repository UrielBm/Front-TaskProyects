import React from "react";
import FormNewProject from "../proyectos/FormNewProject";
import ListadoProyectos from "../proyectos/ListadoProyectos";

const SideBar = () => {
  return (
    <aside>
      <h1>
        Task<span>Projects</span>
        <FormNewProject />
      </h1>
      <div className="proyectos">
        <ListadoProyectos />
      </div>
    </aside>
  );
};

export default SideBar;

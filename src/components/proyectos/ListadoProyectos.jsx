import { useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AlertContext from "../../context/alerts/alertContext";
import ProjectContext from "../../context/projects/projectContext";
import Proyecto from "./Proyecto";

const ListadoProyectos = () => {
  // Use de Context trayendo los estados.
  const Projectcontext = useContext(ProjectContext);
  const contextAlert = useContext(AlertContext);
  const { mensaje, proyectos, GetProyectos } = Projectcontext;
  const { alert, showAlert } = contextAlert;
  useEffect(() => {
    if (mensaje) {
      showAlert(mensaje.msg, mensaje.category);
    }
    GetProyectos();
    // eslint-disable-next-line
  }, [mensaje]);
  return (
    <>
      <h2>Lista de proyectos:</h2>
      <div className="listado-proyectos">
        {alert ? (
          <div className={`alerta ${alert.category}`}>{alert.msg}</div>
        ) : null}
        {proyectos.length === 0 ? (
          <p className="center">Inicia registrando un proyecto</p>
        ) : (
          <TransitionGroup>
            {proyectos.map((proyecto) => (
              <CSSTransition
                key={proyecto._id}
                timeout={300}
                classNames="proyecto"
              >
                <Proyecto proyecto={proyecto} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </div>
    </>
  );
};

export default ListadoProyectos;

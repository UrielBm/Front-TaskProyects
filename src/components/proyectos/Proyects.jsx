import { useContext, useEffect } from "react";
import AuthContext from "../../context/autentificacion/authContext";
import HomeBar from "../layout/HomeBar";
import FormTarea from "../tareas/FormTarea";
import ListTareas from "../tareas/ListTareas";
import SideBar from "./../layout/SideBar";
const Proyects = () => {
  const contextAuth = useContext(AuthContext);
  //extraer la info de autentificacion
  const { AuthUser } = contextAuth;
  useEffect(() => {
    AuthUser();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="contenedor-app">
      <SideBar />
      <div className="seccion-principal">
        <HomeBar />
        <main>
          <FormTarea />
          <div className="contenedor-tareas">
            <ListTareas />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Proyects;

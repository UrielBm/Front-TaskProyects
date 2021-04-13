import { useContext, useEffect } from "react";
import AuthContext from "../../context/autentificacion/authContext";
const HomeBar = () => {
  const contextAuth = useContext(AuthContext);
  const { user, AuthUser, LogOut } = contextAuth;
  useEffect(() => {
    AuthUser();
    //eslint-disable-next-line
  }, []);
  return (
    <header className="app-header">
      {user ? (
        <p className="nombre-usuario">
          Bienvenido: <span>{user.user_name}</span>
        </p>
      ) : null}
      <nav className="nav-principal">
        <button
          className="btn btn-blank cerrar-sesion"
          onClick={() => LogOut()}
        >
          Cerrar Sesion
        </button>
      </nav>
    </header>
  );
};

export default HomeBar;

import { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router";
import AuthContext from "../../context/autentificacion/authContext";
const RutaPrivada = ({ component: Component, ...props }) => {
  const contextAuth = useContext(AuthContext);
  const { autenticado, loading, AuthUser } = contextAuth;
  useEffect(() => {
    AuthUser();
    //eslint-disable-next-line
  }, []);
  return (
    <Route
      {...props}
      render={(props) =>
        !autenticado && !loading ? <Redirect to="/" /> : <Component />
      }
    ></Route>
  );
};

export default RutaPrivada;

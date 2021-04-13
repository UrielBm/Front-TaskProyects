import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlertContext from "../../context/alerts/alertContext";
import AuthContext from "../../context/autentificacion/authContext";
import { useHistory } from "react-router-dom";
const Login = () => {
  let history = useHistory();
  const contextAlert = useContext(AlertContext);
  const contextAuth = useContext(AuthContext);
  const { alert, showAlert } = contextAlert;
  const { mensaje, autenticado, DoLogin } = contextAuth;
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (autenticado) {
      history.push("/projects");
    }
    if (mensaje) {
      showAlert(mensaje.msg, mensaje.category);
    }
    //eslint-disable-next-line
  }, [mensaje, autenticado, history]);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();

    // validación del form
    if (email.trim() === "" || password.trim() === "") {
      showAlert("Todos los campos son obligatorios", "alerta-error");
      return;
    }
    DoLogin(user);
    setUser({
      email: "",
      password: "",
    });
  };
  const { email, password } = user;
  return (
    <div className="form-usuario">
      {alert ? (
        <div className={`alerta ${alert.category}`}>{alert.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Login</h1>
        <form onSubmit={handleOnSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="ingresa tu email"
              value={email}
              onChange={handleOnChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="ingresa tu password"
              value={password}
              onChange={handleOnChange}
            />
          </div>
          <div className="campo-form">
            <button type="submit" className="btn btn-primario btn-block">
              Login
            </button>
          </div>
        </form>
        <div className="wrapperLink">
          <Link to="/register" className="enlace-cuenta">
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

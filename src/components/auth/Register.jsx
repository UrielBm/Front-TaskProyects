import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlertContext from "../../context/alerts/alertContext";
import AuthContext from "../../context/autentificacion/authContext";
import { useHistory } from "react-router-dom";
const Register = () => {
  let history = useHistory();
  const contextAlert = useContext(AlertContext);
  const contextAuth = useContext(AuthContext);
  const { autenticado, mensaje, RegisterUser } = contextAuth;
  const { alert, showAlert } = contextAlert;
  const [user, setUser] = useState({
    user_name: "",
    email: "",
    password: "",
    confirmar_password: "",
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
    if (
      user_name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar_password.trim() === ""
    ) {
      showAlert("Todos los campos son obligatorios", "alerta-error");
      return;
    }
    if (password.length < 8) {
      showAlert(
        "El password debe de ser minimo de 8 caracteres",
        "alerta-error"
      );
      return;
    }
    if (password !== confirmar_password) {
      showAlert("Error, los passwords no son iguales", "alerta-error");
      return;
    }
    RegisterUser({
      user_name,
      email,
      password,
    });
    setUser({
      user_name: "",
      email: "",
      password: "",
      confirmar_password: "",
    });
  };
  const { user_name, email, password, confirmar_password } = user;
  return (
    <div className="form-usuario">
      {alert ? (
        <div className={`alerta ${alert.category}`}>{alert.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Registro</h1>
        <form onSubmit={handleOnSubmit}>
          <div className="campo-form">
            <label htmlFor="user_name">User Name:</label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              placeholder="ingresa tu user Name"
              value={user_name}
              onChange={handleOnChange}
            />
          </div>
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
              autoComplete="true"
            />
          </div>
          <div className="campo-form">
            <label htmlFor="confirmar_password">Confirmar Password:</label>
            <input
              type="password"
              id="confirmar_password"
              name="confirmar_password"
              placeholder="Confirma tu password"
              value={confirmar_password}
              onChange={handleOnChange}
              autoComplete="true"
            />
          </div>
          <div className="campo-form">
            <button type="submit" className="btn btn-primario btn-block">
              Registrarse
            </button>
          </div>
        </form>
        <div className="wrapperLink">
          <Link to="/" className="enlace-cuenta">
            Hacer Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

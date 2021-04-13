import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Proyects from "./components/proyectos/Proyects";
import RutaPrivada from "./components/rutas/RutaPrivada";
import tokenAuth from "./config/tokenAuth";
import AlertState from "./context/alerts/alertState";
import AuthState from "./context/autentificacion/authState";
import ProyectoState from "./context/projects/projectState";
import TareaState from "./context/Tareas/TareaState";

const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}
function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/">
                  <Login />
                </Route>
                <Route exact path="/register">
                  <Register />
                </Route>
                <RutaPrivada exact path="/projects" component={Proyects} />
              </Switch>
            </Router>
          </AuthState>
        </AlertState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;

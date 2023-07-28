import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para cambiar el estado de autenticación cuando el usuario se ha validado
  const handleAuthentication = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <Router>
      <div>
        <Switch>
          {/* Ruta para el Inicio de Sesión */}
          <Route exact path="/login">
            {isAuthenticated ? <Redirect to="/home" /> : <Login handleAuthentication={handleAuthentication} />}
          </Route>

          {/* Ruta para el Registro */}
          <Route exact path="/register">
            {isAuthenticated ? <Redirect to="/home" /> : <Register handleAuthentication={handleAuthentication} />}
          </Route>

          {/* Ruta para el Home */}
          <Route exact path="/home">
            {isAuthenticated ? <Home /> : <Redirect to="/login" />}
          </Route>

          {/* Redireccionar a /login si se intenta acceder a otra ruta */}
          <Route path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

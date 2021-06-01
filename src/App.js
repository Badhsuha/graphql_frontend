import { React, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { AutProvider } from "./context/auth";

function App() {
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.split("/")[1].toLowerCase();
  const [active, setActive] = useState(path);

  return (
    <AutProvider>
      <Container>
        <Router>
          <Navbar setActive={setActive} active={active} />
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/login"
            render={(props) => <Login props={props} setActive={setActive} />}
          />
          <Route
            exact
            path="/register"
            render={(props) => <Register props={props} setActive={setActive} />}
          />
        </Router>
      </Container>
    </AutProvider>
  );
}

export default App;

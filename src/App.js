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
import AuthRoute from "./utils/AuthRoute";
import SinglePost from "./components/SinlePost";

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
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/post/:postId" component={SinglePost} />
        </Router>
      </Container>
    </AutProvider>
  );
}

export default App;

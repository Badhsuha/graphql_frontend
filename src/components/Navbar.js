import { React, useContext } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

function Navbar({ active, setActive }) {
  const handleItemClick = (e, { name }) => setActive(name);

  const { user, logout } = useContext(AuthContext);

  const logoutbtn = (e) => {
    setActive("login");
    logout();
  };
  const menubar = user ? (
    <Menu color="teal" size="large">
      <Menu.Item
        color="teal"
        name={user.username}
        active
        onClick={handleItemClick}
        as={Link}
        to="/"
      ></Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item
          color="teal"
          name="logout"
          onClick={logoutbtn}
          as={Link}
          to="/login"
        ></Menu.Item>
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu color="teal" size="large">
      <Menu.Item
        color="teal"
        name="home"
        active={active === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      ></Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item
          color="teal"
          name="login"
          active={active === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/Login"
        ></Menu.Item>

        <Menu.Item
          color="teal"
          name="register"
          active={active === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/Register"
        ></Menu.Item>
      </Menu.Menu>
    </Menu>
  );

  return menubar;
}

export default Navbar;

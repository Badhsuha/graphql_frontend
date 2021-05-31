import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

function Navbar({ active, setActive }) {
  const handleItemClick = (e, { name }) => setActive(name);

  return (
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
}

export default Navbar;

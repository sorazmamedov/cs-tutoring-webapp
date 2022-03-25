import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import useModal from "../hooks/useModalStates";
import TemplateModal from "./common/templateModal";
import Login from "./Login";

const Header = () => {
  const { show, title, ModalBody, reset, setShow, setTitle, setModalBody } =
    useModal();

  const navs = {
    Semester: "/",
    Profile: "/profile",
    Settings: "/settings",
  };

  const links = Object.keys(navs).map((key, index) => (
    <NavLink
      key={++index}
      to={`${navs[key]}`}
      className={({ isActive }) =>
        isActive ? "nav-link activeNav" : "nav-link"
      }
    >
      {key}
    </NavLink>
  ));

  const handleLogin = () => {
    setTitle("Sign In");
    setModalBody(<Login />);
    setShow(true);
  };

  return (
    <header>
      <Navbar variant="dark">
        <Container className="p-0">
          <Nav className="w-100 d-flex justify-content-between">
            {links}
            <Nav.Link onClick={handleLogin}>Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <TemplateModal {...{ show, title, ModalBody, reset }} />
    </header>
  );
};

export default Header;

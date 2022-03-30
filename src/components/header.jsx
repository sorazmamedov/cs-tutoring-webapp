import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import useModal from "../hooks/useModalStates";
import TemplateModal from "./common/templateModal";
import Login from "./Login";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { auth, ROLES, setAuth } = useAuth();
  const { show, title, ModalBody, reset, setShow, setTitle, setModalBody } =
    useModal();

  const classes = ({ isActive }) =>
    isActive ? "nav-link activeNav" : "nav-link";

  const handleLogin = () => {
    setTitle("Sign In");
    setModalBody(<Login />);
    setShow(true);
  };

  const handleLogout = () => {
    setAuth({});
  };

  return (
    <header>
      <Navbar variant="dark">
        <Container className="p-0">
          <Nav className="w-100 d-flex justify-content-between">
            <NavLink to="/" className={classes}>
              Semester
            </NavLink>
            {auth?.user && (
              <>
                <NavLink to="/profile" className={classes}>
                  Profile
                </NavLink>
                {auth?.user?.roles.includes(ROLES.Admin) && (
                  <NavLink to="/settings" className={classes}>
                    Settings
                  </NavLink>
                )}
              </>
            )}
            {auth?.user ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <Nav.Link onClick={handleLogin}>Login</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      <TemplateModal {...{ show, title, ModalBody, reset, size: "" }} />
    </header>
  );
};

export default Header;

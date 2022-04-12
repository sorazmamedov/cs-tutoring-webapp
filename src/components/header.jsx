import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import useModal from "../hooks/useModalStates";
import TemplateModal from "./common/templateModal";
import Login from "./Login";
import Logout from "./Logout";
import useAuth from "../hooks/useAuth";
import {
  GlobalActionsContext,
  GlobalViewContext,
} from "../Context/dataContext";

const Header = () => {
  const { darkTheme } = useContext(GlobalViewContext);
  const { setDarkTheme } = useContext(GlobalActionsContext);
  const { auth, ROLES } = useAuth();
  const {
    show,
    title,
    ModalBody,
    size,
    reset,
    setShow,
    setTitle,
    setModalBody,
    setSize,
  } = useModal();

  const classes = ({ isActive }) =>
    isActive ? "nav-link activeNav" : "nav-link";

  const handleLogin = () => {
    setTitle("Sign In");
    setSize("");
    setShow(true);
    setModalBody(<Login reset={reset} />);
  };

  const handleLogout = () => {
    setTitle("Are you sure you want to log out?");
    setSize("");
    setModalBody(<Logout reset={reset} />);
    setShow(true);
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
            <NavLink
              to="*"
              className={classes}
              onClick={(e) => {
                e.preventDefault();
                setDarkTheme(!darkTheme);
              }}
            >
              {darkTheme ? "Light" : "Dark"}
            </NavLink>
            {auth?.user ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <Nav.Link onClick={handleLogin}>Login</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      <TemplateModal {...{ show, title, ModalBody, reset, size }} />
    </header>
  );
};

export default Header;

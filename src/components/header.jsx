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
import { SunIcon, MoonIcon } from "./common/iconsWithTooltip";
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

  const handleLogin = () => {
    setTitle("Sign In");
    setSize("");
    setShow(true);
    setModalBody(<Login reset={reset} />);
  };

  const handleLogout = () => {
    setTitle("Are you sure you want to sign out?");
    setSize("");
    setModalBody(<Logout {...{ reset, setTitle }} />);
    setShow(true);
  };

  return (
    <header>
      <Container className="p-0">
        <Navbar variant="dark">
          <Nav className="w-100 d-flex justify-content-between">
            <NavLink to="/" className="nav-link">
              Semester
            </NavLink>
            {auth?.user && (
              <>
                <NavLink to="/profile" className="nav-link">
                  Profile
                </NavLink>
                {/* {auth?.user?.roles.includes(ROLES.Admin) && (
                  <NavLink to="/settings" className="nav-link">
                    Settings
                  </NavLink>
                )} */}
              </>
            )}
            {auth?.user ? (
              <Nav.Link onClick={handleLogout}>Sign Out</Nav.Link>
            ) : (
              <Nav.Link onClick={handleLogin}>Sign In</Nav.Link>
            )}
            <NavLink
              to="*"
              className="nav-link py-0"
              onClick={(e) => {
                e.preventDefault();
                setDarkTheme(!darkTheme);
              }}
            >
              {darkTheme ? <SunIcon /> : <MoonIcon />}
            </NavLink>
          </Nav>
        </Navbar>
      </Container>
      <TemplateModal {...{ show, title, ModalBody, reset, size }} />
    </header>
  );
};

export default Header;

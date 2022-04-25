import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const navs = {
    Contact: "/Contact",
    About: "/about",
    Credits: "/credits",
  };

  const links = Object.keys(navs).map((key, index) => (
    <NavLink key={++index} to={`${navs[key]}`} className="nav-link">
      {key}
    </NavLink>
  ));
  return (
    <footer>
      <Container className="p-0">
        <Navbar variant="dark">
          <Nav className="me-auto">{links}</Nav>
        </Navbar>
      </Container>
    </footer>
  );
};

export default Footer;

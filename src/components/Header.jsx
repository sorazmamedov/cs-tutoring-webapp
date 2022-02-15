import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

const Header = ({ navs }) => {
  const links = Object.keys(navs).map((key, index) => (
    <NavLink
      key={++index}
      to={`${navs[key]}`}
      className={({ isActive }) => (isActive ? "active nav-link" : "nav-link")}
    >
      {key}
    </NavLink>
  ));

  return (
    <header>
      <Navbar variant="dark">
        <Container className="p-0">
          <Nav className="w-100 d-flex justify-content-between">{links}</Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

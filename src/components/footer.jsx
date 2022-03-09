import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const navs = {
    Semester: "/",
    Profile: "/profile",
    Settings: "/settings",
    Login: "/login",
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
  return (
    <footer>
      <Navbar variant="dark">
        <Container className="p-0">
          <Nav className="me-auto">{links}</Nav>
        </Container>
      </Navbar>
    </footer>
  );
};

export default Footer;

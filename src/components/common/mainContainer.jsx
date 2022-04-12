import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import { GlobalViewContext } from "../../Context/dataContext";

const MainContainer = ({ className, children, ...props }) => {
  const { darkTheme } = useContext(GlobalViewContext);
  const defaults = darkTheme ? "shadow-dark p-3 mb-4" : "shadow p-3 mb-4";

  return (
    <Container className={className || defaults} {...props}>
      {children}
    </Container>
  );
};

export default MainContainer;

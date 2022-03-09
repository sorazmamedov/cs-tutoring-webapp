import React from "react";
import Container from "react-bootstrap/Container";

const MainContainer = ({ className, children, ...props }) => {
  const defaults = "shadow p-3 mb-4";

  return (
    <Container className={className || defaults} {...props}>
      {children}
    </Container>
  );
};

export default MainContainer;

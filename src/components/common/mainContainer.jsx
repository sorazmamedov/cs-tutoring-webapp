import React from "react";
import Container from "react-bootstrap/Container";
import TitleBar from "./titleBar";

const MainContainer = ({className, title, children, icon }) => {
  const defaults = "shadow p-3 mb-4";

  return (
    <Container className={className || defaults}>
      {(title || icon) && <TitleBar title={title} children={icon} />}
      {children}
    </Container>
  );
};

export default MainContainer;

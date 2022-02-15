import React from "react";
import Container from "react-bootstrap/Container";
import TitleBar from "./TitleBar";

const MainContainer = ({ title, children, icon }) => {
  return (
    <Container className="shadow p-3 mb-4 mt-0 rounded-3">
      {(title || icon) && <TitleBar title={title} children={icon} />}
      {children}
    </Container>
  );
};

export default MainContainer;

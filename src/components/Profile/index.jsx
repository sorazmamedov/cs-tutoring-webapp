import React, { useContext } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ProfileImage from "./image";
import ProfileInfo from "./info";
import MainContainer from "../common/mainContainer";
import useAuth from "../../hooks/useAuth";
import { GlobalViewContext } from "../../Context/dataContext";

const Profile = () => {
  const { darkTheme } = useContext(GlobalViewContext);
  const { auth, setAuth, ROLES } = useAuth();

  return (
    <MainContainer>
      <Row className="mt-4">
        <Col sm={4} className="d-flex justify-content-center">
          <ProfileImage src={auth?.user?.picture} />
        </Col>
        <Col sm={8}>
          <ProfileInfo {...{ auth, setAuth, ROLES, darkTheme }} />
        </Col>
      </Row>
    </MainContainer>
  );
};

export default Profile;

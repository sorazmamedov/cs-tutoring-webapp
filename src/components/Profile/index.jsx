import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ProfileImage from "./image";
import ProfileInfo from "./info";
import MainContainer from "../common/mainContainer";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { auth } = useAuth();
  return (
    <MainContainer>
      <Row className="mt-4">
        <Col sm={4} className="d-flex justify-content-center">
          <ProfileImage src={auth?.user?.picture} />
        </Col>
        <Col sm={8} className="">
          <ProfileInfo user={auth?.user} />
        </Col>
      </Row>
    </MainContainer>
  );
};

export default Profile;

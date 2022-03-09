import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ProfileImage from "./image";
import ProfileInfo from "./info";
import MainContainer from "../common/mainContainer";

const Profile = () => {
  return (
    <MainContainer>
      <Row className="mt-4">
        <Col sm={4} className="d-flex justify-content-center">
          <ProfileImage />
        </Col>
        <Col sm={8} className="">
          <ProfileInfo />
        </Col>
      </Row>
    </MainContainer>
  );
};

export default Profile;

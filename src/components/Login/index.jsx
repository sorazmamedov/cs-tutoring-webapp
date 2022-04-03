import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import useAuth from "../../hooks/useAuth";

const Login = ({ reset }) => {
  const { errors, loading, isLogged } = useAuth();

  useEffect(() => {
    window.google.accounts.id.renderButton(
      document.getElementById("googleBtn"),
      {
        type: "standard",
        size: "large",
        theme: "filled_blue",
        text: "sign_in_with",
        shape: "rectangular",
        logo_alignment: "left",
        width: "250",
      }
    );
  });

  useEffect(() => {
    if (isLogged) {
      reset();
    }
  }, [isLogged]);

  return (
    <>
      {errors &&
        Object.entries(errors).map(([key, value]) => (
          <p
            key={key}
            className="col-10 col-lg-8 mx-auto text-center text-danger"
          >
            {value}
          </p>
        ))}
      {loading && (
        <>
          <Spinner
            as="span"
            animation="border"
            variant="primary"
            size="lg"
            role="status"
            aria-hidden="true"
            className="col-10 col-lg-8 mx-auto text-center mb-3"
          />
          <span className="visually-hidden">Saving...</span>
        </>
      )}
      <Row className="mb-3 justify-content-center">
        <Col xs="6" className="mb-5 text-center">
          <div id="googleBtn" className="d-flex justify-content-center"></div>
        </Col>
      </Row>
      <Row>
        <p className="col-10 col-lg-8 mx-auto text-center">
          Please sign in with NEIU email only!
        </p>
      </Row>
    </>
  );
};

export default Login;

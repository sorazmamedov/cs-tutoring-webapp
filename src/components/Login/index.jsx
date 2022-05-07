import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import useAuth from "../../hooks/useAuth";
import useLogin from "../../hooks/useLogin";

const Login = ({ reset }) => {
  const { errors, signingIn, isLogged } = useAuth();
  const { handleResponse } = useLogin();

  useEffect(() => {
    if (isLogged) {
      reset();
    }
  }, [isLogged, reset]);

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
      {signingIn && (
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
      <Row className="col-6 my-3 mx-auto">
        <button className="btn btn-warning mb-2" onClick={() => handleResponse("sorazmamedov@neiu.edu")}>
          Admin
        </button>
        <button
          className="btn btn-info mb-2"
          onClick={() => handleResponse("mking@neiu.edu")}
        >
          Martin Tutor
        </button>
        <button
          className="btn btn-info mb-2"
          onClick={() => handleResponse("smoe@neiu.edu")}
        >
          Scarlett Tutor
        </button>
        <button
          className="btn btn-info mb-2"
          onClick={() => handleResponse("jwebb@neiu.edu")}
        >
          James Tutor
        </button>
        <button
          className="btn btn-secondary mb-2"
          onClick={() => handleResponse("jmonroe@neiu.edu")}
        >
          John Student
        </button>
        <button
          className="btn btn-success mb-2"
          onClick={() => handleResponse("mkatowski@neiu.edu")}
        >
          Madelyn Student
        </button>
        <button
          className="btn btn-success mb-2"
          onClick={() => handleResponse("bbeckham@neiu.edu")}
        >
          Brook Student
        </button>
        <button
          className="btn btn-success mb-5"
          onClick={() => handleResponse("jenmonroe@neiu.edu")}
        >
          Jennifer Student
        </button>
      </Row>
    </>
  );
};

export default Login;

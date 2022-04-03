import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SpinnerBtn from "../common/spinnerBtn";
import useLogout from "../../hooks/useLogout";

const Logout = ({ reset }) => {
  const [success, setSuccess] = useState(false);
  const { errors, handleLogout, loading, auth } = useLogout();

  useEffect(() => {
    if (!auth?.user) {
      setSuccess(true);
      setTimeout(() => {
        reset();
      }, 1500);
    }
  }, [auth]);

  return (
    <>
      {errors &&
        !errors.subject &&
        !errors.content &&
        Object.entries(errors).map(([key, value]) => (
          <p
            key={key}
            className="col-10 col-lg-8 mx-auto text-center text-danger"
          >
            {value}
          </p>
        ))}
      {success && (
        <p
          className="text-success text-center mt-2 mb-5"
          style={
            success
              ? { opacity: "1", transition: "opacity 0.6s linear" }
              : { opacity: 0 }
          }
        >
          Log out successful!
        </p>
      )}
      {!success && (
        <Row className="col-10 col-lg-8 mx-auto m-0 mb-5">
          <Col xs="6" className="mb-3 mb-sm-auto pe-sm-4">
            {!loading ? (
              <Button
                className="col-12 roundBorder dangerBtn"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <SpinnerBtn
                className="col-12 roundBorder"
                text="Deleting"
                role="logout"
                accessibilityText="Sign out"
              />
            )}
          </Col>
          <Col xs="6" className="mb-3 mb-sm-auto ps-sm-4">
            <Button
              className="col-12 roundBorder primaryBtn"
              onClick={reset}
              disabled={loading}
            >
              CANCEL
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Logout;

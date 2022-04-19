import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SpinnerBtn from "../common/spinnerBtn";
import useLogout from "../../hooks/useLogout";

const Logout = ({ reset, setTitle }) => {
  const [success, setSuccess] = useState(false);
  const { errors, handleLogout, signingOut, auth } = useLogout();

  useEffect(() => {
    if (!auth?.user) {
      setTitle("");
      setSuccess(true);
      setTimeout(() => {
        reset();
      }, 1500);
    }
    // eslint-disable-next-line
  }, [auth, reset]);

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
      {success && (
        <p className="text-success text-center pb-5 mb-5 fs-5">
          Successfully logged out!
        </p>
      )}
      {!success && (
        <Row className="col-10 col-lg-8 mx-auto m-0 mb-5">
          <Col xs="6" className="mb-3 mb-sm-auto pe-sm-4">
            {!signingOut ? (
              <Button
                className="col-12 roundBorder dangerBtn"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <SpinnerBtn
                className="col-12 roundBorder"
                text="Logging out"
                role="logout"
                accessibilityText="Sign out"
              />
            )}
          </Col>
          <Col xs="6" className="mb-3 mb-sm-auto ps-sm-4">
            <Button
              className="col-12 roundBorder primaryBtn"
              onClick={reset}
              disabled={signingOut}
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

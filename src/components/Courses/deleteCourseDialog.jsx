import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ViewContext, ActionsContext } from "../../Context/courseContext";
import { getErrors } from "../common/errorHelper";
import SpinnerBtn from "../common/spinnerBtn";
import useAxios from "../../hooks/useAxios";

const DeleteCourseDialog = ({ id, reset, setTitle }) => {
  const { data, error, loading, axiosFetch } = useAxios();
  const { courses, page, total, limit, pageCount } = useContext(ViewContext);
  const { setCourses, setRefetch, setPage, setPageCount, setTotal } =
    useContext(ActionsContext);
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState(false);

  const removeCourse = async () => {
    setErrors("");

    axiosFetch({
      method: "DELETE",
      url: `/courses/${id}`,
      requestConfig: {},
    });
  };

  useEffect(() => {
    if (Object.keys(data).length) {
      setTotal((prev) => prev - 1);
      // setRefetch(true);
      setCourses([...courses.filter((item) => item.id !== id)]);
      setTitle("");
      setSuccess(true);
      setTimeout(() => {
        reset();
      }, 1500);
    }
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    if (error) {
      setErrors(getErrors(error));
    }
    // eslint-disable-next-line
  }, [error]);

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
          className="text-success text-center mb-5 fs-5 pb-3"
          style={
            success
              ? { opacity: "1", transition: "opacity 0.6s linear" }
              : { opacity: 0 }
          }
        >
          Course deleted!
        </p>
      )}
      {!success && (
        <Row className="col-10 col-lg-8 mx-auto m-0 mb-5">
          <Col xs="6" className="mb-3 mb-sm-auto pe-sm-4">
            {!loading ? (
              <Button
                className="col-12 roundBorder dangerBtn"
                onClick={removeCourse}
              >
                DELETE
              </Button>
            ) : (
              <SpinnerBtn
                className="col-12 roundBorder dangerBtn"
                text="Deleting"
                role="delete"
                accessibilityText="Deleting"
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

export default DeleteCourseDialog;

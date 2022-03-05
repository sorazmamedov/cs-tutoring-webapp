import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ViewContext, ActionsContext } from "../Context/semesterContext";
import { semesterValidator } from "../../utils/validator";
import { localToUtc, utcToLocal } from "../../utils/date";
import Id from "../../utils/Id";
import { postSemester, putSemester } from "../../apis/cs-tutoring/semesters";
import useFetcher from "../../hooks/useMakeRequest";
import { useEffect } from "react";

const SemesterDialog = () => {
  const [axiosFetch, controller] = useFetcher();
  const { semesters, reset, currentSemester, edit } = useContext(ViewContext);
  const { setSemesters, setCurrentSemester } = useContext(ActionsContext);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [datepickerYear, setDatepickerYear] = useState(
    edit ? currentSemester.academicYear : new Date().getFullYear()
  );

  const handleYearFilter = (e) => {
    setDatepickerYear(e.target.value);
  };

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();

    const newItem = {
      id: edit ? currentSemester.id : Id.makeId(),
      semesterName: form.semesterName.value.trim(),
      academicYear: parseInt(form.academicYear.value.trim()),
      startDate: +new Date(utcToLocal(form.startDate.value.trim())),
      endDate: +new Date(utcToLocal(form.endDate.value.trim())),
      active: edit ? currentSemester.active : false,
    };

    let error = semesterValidator(newItem);
    const equal = isEqual(currentSemester, newItem);

    if (!error && !equal) {
      setLoading(true);
      setValidated(true);
      setErrors({});

      const result = edit
        ? await axiosFetch(putSemester(newItem))
        : await axiosFetch(postSemester(newItem));
      const statusCode = edit ? 200 : 201;

      if (result.status === statusCode) {
        if (edit) {
          let index = semesters.findIndex(
            (item) => item.id === currentSemester.id
          );
          setSemesters([
            ...semesters.slice(0, index),
            { ...newItem },
            ...semesters.slice(++index),
          ]);
        } else {
          setSemesters([...semesters, { ...newItem }]);
        }

        setCurrentSemester({ ...newItem });
        setErrors({});
        setValidated(true);
        setLoading(false);
        reset();
      } else {
        if (result.message) {
          setErrors({ response: result.message });
        } else if (result) {
          setErrors({ response: result });
        } else {
          setErrors({ response: result });
        }
        setValidated(false);
        setLoading(false);
      }
    } else if (error) {
      const errorData = {};
      for (let item of error.inner) {
        const name = item.path;
        const message = item.message;
        errorData[name] = message;
      }
      setErrors(errorData);
      setValidated(false);
    } else {
      reset();
    }
  };

  useEffect(() => {
    return () => {
      console.log("Aborting fetch from semesters...");
      controller && controller.abort();
    };
  });

  return (
    <>
      {errors.response && (
        <p className="col-10 col-lg-8 mx-auto text-center text-danger">
          {errors.response === "Network Error" &&
            "Please check your internet connection!"}
          {errors.response.status === 404 && errors.response.data.error}
          {Object.keys(errors.response).length === 0 &&
            "Something went wrong! Please, try again!"}
        </p>
      )}
      {errors.id && (
        <p className="col-10 col-lg-8 mx-auto text-center text-danger">
          {errors.id}
        </p>
      )}
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="col-10 col-lg-8 mx-auto"
      >
        <Row className="mb-sm-3" sm="2">
          <Col sm="6" className="mb-3 mb-sm-auto pe-sm-4">
            <Form.Label className="text-muted mb-0">Select Semester</Form.Label>
            <Form.Select
              aria-label="Select Semester"
              className="pe-3 roundBorder"
              name="semesterName"
              defaultValue={edit && currentSemester.semesterName}
            >
              <option value="Fall">Fall</option>
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
            </Form.Select>
          </Col>
          <Col sm="6" className="mb-3 mb-sm-auto ps-sm-4">
            <Form.Label className="text-muted mb-0">Academic Year</Form.Label>
            <Form.Control
              type="number"
              min={new Date().getFullYear()}
              placeholder="yyyy"
              className="roundBorder"
              name="academicYear"
              defaultValue={edit && currentSemester.academicYear}
              onChange={handleYearFilter}
              isInvalid={errors.academicYear}
              required
            />
            <Form.Control.Feedback type="invalid">
              {"Academic year " + errors.academicYear}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row className="mb-5" sm="2">
          <Col sm="6" className="mb-3 mb-sm-auto pe-sm-4">
            <Form.Label className="text-muted mb-0">Start Date</Form.Label>
            <Form.Control
              type="date"
              className="roundBorder"
              name="startDate"
              min={`${datepickerYear}-01-01`}
              max={`${datepickerYear}-12-31`}
              defaultValue={edit && localToUtc(currentSemester.startDate)}
              isInvalid={errors.startDate}
              required
            />
            <Form.Control.Feedback type="invalid">
              {"Start date " + errors.startDate}
            </Form.Control.Feedback>
          </Col>
          <Col sm="6" className="mb-3 mb-sm-auto ps-sm-4">
            <Form.Label className="text-muted mb-0">End Date</Form.Label>
            <Form.Control
              type="date"
              className="roundBorder"
              name="endDate"
              min={`${datepickerYear}-01-01`}
              max={`${datepickerYear}-12-31`}
              defaultValue={edit && localToUtc(currentSemester.endDate)}
              isInvalid={errors.endDate}
              required
            />
            <Form.Control.Feedback type="invalid">
              {"End date " + errors.endDate}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row className="mb-5" sm="2">
          <Col sm="6" className="order-2 order-sm-1 mb-3 mb-sm-auto pe-sm-4">
            <Button className="col-12 roundBorder dangerBtn" onClick={reset}>
              CANCEL
            </Button>
          </Col>
          <Col sm="6" className="order-1 order-sm-2 mb-3 mb-sm-auto ps-sm-4">
            {!loading ? (
              <Button type="submit" className="col-12 roundBorder primaryBtn">
                SAVE CHANGES
              </Button>
            ) : (
              <Button className="col-12 roundBorder" disabled>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="save"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Loading...</span>
                Saving...
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default SemesterDialog;

const isEqual = (obj1, obj2) => {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  for (let key in obj1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
};
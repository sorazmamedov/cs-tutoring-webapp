import React, { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { format } from "date-fns";
import { ViewContext, ActionsContext } from "../../../Context/timeslotContext";
import { getErrors } from "../../common/errorHelper";
import ActionButtons from "./actionButtons";
import SpinnerBtn from "../../common/spinnerBtn";
import useAxios from "../../../hooks/useAxios";

const NewEventDialog = ({ slot, reset, setEvents, loadedSemester }) => {
  const { data, error, setError, loading, axiosFetch } = useAxios();
  const [searching, setSearching] = useState(false);
  const [selected, setSelected] = useState({});
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [courses, setCourses] = useState([]);

  console.log(slot);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) {
      setError("");
    }

    //before selecting a course. Search button press
    if (!Object.keys(selected).length) {
      setSearching(true);
      const form = e.currentTarget;
      const searchTxt = form.search.value.trim();
      const regex = /^(?!.*([a-z])\1{2})[a-z0-9@-]+$/i;

      if (!regex.test(searchTxt)) {
        setSearching(false);
        setError({ message: "Allowed chars: a-z, 0-9, @, -" });
        return;
      }

      axiosFetch({
        method: "GET",
        url: "/courses",
        requestConfig: {
          params: { semesterId: loadedSemester.id, searchTxt },
        },
      });

      return;
    }

    setSaving(true);
    //Booking confirmed
    axiosFetch({
      method: "PUT",
      url: `/timeslots/${slot.id}`,
      requestConfig: { data: { booked: true, courseId: selected.id } },
    });
  };

  useEffect(() => {
    if (searching) {
      setCourses(data);
      setSearching(false);
    } else if (saving) {
      setEvents((prev) => [...prev.filter((event) => event.id !== slot.id)]);
      setSaving(false);
      setSuccess(true);
      setTimeout(() => {
        reset();
      }, 3000);
    }
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    if (error) {
      setSearching(false);
      setSaving(false);
    }
    // eslint-disable-next-line
  }, [error]);

  return (
    <>
      {!loading &&
        error &&
        Object.entries(getErrors(error)).map(([key, value]) => (
          <p
            key={key}
            className="col-10 col-lg-8 mx-auto text-center text-danger"
          >
            {value}
          </p>
        ))}
      {success && (
        <p
          className="col-10 col-lg-8 mx-auto text-success text-center mt-2"
          style={
            Object.keys(data).length !== 0
              ? { opacity: "1", transition: "opacity 0.6s linear" }
              : { opacity: 0 }
          }
        >
          Booked! Please refresh "Appointments" table!
        </p>
      )}
      <Form className="col-10 col-lg-8 mx-auto mb-5" onSubmit={handleSubmit}>
        {Object.keys(selected).length === 0 ? (
          <>
            <Row className="">
              <Col xs="8" className="mx-auto p-0">
                <Form.Label>
                  Which course are you coming for tutoring?
                </Form.Label>
                <InputGroup className="mb-5">
                  <FormControl
                    placeholder="email | instruct name | course | section"
                    aria-label="Search by email OR firstname OR lastname OR course OR section number"
                    className="roundBorder mb-0"
                    name="search"
                  />

                  {!searching ? (
                    <Button
                      className="primaryBtn roundBorder"
                      type="submit"
                    >
                      Search
                    </Button>
                  ) : (
                    <SpinnerBtn
                      text="Searching"
                      className="inline roundBorder"
                    />
                  )}
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Table bordered className="">
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id}>
                      <td>{course.section}</td>
                      <td>{course.courseName}</td>
                      <td>{course.instructorName}</td>
                      <td className="py-1 no-stretch">
                        <Button
                          id={course.id}
                          className="roundBorder primaryBtn py-1"
                          onClick={(e) =>
                            setSelected({
                              ...courses.find(
                                (course) => course.id === e.target.id
                              ),
                            })
                          }
                          disabled={selected.id === course.id}
                        >
                          Select
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Row>
          </>
        ) : (
          <>
            <Row>
              <Col xs="8" className="mx-auto">
                <p>
                  <b>Date:</b> {format(slot.start, "PPPP")}
                </p>
                <p>
                  <b>Between:</b> {format(slot.start, "h:mm bbb")} -{" "}
                  {format(slot.end, "h:mm bbb")}
                </p>
                <p>
                  <b>Tutor:</b> {slot.tutor}
                </p>
                <p>
                  <b>Course:</b> {selected.courseName}
                </p>
                <p>
                  <b>Faculty:</b> {selected.instructorName}
                </p>
              </Col>
            </Row>
            <Row className="mt-5 justify-content-center">
              <ActionButtons {...{ saving, reset, success }} />
            </Row>
          </>
        )}
      </Form>
    </>
  );
};

export default NewEventDialog;

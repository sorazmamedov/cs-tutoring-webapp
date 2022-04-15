import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import useAxios from "../../hooks/useAxios";
import SpinnerBtn from "../common/spinnerBtn";
import { getErrors } from "../common/errorHelper";

const AddTutorDialog = ({ setTutors, loadedSemester, ROLES, reset }) => {
  const { data, error, loading, axiosFetch } = useAxios();
  const [adding, setAdding] = useState(false);
  const [searching, setSearching] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    const email = form?.email?.value;
    if (!email) {
      return;
    }

    setSearching(true);
    axiosFetch({
      method: "GET",
      url: `/users/email/${email}@neiu.edu`,
      requestConfig: {},
    });
  };

  const handleAdd = () => {
    axiosFetch({
      method: "PUT",
      url: `/users/${data.id}`,
      requestConfig: {
        data: {
          activeSemesters: [...data?.activeSemesters, loadedSemester?.id],
          roles: [...data?.roles, ROLES.Tutor],
        },
      },
    });
    setAdding(true);
  };

  useEffect(() => {
    if (Object.keys(data).length) {
      if (searching) {
        setSearching(false);
      } else {
        setTutors((prev) => [data, ...prev]);
        setAdding(false);
        setTimeout(() => reset(), 1500);
      }
    }
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    if (error) {
      setSearching(false);
      setAdding(false);
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
      <Form
        className="col-10 col-lg-8 mx-auto justify-content-center mb-5"
        onSubmit={handleSubmit}
      >
        <Row>
          <InputGroup className="mb-5">
            <FormControl
              placeholder="Email of the person"
              aria-label="Email of the person you want to add as a tutor"
              aria-describedby="basic-addon1"
              className="roundBorder"
              name="email"
            />
            <InputGroup.Text id="basic-addon1">@neiu.edu</InputGroup.Text>

            {!searching ? (
              <Button
                className="primaryBtn roundBorder"
                id="button-addon1"
                name="search"
                type="submit"
                disabled={adding}
              >
                Search
              </Button>
            ) : (
              <SpinnerBtn text="Searching" className="inline roundBorder" />
            )}
          </InputGroup>
        </Row>
        {Object.keys(data).length !== 0 && (
          <Row className="my-5 justify-content-center">
            <Card
              border="secondary"
              className="bg-light"
              style={{ width: "18rem" }}
            >
              <Card.Img
                variant="top"
                src={
                  data?.picture
                    ? `${data.picture}=h180-c`
                    : "/profile_placeholder.svg"
                }
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = "/profile_placeholder.svg";
                  currentTarget.style = { height: "180px", overflow: "hidden" };
                }}
              />
              <Card.Body>
                <Card.Title>
                  {data?.firstName + " " + data?.lastName}
                </Card.Title>
                <Card.Text>
                  <span className="d-block mb-0">{data?.neiuId}</span>
                  <span className="d-block">{data?.email}</span>
                </Card.Text>
                {!adding ? (
                  <Button
                    className="primaryBtn roundBorder"
                    onClick={handleAdd}
                    disabled={data?.activeSemesters.includes(loadedSemester.id)}
                  >
                    {data?.activeSemesters.includes(loadedSemester.id)
                      ? "Added"
                      : "Add as Tutor"}
                  </Button>
                ) : (
                  <SpinnerBtn text="Adding" className="inline roundBorder" />
                )}
              </Card.Body>
            </Card>
          </Row>
        )}
      </Form>
    </>
  );
};

export default AddTutorDialog;

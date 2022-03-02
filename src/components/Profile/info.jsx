import React from "react";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ProfileInfo = () => {
  return (
    <Form className="mb-4">
      <Stack gap={4}>
        <Stack
          direction="horizontal"
          gap={0}
          className="col-12 col-md-11 justify-content-md-between"
        >
          <Form.Group className="col-6 pe-4">
            <Form.Label className="text-muted mb-0">Firstname</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              className="roundBorder"
            />
          </Form.Group>
          <Form.Group className="col-6 ps-4 ms-sm-0">
            <Form.Label className="text-muted mb-0">Lastname</Form.Label>
            <Form.Control type="text" placeholder="" className="roundBorder" />
          </Form.Group>
        </Stack>
        <Stack
          direction="horizontal"
          gap={0}
          className="col-12 col-md-11 justify-content-md-between"
        >
          <Form.Group className="col-6 pe-4">
            <Form.Label className="text-muted mb-0">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="example@neiu.edu"
              className="roundBorder"
            />
          </Form.Group>
          <Form.Group className="col-6 ps-4 ms-sm-0">
            <Form.Label className="text-muted mb-0">NEIU ID</Form.Label>
            <Form.Control type="text" placeholder="" className="roundBorder" />
          </Form.Group>
        </Stack>
        <Stack className="col-12 col-md-11">
          <Form.Group>
            <Form.Label className="text-muted mb-0">Bio</Form.Label>
            <Form.Control as="textarea" rows={3} className="roundBorder" />
          </Form.Group>
        </Stack>
        <Stack
          direction="horizontal"
          gap={5}
          className="col-12 col-md-11 justify-content-center justify-content-md-end"
        >
          <Button className="col-5 col-md-4 col-lg-3 roundBorder dangerBtn">
            CANCEL
          </Button>
          <Button className="col-5 col-md-4 col-lg-3 roundBorder primaryBtn">
            SAVE CHANGES
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export default ProfileInfo;

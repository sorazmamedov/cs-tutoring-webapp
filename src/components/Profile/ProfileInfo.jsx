import React from "react";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const roundBorder = { borderRadius: "8px"}

const ProfileInfo = () => {
  return (
    <Form className="mb-4">
      <Stack gap={4}>
        <Stack direction="horizontal" gap={5} className="col-11">
          <Form.Group className="col-5" controlId="examplForm.ControlInput1">
            <Form.Label className="text-muted mb-0">Firstname</Form.Label>
            <Form.Control type="text" placeholder="" style={roundBorder} />
          </Form.Group>
          <Form.Group className="col-5" controlId="exampleForm.ControlInput1">
            <Form.Label className="text-muted mb-0">Lastname</Form.Label>
            <Form.Control type="text" placeholder="" style={roundBorder} />
          </Form.Group>
        </Stack>
        <Stack direction="horizontal" gap={5} className="col-11">
          <Form.Group className="col-5" controlId="exampleForm.ControlInput1">
            <Form.Label className="text-muted mb-0">Email</Form.Label>
            <Form.Control type="email" placeholder="ex: jdoe@neiu.edu" style={roundBorder} />
          </Form.Group>
          <Form.Group className="col-5" controlId="exampleForm.ControlInput1">
            <Form.Label className="text-muted mb-0">NEIU ID</Form.Label>
            <Form.Control type="text" placeholder="" style={roundBorder} />
          </Form.Group>
        </Stack>
        <Stack className="col-10">
          <Form.Group className="" controlId="exampleForm.ControlTextarea1">
            <Form.Label className="text-muted mb-0">Bio</Form.Label>
            <Form.Control as="textarea" rows={3} style={roundBorder} />
          </Form.Group>
        </Stack>
        <Stack
          direction="horizontal"
          gap={5}
          className="col-10 justify-content-end"
        >
          <Button variant="outline-secondary" style={{ width: "150px", ...roundBorder }}>
            CANCEL
          </Button>
          <Button variant="primary" style={{ width: "150px", ...roundBorder }}>
            SAVE CHANGES
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export default ProfileInfo;

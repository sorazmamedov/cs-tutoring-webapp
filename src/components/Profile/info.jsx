import React from "react";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ProfileInfo = ({ user }) => {
  return (
    <Form className="mb-4">
      <Stack gap={4}>
        <Stack
          direction="horizontal"
          gap={0}
          className="col-12 col-md-11 justify-content-md-between"
        >
          <Form.Group className="col-6 pe-4">
            <Form.Label className="text-muted mb-0">Name</Form.Label>
            <Form.Control
              type="text"
              className="roundBorder"
              disabled
              readOnly
              placeholder={`${user?.firstName} ${user?.lastName}`}
            />
          </Form.Group>
          <Form.Group className="col-6 ps-4 ms-sm-0">
            <Form.Label className="text-muted mb-0">Email</Form.Label>
            <Form.Control
              type="email"
              className="roundBorder"
              disabled
              readOnly
              placeholder={user?.email}
            />
          </Form.Group>
        </Stack>
        <Stack
          direction="horizontal"
          gap={0}
          className="col-12 col-md-11 justify-content-md-between"
        >
          <Form.Group className="col-6 pe-4">
            <Form.Label className="text-muted mb-0">Pronoun</Form.Label>
            <Form.Control type="text" placeholder="" className="roundBorder" />
          </Form.Group>
          <Form.Group className="col-6 ps-4 ms-sm-0">
            <Form.Label className="text-muted mb-0">
              NEIU ID (9 digits)
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="example: 000123456"
              className="roundBorder"
              defaultValue={user?.neiuId}
            />
          </Form.Group>
        </Stack>
        <Stack className="col-12 col-md-11">
          <Form.Group>
            <Form.Label className="text-muted mb-0">Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              className="roundBorder"
              placeholder={user?.about}
            />
          </Form.Group>
        </Stack>
        <Stack
          direction="horizontal"
          gap={5}
          className="col-12 col-md-11 justify-content-center justify-content-md-end"
        >
          {/* <Button className="col-5 col-md-4 col-lg-3 roundBorder dangerBtn">
            CANCEL
          </Button> */}
          <Button className="col-5 col-md-4 col-lg-3 roundBorder primaryBtn">
            SAVE CHANGES
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export default ProfileInfo;

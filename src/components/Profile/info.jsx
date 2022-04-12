import React, { useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SpinnerBtn from "../common/spinnerBtn";
import useAxios from "../../hooks/useAxios";
import { userValidator } from "../../utils/validator";
import { showErrors } from "../common/errorHelper";
import TemplateModal from "../common/templateModal";
import useModal from "../../hooks/useModalStates";

const ProfileInfo = ({ auth, setAuth, ROLES }) => {
  const { show, title, ModalBody, reset, setModalBody, setTitle, setShow } =
    useModal();
  const [validated, setValidated] = useState(false);
  const { data, error, setError, loading, axiosFetch } = useAxios();
  const [edited, setEdited] = useState(false);

  const handleChange = (e) => {
    const form = e.currentTarget;
    const pronouns = form.pronouns.value;
    const neiuId = form.neiuId.value;
    const about = form?.about?.value;

    if (
      auth?.user?.pronouns === pronouns &&
      auth?.user?.neiuId === neiuId &&
      (about === undefined || auth?.user?.about === about)
    ) {
      edited && setEdited(false);
      return;
    }
    !edited && setEdited(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;

    const pronouns = form.pronouns.value;
    const neiuId = form.neiuId.value;
    const about = form?.about?.value;

    let changes = {};

    if (about !== undefined && auth?.user?.about !== about) {
      changes.about = about;
    }

    if (auth?.user?.pronouns !== pronouns) {
      changes.pronouns = pronouns;
    }

    if (auth?.user?.neiuId !== neiuId) {
      changes.neiuId = neiuId;
    }

    if (!Object.keys(changes)) {
      return;
    }

    let error = userValidator({ ...auth?.user, ...changes });

    if (error) {
      showErrors(error, setTitle, setShow, setModalBody);
      setValidated(false);
      return;
    }

    axiosFetch({
      method: "PUT",
      url: `/users/${auth?.user?.id}`,
      requestConfig: {
        data: changes,
      },
    });
  };

  useEffect(() => {
    if (Object.keys(data).length) {
      setAuth((prev) => ({ ...prev, user: { ...data } }));
      setEdited(false);
    }
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    if (error) {
      showErrors(error, setTitle, setShow, setModalBody);
    }
    // eslint-disable-next-line
  }, [error]);

  return (
    <>
      <Form
        className="mb-4"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
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
                placeholder={`${auth?.user?.firstName} ${auth?.user?.lastName}`}
              />
            </Form.Group>
            <Form.Group className="col-6 ps-4 ms-sm-0">
              <Form.Label className="text-muted mb-0">Email</Form.Label>
              <Form.Control
                type="email"
                className="roundBorder"
                disabled
                readOnly
                placeholder={auth?.user?.email}
              />
            </Form.Group>
          </Stack>
          <Stack
            direction="horizontal"
            gap={0}
            className="col-12 col-md-11 justify-content-md-between"
          >
            <Form.Group className="col-6 pe-4">
              <Form.Label className="text-muted mb-0">Pronouns</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="pronouns"
                defaultValue={auth?.user?.pronouns}
                className="roundBorder"
                isInvalid={error?.pronouns}
              />
              <Form.Control.Feedback type="invalid">
                {"Pronouns " + error?.pronouns}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="col-6 ps-4 ms-sm-0">
              <Form.Label className="text-muted mb-0">
                NEIU ID (9 digits)
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="example: 000123456"
                name="neiuId"
                defaultValue={auth?.user?.neiuId}
                className="roundBorder"
                isInvalid={error?.neiuId}
              />
              <Form.Control.Feedback type="invalid">
                {error?.neiuId}
              </Form.Control.Feedback>
            </Form.Group>
          </Stack>
          {auth?.user?.roles.includes(ROLES.Tutor) && (
            <Stack className="col-12 col-md-11">
              <Form.Group>
                <Form.Label className="text-muted mb-0">Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="about"
                  placeholder="Tell something"
                  defaultValue={auth?.user?.about}
                  className="roundBorder"
                  isInvalid={error?.about}
                />
                <Form.Control.Feedback type="invalid">
                  {"Bio " + error?.about}
                </Form.Control.Feedback>
              </Form.Group>
            </Stack>
          )}
          <Stack
            direction="horizontal"
            gap={5}
            className="col-12 col-md-11 justify-content-center justify-content-md-end"
          >
            {!loading ? (
              <Button
                type="submit"
                className="col-5 col-md-4 col-lg-3 roundBorder primaryBtn"
                disabled={!edited}
              >
                {edited
                  ? "SAVE CHANGES"
                  : Object.keys(data).length
                  ? "SAVED"
                  : "EDIT TO SAVE"}
              </Button>
            ) : (
              <SpinnerBtn
                className="col-5 col-md-4 col-lg-3 roundBorder"
                text="Saving"
              />
            )}
          </Stack>
        </Stack>
      </Form>
      <TemplateModal {...{ show, title, ModalBody, reset }} />
    </>
  );
};

export default ProfileInfo;

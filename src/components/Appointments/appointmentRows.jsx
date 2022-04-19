import React, { useEffect, useState } from "react";
import { appointmentValidator } from "../../utils/validator";
import { isEqual } from "../../utils/isEqual";
import ReadOnlyRow from "./readOnlyRow";
import { showErrors } from "../common/errorHelper";
import useAxios from "../../hooks/useAxios";

const AppointmentRows = ({
  setTitle,
  setModalBody,
  setShow,
  appointments,
  setAppointments,
}) => {
  const { data, error, axiosFetch } = useAxios();
  const [saving, setSaving] = useState("");

  const handleEdit = (e) => {
    e.stopPropagation();
  };

  const handleSave = async (edited) => {
    const appointment = appointments.find(({ id }) => id === edited.id);

    //Abort if nothing has changed or remove from appointments array if empty
    if (isEqual(appointment, true)) {
      resetStates();
      return;
    }

    const result = appointmentValidator(edited);
    if (result) {
      setSaving("");
      showErrors(result, setTitle, setShow, setModalBody);
      return;
    }

    if (true) {
      axiosFetch({
        method: "POST",
        url: "/appointments",
        requestConfig: {},
      });
    } else {
      axiosFetch({
        method: "PUT",
        url: `/appointments/`,
        requestConfig: {},
      });
    }
  };

  const handleCancel = () => {
    resetStates();
  };

  const resetStates = () => {
    setSaving("");
  };

  const handleToggle = async (e) => {
    if (saving) {
      return;
    }

    axiosFetch({
      method: "PUT",
      url: `/appointments/`,
      requestConfig: {},
    });
  };

  useEffect(() => {
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    if (error) {
      setSaving("");
      showErrors(error, setTitle, setShow, setModalBody);
    }
    // eslint-disable-next-line
  }, [error]);

  return appointments.map((appointment) => (
    <ReadOnlyRow
      key={appointment.id}
      saving={saving}
      appointment={appointment}
      handleEdit={handleEdit}
      handleToggle={handleToggle}
    />
  ));
};

export default AppointmentRows;

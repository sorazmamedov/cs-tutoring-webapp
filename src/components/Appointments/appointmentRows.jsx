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
  userId,
}) => {
  const { data, loading, error, axiosFetch } = useAxios();
  const [saving, setSaving] = useState("");
  const [action, setAction] = useState("");

  const handleEdit = (id) => {
    console.log(id);
  };

  const handleSave = async (edited) => {
    const appointment = appointments.find(({ id }) => id === edited.id);

    //Abort if nothing has changed or remove from appointments array if empty
    if (isEqual(appointment, true)) {
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

  const handleCancel = (id) => {
    console.log(id);
  };

  const handleNoShow = async (appointment) => {
    console.log(appointment.id);
    if (saving) {
      return;
    }

    setAction("noShow");
    setSaving(appointment.id);
    // axiosFetch({
    //   method: "PUT",
    //   url: `/users/${userId}/appointments/${appointment.id}`,
    //   requestConfig: { data: { noShow: !appointment.noShow } },
    // });
  };

  useEffect(() => {
    if (Object.keys(data).length) {
      if (action === "noShow") {
        console.log("No show success");
      } else if (action === "edit") {
        console.log("Edit success");
      } else {
        console.log("Cancel success");
        //remove appointment from array
      }
      setAction("");
      setSaving("");
    }
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    if (error) {
      setSaving("");
      setAction("");
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
      handleNoShow={handleNoShow}
      handleCancel={handleCancel}
    />
  ));
};

export default AppointmentRows;

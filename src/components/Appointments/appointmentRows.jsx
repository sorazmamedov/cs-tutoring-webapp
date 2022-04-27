import React, { useEffect, useState } from "react";
import { addMinutes, format, isPast, parseISO } from "date-fns";
import ReportDialog from "./reportDialog";
import ReadOnlyRow from "./readOnlyRow";
import { showErrors } from "../common/errorHelper";
import useAxios from "../../hooks/useAxios";

const AppointmentRows = ({
  setTitle,
  setModalBody,
  setShow,
  reset,
  appointments,
  setAppointments,
  userId,
}) => {
  const { data, error, axiosFetch } = useAxios();
  const [saving, setSaving] = useState("");
  const [action, setAction] = useState("");

  const handleEdit = (appointment) => {
    const add15Mins = addMinutes(appointment.start, 15);
    const hasPassed = isPast(add15Mins);
    if (!hasPassed && !appointment.noShow) {
      showErrors(
        {
          message: `Writing a report is allowed after the appointment expires or after no show!`,
        },
        setTitle,
        setShow,
        setModalBody
      );
      return;
    }
    setTitle("Report");
    setModalBody(
      <ReportDialog {...{ userId, appointment, reset, setAppointments }} />
    );
    setShow(true);
  };

  const handleCancel = (appointment) => {
    setAction("cancel");
    setSaving(appointment.id);
    axiosFetch({
      method: "PUT",
      url: `/users/${userId}/appointments/${appointment.id}`,
      requestConfig: { data: { canceled: true } },
    });
  };

  const handleNoShow = (appointment) => {
    if (saving || appointment.report) {
      return;
    }

    //Allow to mark as a no show after 15 mins passed
    const add15Mins = addMinutes(appointment.start, 15);
    const hasPassed = isPast(add15Mins);

    if (!hasPassed && !appointment.noShow) {
      showErrors(
        {
          message: `You can mark as a no show after ${format(
            add15Mins,
            "h:mm bbb"
          )} on ${format(add15Mins, "PPP")}!`,
        },
        setTitle,
        setShow,
        setModalBody
      );
      return;
    }

    if (isPast(appointment.end) && appointment.noShow) {
      showErrors(
        {
          message: "Appointment time has expired",
        },
        setTitle,
        setShow,
        setModalBody
      );
      return;
    }

    setAction("noShow");
    setSaving(appointment.id);
    axiosFetch({
      method: "PUT",
      url: `/users/${userId}/appointments/${appointment.id}`,
      requestConfig: { data: { noShow: !appointment.noShow } },
    });
  };

  useEffect(() => {
    if (Object.keys(data).length) {
      if (action === "noShow") {
        setAppointments((prev) => {
          let index = prev.findIndex((item) => item.id === saving);
          return [
            ...prev.slice(0, index),
            { ...data, start: parseISO(data.start), end: parseISO(data.end) },
            ...prev.slice(++index),
          ];
        });
      } else {
        setAppointments([...appointments.filter((item) => item.id !== saving)]);
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
      {...{
        saving,
        appointment,
        handleEdit,
        handleNoShow,
        handleCancel,
        reset,
        setTitle,
        setShow,
        setModalBody,
      }}
    />
  ));
};

export default AppointmentRows;

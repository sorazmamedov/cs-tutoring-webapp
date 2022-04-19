import React, { useState, useEffect, useContext } from "react";
import Table from "react-bootstrap/Table";
import MainContainer from "../common/mainContainer";
import TableHeader from "../common/tableHeader";
import AppointmentRows from "./appointmentRows";
import CustomPagination from "../common/customPagination";
import { RefreshIcon } from "../common/iconsWithTooltip";
import { showErrors } from "../common/errorHelper";
import TitleBar from "../common/titleBar";
import { ActionsContext, ViewContext } from "../../Context/appointmentContext";
import {
  NoDataPlaceholder,
  ErrorPlaceholder,
  LoadingPlaceholder,
} from "../common/Placeholders/";
import TemplateModal from "../common/templateModal";
import useModal from "../../hooks/useModalStates";

const Appointment = () => {
  const { show, title, ModalBody, reset, setModalBody, setTitle, setShow } =
    useModal();
  const {
    error,
    loading,
    appointments,
    loadedSemester,
    auth,
    ROLES,
    darkTheme,
  } = useContext(ViewContext);
  const { setAppointments, setRefetch } = useContext(ActionsContext);

  const header = ["With", "Date", "Time", "Course", "Actions"];

  const handleAddAppointment = () => {};

  return (
    <MainContainer>
      <TitleBar
        title="Appointments"
        icon={
          loading ? (
            <RefreshIcon onClick={() => setRefetch(true)} className="rotate" />
          ) : (
            <RefreshIcon onClick={() => setRefetch(true)} />
          )
        }
      />

      {loading && <LoadingPlaceholder />}
      {!loading && error && <ErrorPlaceholder />}
      {!loading && !error && appointments && appointments.length === 0 && (
        <NoDataPlaceholder message="No appointment available at this time!" />
      )}
      {!loading && !error && appointments && appointments.length !== 0 && (
        <>
          <Table className="" bordered hover responsive>
            <TableHeader headers={header} darkTheme={darkTheme} />
            <tbody className={darkTheme ? "" : "text-muted"}>
              <AppointmentRows
                {...{
                  setTitle,
                  setModalBody,
                  setShow,
                  appointments,
                  setAppointments,
                }}
              />
            </tbody>
          </Table>
          <CustomPagination />
        </>
      )}
      <TemplateModal {...{ show, title, ModalBody, reset }} />
    </MainContainer>
  );
};

export default Appointment;

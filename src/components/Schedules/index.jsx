import React, { useState, useEffect, useContext } from "react";
import Table from "react-bootstrap/Table";
import MainContainer from "../common/mainContainer";
import TableHeader from "../common/tableHeader";
import ScheduleRows from "./scheduleRows";
import CustomPagination from "../common/customPagination";
import { PlusIcon } from "../common/iconsWithTooltip";
import { showErrors } from "../common/errorHelper";
import TitleBar from "../common/titleBar";
import Id from "../../utils/Id";
import { ActionsContext, ViewContext } from "../../Context/scheduleContext";
import {
  NoDataPlaceholder,
  ErrorPlaceholder,
  LoadingPlaceholder,
} from "../common/Placeholders/";
import TemplateModal from "../common/templateModal";
import useModal from "../../hooks/useModalStates";

const Schedules = () => {
  const { show, title, ModalBody, reset, setModalBody, setTitle, setShow } =
    useModal();
  const {
    error,
    loading,
    schedules,
    loadedSemester,
    auth,
    ROLES,
    darkTheme,
    tutors,
    tutorsError,
    tutorsLoading,
  } = useContext(ViewContext);
  const { setSchedules } = useContext(ActionsContext);
  const [newItemId, setNewItemId] = useState("");

  const isAdmin = auth?.user?.roles.includes(ROLES.Admin);
  const header = ["Day", "From", "To", "Tutor", "Zoom Link"];
  if (isAdmin) {
    header.push("Actions");
  }

  const handleAddSchedule = () => {
    if (tutors.filter((tutor) => tutor.isActive).length) {
      if (!newItemId) {
        setNewItemId(() => Id.makeId());
      }
      return;
    }

    const err = {
      title: "Requirement Error",
      message: `You have to activate or add tutors first to ${loadedSemester.semesterName} ${loadedSemester.academicYear}`,
    };
    showErrors(err, setTitle, setShow, setModalBody);
  };

  useEffect(() => {
    if (newItemId) {
      const template = {
        id: null,
        semesterId: loadedSemester.id,
        day: "",
        startHour: "",
        endHour: "",
        tutorId: null,
        location: "",
        isActive: false,
      };
      setSchedules([{ ...template, id: newItemId }, ...schedules]);
    }
    // eslint-disable-next-line
  }, [newItemId]);

  return (
    <MainContainer>
      {!loading && !error && !tutorsLoading && !tutorsError && (
        <TitleBar
          title="Schedules"
          icon={isAdmin && <PlusIcon onClick={handleAddSchedule} />}
        />
      )}

      {loading && tutorsLoading && <LoadingPlaceholder />}
      {!loading && !tutorsLoading && (error || tutorsError) && (
        <ErrorPlaceholder />
      )}
      {!loading &&
        !error &&
        !tutorsLoading &&
        !tutorsError &&
        schedules &&
        tutors &&
        (schedules.length === 0 || tutors.length === 0) && (
          <NoDataPlaceholder message="No schedule available at this time!" />
        )}
      {!loading &&
        !error &&
        !tutorsLoading &&
        !tutorsError &&
        schedules &&
        schedules.length !== 0 &&
        tutors &&
        tutors.length !== 0 && (
          <>
            <Table className="text-center" bordered hover responsive>
              <TableHeader
                headers={auth?.user ? header : header.slice(0, -1)}
                darkTheme={darkTheme}
              />
              <tbody className={darkTheme ? "" : "text-muted"}>
                <ScheduleRows
                  {...{
                    newItemId,
                    setNewItemId,
                    setTitle,
                    setModalBody,
                    setShow,
                    tutors,
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

export default Schedules;

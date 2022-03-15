import React, { useState, useEffect, useContext } from "react";
import Table from "react-bootstrap/Table";
import MainContainer from "../common/mainContainer";
import TableHeader from "../common/tableHeader";
import ScheduleRows from "./scheduleRows";
import CustomPagination from "../common/customPagination";
import { PlusIcon } from "../common/iconsWithTooltip";
import { GlobalViewContext } from "../Context/dataContext";
import TitleBar from "../common/titleBar";
import Id from "../../utils/Id";
import {
  NoDataPlaceholder,
  ErrorPlaceholder,
  LoadingPlaceholder,
} from "../common/Placeholders/";
import TemplateModal from "../common/templateModal";
import { ViewContext as TutorContext } from "../Context/tutorsContext";
import { ActionsContext, ViewContext } from "../Context/scheduleContext";
import { showErrors } from "../common/errorHelper";

const Schedules = () => {
  const {
    tutors,
    error: tutorsError,
    loading: tutorsLoading,
  } = useContext(TutorContext);
  const { loadedSemester, admin } = useContext(GlobalViewContext);
  const { error, loading, schedules } = useContext(ViewContext);
  const { setSchedules, setModalBody, setTitle, setShow } =
    useContext(ActionsContext);
  const [newItemId, setNewItemId] = useState(null);

  const header = ["Day", "From", "To", "Tutor", "Zoom Link"];
  const adminHeader = [...header, "Actions"];

  const handleAddSchedule = () => {
    if (tutors.length) {
      if (!newItemId) {
        setNewItemId(() => Id.makeId());
      }
      return;
    }

    const err = {
      title: "Requirement Error",
      message: `You need to add tutors first to ${loadedSemester.semesterName} ${loadedSemester.academicYear}`,
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
          title="Tutor Schedule"
          icon={<PlusIcon onClick={handleAddSchedule} />}
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
        schedules.length === 0 && <NoDataPlaceholder />}
      {!loading &&
        !error &&
        !tutorsLoading &&
        !tutorsError &&
        schedules &&
        schedules.length !== 0 && (
          <>
            <Table className="text-center" bordered hover responsive>
              <TableHeader headers={admin ? adminHeader : header} />
              <tbody className="text-muted">
                <ScheduleRows
                  newItemId={newItemId}
                  setNewItemId={setNewItemId}
                />
              </tbody>
            </Table>
            <CustomPagination />
          </>
        )}
      <TemplateModal viewContext={ViewContext} />
    </MainContainer>
  );
};

export default Schedules;

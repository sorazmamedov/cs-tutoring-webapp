import React, { useState, useEffect, useContext } from "react";
import Table from "react-bootstrap/Table";
import MainContainer from "../common/mainContainer";
import TableHeader from "../CustomTable/tableHeader";
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

    setTitle("Requirement Error");
    setModalBody(
      () => () =>
        getErrorModalBody({
          error: `You need to add tutors first to ${loadedSemester.semesterName} ${loadedSemester.academicYear}`,
        })
    );
    setShow(true);
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

function getErrorModalBody(errorData) {
  return (
    <div className="col-10 col-lg-8 mx-auto mb-5 text-center">
      {Object.entries(errorData).map(([key, value]) => {
        return <p key={key}>{value}</p>;
      })}
    </div>
  );
}

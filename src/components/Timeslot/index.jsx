import React, { useContext, useEffect, useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import MainContainer from "../common/mainContainer";
import TitleBar from "../common/titleBar";
import BigCalendar from "./bigCalendar";
import TemplateModal from "../common/templateModal";
import BookSlotDialog from "./BookSlotDialog";
import useModal from "../../hooks/useModalStates";
import { RefreshIcon } from "../common/iconsWithTooltip";
import { ViewContext, ActionsContext } from "../../Context/timeslotContext";
import { NoDataPlaceholder, ErrorPlaceholder } from "../common/Placeholders/";
import { showErrors } from "../common/errorHelper";

const Timeslot = () => {
  const { setRefetch, setEvents, setStart, setEnd } =
    useContext(ActionsContext);
  const [tab, setTab] = useState("");
  const {
    events,
    error,
    loading,
    loadedSemester,
    tutors,
    tutorsError,
    tutorsLoading,
    auth,
  } = useContext(ViewContext);
  const { show, title, ModalBody, reset, setShow, setTitle, setModalBody } =
    useModal();

  const handleSelectEvent = (event) => {
    if (event.tutorId === auth?.user?.id) {
      showErrors(
        { message: "Booking your own slots is not allowed!" },
        setTitle,
        setShow,
        setModalBody
      );
      return;
    }
    const tutor = tutors.find((item) => item.id === event.tutorId);
    const slot = { ...event, tutor: `${tutor.firstName} ${tutor.lastName}` };
    setTitle("Appointment");
    setModalBody(
      <BookSlotDialog {...{ slot, reset, setEvents, loadedSemester }} />
    );
    setShow(true);
  };

  const handleRangeChange = (event) => {
    setStart(event[0]);
    setEnd(event[event.length - 1]);
    setRefetch(true);
  };

  useEffect(() => {
    if (tutors.length) {
      setTab(tutors[0].id);
    }
  }, [tutors]);

  return (
    <MainContainer>
      {!error && !tutorsError && tutors.length !== 0 && (
        <TitleBar
          title="Timeslots"
          icon={
            loading || tutorsLoading ? (
              <RefreshIcon onClick={() => setRefetch(true)} rotate={true} />
            ) : (
              <RefreshIcon onClick={() => setRefetch(true)} />
            )
          }
        />
      )}

      {/* {(loading || tutorsLoading) && <LoadingPlaceholder />} */}
      {!loading && !tutorsLoading && (error || tutorsError) && (
        <ErrorPlaceholder />
      )}

      {!loading &&
        !error &&
        !tutorsLoading &&
        !tutorsError &&
        events &&
        tutors &&
        tutors.length === 0 && (
          <NoDataPlaceholder message="No slots available at this time!" />
        )}
      {!error && !tutorsError && events && tutors && tutors.length !== 0 && (
        <>
          <Tabs
            // defaultActiveKey={tutors.length !== 0 ? tutors[0].id : ""}
            activeKey={tab}
            className="mb-3"
            onSelect={(eventKey) => setTab(eventKey)}
          >
            {tutors.map((tutor) => (
              <Tab key={tutor.id} eventKey={tutor.id} title={tutor.firstName} />
            ))}
          </Tabs>
          <BigCalendar
            events={[...events.filter((event) => event.tutorId === tab)]}
            handleSelectEvent={handleSelectEvent}
            handleRangeChange={handleRangeChange}
          />
        </>
      )}
      <TemplateModal {...{ show, title, ModalBody, reset }} />
    </MainContainer>
  );
};

export default Timeslot;

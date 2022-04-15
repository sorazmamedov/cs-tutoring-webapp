import React, { useContext, useEffect, useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import MainContainer from "../common/mainContainer";
import TitleBar from "../common/titleBar";
import BigCalendar from "./bigCalendar";
import TemplateModal from "../common/templateModal";
import AppointmentDialog from "./AppointmentDialog";
import useModal from "../../hooks/useModalStates";
import { RefreshIcon } from "../common/iconsWithTooltip";
import { ViewContext, ActionsContext } from "../../Context/timeslotContext";
import {
  NoDataPlaceholder,
  ErrorPlaceholder,
  LoadingPlaceholder,
} from "../common/Placeholders/";

const Timeslot = () => {
  const { setRefetch, setEvents, setStart, setEnd } =
    useContext(ActionsContext);
  const [slots, setSlots] = useState([]);
  const [tab, setTab] = useState("");
  const {
    events,
    error,
    loading,
    loadedSemester,
    darkTheme,
    tutors,
    tutorsError,
    tutorsLoading,
    auth,
    ROLES,
  } = useContext(ViewContext);
  const { show, title, ModalBody, reset, setShow, setTitle, setModalBody } =
    useModal();

  const isAdmin = auth?.user.roles.includes(ROLES.Admin);

  const handleSelectEvent = (event) => {
    // alert(event);
    const tutor = tutors.find((item) => item.id === event.tutorId);
    const slot = { ...event, tutor: `${tutor.firstName} ${tutor.lastName}` };
    setTitle("Appointment");
    setModalBody(
      <AppointmentDialog {...{ slot, reset, setEvents, loadedSemester }} />
    );
    setShow(true);
  };

  const handleRangeChange = (event) => {
    setStart(event[0]);
    setEnd(event[event.length - 1]);
    setRefetch(true);
  };

  //Filter timeslots according to selected tutor (tab)
  useEffect(() => {
    setSlots([...events.filter((event) => event.tutorId === tab)]);
  }, [events, tab]);

  // Default selected tutor tab
  useEffect(() => {
    if (tutors.length) {
      setTab(tutors[0].id);
    }
  }, [tutors]);

  return (
    <MainContainer>
      {!loading && !error && !tutorsLoading && !tutorsError && (
        <TitleBar
          title="Timeslots"
          icon={<RefreshIcon onClick={() => setRefetch(true)} />}
        />
      )}

      {(loading || tutorsLoading) && <LoadingPlaceholder />}
      {!loading && !tutorsLoading && (error || tutorsError) && (
        <ErrorPlaceholder />
      )}

      {!loading && !error && !tutorsLoading && !tutorsError && (
        <>
          <Tabs
            activeKey={tab}
            className="mb-3"
            onSelect={(eventKey) => setTab(eventKey)}
          >
            {tutors.map((tutor) => (
              <Tab key={tutor.id} eventKey={tutor.id} title={tutor.firstName} />
            ))}
          </Tabs>
          {events.length > 0 && tutors.length > 0 ? (
            <BigCalendar
              events={slots}
              handleSelectEvent={handleSelectEvent}
              handleRangeChange={handleRangeChange}
            />
          ):
            <NoDataPlaceholder message="No slots available at this time!" />
          }
        </>
      )}
      <TemplateModal {...{ show, title, ModalBody, reset }} />
    </MainContainer>
  );
};

export default Timeslot;

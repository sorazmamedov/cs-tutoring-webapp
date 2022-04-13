import React, { useContext, useEffect, useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import MainContainer from "../common/mainContainer";
import TitleBar from "../common/titleBar";
import BigCalendar from "./bigCalendar";
import TemplateModal from "../common/templateModal";
import NewEventDialog from "./NewEventDialog";
import DeleteEventDialog from "./DeleteEventDialog";
import useModal from "../../hooks/useModalStates";
import { RefreshIcon } from "../common/iconsWithTooltip";
import { ViewContext, ActionsContext } from "../../Context/timeslotContext";
import {
  NoDataPlaceholder,
  ErrorPlaceholder,
  LoadingPlaceholder,
} from "../common/Placeholders/";

const Timeslot = () => {
  const { setRefetch } = useContext(ActionsContext);
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
    alert(event);
    // setTitle("Delete Event");
    // setModalBody(<DeleteEventDialog {...{ event, reset }} />);
    // setShow(true);
  };

  useEffect(() => {
    if (events.length && tab) {
      setSlots([...events.filter((event) => event.tutorId === tab)]);
    }
  }, [events, tab]);

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

      {loading && tutorsLoading && <LoadingPlaceholder />}
      {!loading && !tutorsLoading && (error || tutorsError) && (
        <ErrorPlaceholder />
      )}
      {!loading &&
        !error &&
        !tutorsLoading &&
        !tutorsError &&
        events &&
        events.length === 0 && (
          <NoDataPlaceholder message="No timeslot available at this time!" />
        )}
      {!loading &&
        !error &&
        !tutorsLoading &&
        !tutorsError &&
        events &&
        events.length !== 0 &&
        tab && (
          <>
            <Tabs
              defaultActiveKey={tab}
              className="mb-3"
              onSelect={(eventKey) => setTab(eventKey)}
            >
              {tutors.map((tutor) => (
                <Tab
                  key={tutor.id}
                  eventKey={tutor.id}
                  title={tutor.firstName}
                />
              ))}
            </Tabs>
            <BigCalendar events={slots} handleSelectEvent={handleSelectEvent} />
          </>
        )}
      <TemplateModal {...{ show, title, ModalBody, reset }} />
    </MainContainer>
  );
};

export default Timeslot;

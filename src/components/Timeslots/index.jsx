import React, { useContext, useEffect, useState } from "react";
import { isPast } from "date-fns";
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
import DeleteSlotDialog from "./DeleteSlotDialog";

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
    if (isPast(event.end) || event.booked) {
      return;
    }

    if (event.tutorId === auth?.user?.id) {
      setTitle("Delete Slot");
      setModalBody(<DeleteSlotDialog {...{ event, reset }} />);
      setShow(true);
      return;
    }

    const tutor = tutors.find((item) => item.id === event.tutorId);
    const slot = { ...event, tutor: `${tutor.firstName} ${tutor.lastName}` };
    setTitle("Appointment");
    setModalBody(
      <BookSlotDialog
        {...{ slot, reset, setTitle, setEvents, loadedSemester }}
      />
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
      <TitleBar
        title="Timeslots"
        icon={
          loading || tutorsLoading ? (
            <RefreshIcon className="rotate" />
          ) : (
            <RefreshIcon onClick={() => setRefetch(true)} />
          )
        }
      />
      {!error && !tutorsError && events && tutors && tutors.length !== 0 ? (
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
          <div className="m-0">
            <div className="d-flex p-0 align-items-center justify-content-end">
              <span className="fs-6 text-muted">Booked</span>
              <span
                className="d-inline-block ms-2 rounded"
                style={{
                  height: "15px",
                  width: "15px",
                  backgroundColor: "#ff0066c9",
                }}
              ></span>
            </div>
            <div className="d-flex p-0 align-items-center justify-content-end">
              <span className="fs-6 text-muted">Available</span>
              <span
                className="d-inline-block ms-2 rounded"
                style={{
                  height: "15px",
                  width: "15px",
                  backgroundColor: "#3174ad",
                }}
              ></span>
            </div>
          </div>
        </>
      ) : (
        <Tabs activeKey={0} className="mb-3">
          <Tab eventKey={0} title="No slots available at this time!" />
        </Tabs>
      )}
      <BigCalendar
        events={[...events.filter((event) => event.tutorId === tab)]}
        handleSelectEvent={handleSelectEvent}
        handleRangeChange={handleRangeChange}
        userId={auth.id}
      />
      <TemplateModal {...{ show, title, ModalBody, reset }} />
    </MainContainer>
  );
};

export default Timeslot;

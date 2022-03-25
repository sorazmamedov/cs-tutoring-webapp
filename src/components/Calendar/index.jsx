import React, { useContext } from "react";
import MainContainer from "../common/mainContainer";
import TitleBar from "../common/titleBar";
import BigCalendar from "./bigCalendar";
import TemplateModal from "../common/templateModal";
import NewEventDialog from "./NewEventDialog";
import DeleteEventDialog from "./DeleteEventDialog";
import { ViewContext } from "../Context/calendarContext";
import useModal from "../../hooks/useModalStates";

const Calendar = () => {
  const { events } = useContext(ViewContext);
  const { show, title, ModalBody, reset, setShow, setTitle, setModalBody } =
    useModal();

  const handleSelectSlot = (event) => {
    setTitle("Appointment Slots");
    setModalBody(<NewEventDialog {...{ event, reset }} />);
    setShow(true);
  };

  const handleSelectEvent = (event) => {
    setTitle("Delete Event");
    setModalBody(<DeleteEventDialog {...{ event, reset }} />);
    setShow(true);
  };

  return (
    <MainContainer>
      <TitleBar title="My Calendar" />
      <BigCalendar
        {...{
          events,
          handleSelectSlot,
          handleSelectEvent,
        }}
      />
      <TemplateModal {...{ show, title, ModalBody, reset }} />
    </MainContainer>
  );
};

export default Calendar;

import React, { useContext, useEffect, useState } from "react";
import MainContainer from "../common/mainContainer";
import TitleBar from "../common/titleBar";
import BigCalendar from "./bigCalendar";
import TemplateModal from "../common/templateModal";
import NewEventDialog from "./NewEventDialog";
import DeleteEventDialog from "./DeleteEventDialog";
import { ActionsContext, ViewContext } from "../Context/calendarContext";

const Calendar = () => {
  const { loadedSemester, admin, events } = useContext(ViewContext);
  const { setShow, setTitle, setModalBody } = useContext(ActionsContext);

  const handleSelectSlot = (event) => {
    setTitle("Appointment Slots");
    setModalBody(() => () => NewEventDialog(event));
    setShow(true);
  };

  const handleSelectEvent = (event) => {
    console.log("Selected....", event);
    setTitle("Delete Event");
    setModalBody(() => () => DeleteEventDialog(event));
    setShow(true);
  };

  return (
    <MainContainer>
      <TitleBar title="My Calendar" />
      <BigCalendar
        events={events}
        handleSelectSlot={handleSelectSlot}
        handleSelectEvent={handleSelectEvent}
      />
      <TemplateModal viewContext={ViewContext} />
    </MainContainer>
  );
};

export default Calendar;

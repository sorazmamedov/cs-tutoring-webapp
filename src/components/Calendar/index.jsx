import React, { useContext, useEffect, useState } from "react";
import MainContainer from "../common/mainContainer";
import TitleBar from "../common/titleBar";
import BigCalendar from "./bigCalendar";
import TemplateModal from "../common/templateModal";
import NewEventDialog from "./newEventDialog";
import { ActionsContext, ViewContext } from "../Context/calendarContext";

const TimeSlots = () => {
  const { loadedSemester, admin } = useContext(ViewContext);
  const { setShow, setTitle, setModalBody } = useContext(ActionsContext);

  const [newEvent, setNewEvent] = useState(null);
  const [events, setEvents] = useState([
    {
      title: "",
      start: new Date(2022, 2, 15, 18, 25),
      end: new Date(2022, 2, 15, 21),
    },
    {
      title: "Tutoring",
      start: new Date(2022, 2, 10, 14, 30),
      end: new Date(2022, 2, 10, 17, 45),
    },
    {
      title: "Tutoring",
      start: new Date(2022, 2, 25, 13, 15),
      end: new Date(2022, 2, 25, 16, 15),
    },
  ]);

  const handleSelectSlot = (event) => {
    setTitle("Appointment Slots");
    setModalBody(() => () => NewEventDialog(event));
    setShow(true);
  };

  const handleSelectEvent = (slot) => {
    console.log("Selected....", slot);
  };

  useEffect(() => {
    if (newEvent) {
      console.log(newEvent);
    }
  }, [newEvent]);

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

export default TimeSlots;

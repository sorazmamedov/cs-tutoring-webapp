import React from "react";
import MainContainer from "../common/MainContainer";
import { getSlots, getHours } from "../../utils/slots";
import { useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import SlotsTable from "./SlotsTable";

const TimeSlots = () => {
  const [timeSlots, setTimeSlots] = useState(getSlots);
  const [key, setKey] = useState(timeSlots[0].id);
  const hours = getHours();

  const header = [
    "Between",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const tableHeaderDate = [
    "",
    "Jan 1, 2022",
    "Jan 2, 2022",
    "Jan 3, 2022",
    "Jan 4, 2022",
    "Jan 5, 2022",
    "Jan 6, 2022",
  ];

  const theader = header.map((text, i) => text + "-" + tableHeaderDate[i]);

  return (
    <MainContainer title="Time Slots">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-2"
      >
        <Tab eventKey={timeSlots[0].id} title={timeSlots[0].name}>
          <SlotsTable hours={hours} theader={theader} timeSlot={timeSlots[0]} />
        </Tab>
        <Tab eventKey={timeSlots[1].id} title={timeSlots[1].name}>
          <SlotsTable hours={hours} theader={theader} timeSlot={timeSlots[1]} />
        </Tab>
        <Tab eventKey={timeSlots[2].id} title={timeSlots[2].name}>
          <SlotsTable hours={hours} theader={theader} timeSlot={timeSlots[2]} />
        </Tab>
        <Tab eventKey={timeSlots[3].id} title={timeSlots[3].name}>
          <SlotsTable hours={hours} theader={theader} timeSlot={timeSlots[3]} />
        </Tab>
        <Tab eventKey={timeSlots[4].id} title={timeSlots[4].name}>
          <SlotsTable hours={hours} theader={theader} timeSlot={timeSlots[4]} />
        </Tab>
        <Tab eventKey={timeSlots[5].id} title={timeSlots[5].name}>
          <SlotsTable hours={hours} theader={theader} timeSlot={timeSlots[5]} />
        </Tab>
      </Tabs>
    </MainContainer>
  );
};

export default TimeSlots;

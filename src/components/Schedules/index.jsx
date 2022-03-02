import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import MainContainer from "../common/mainContainer";
import TableHeader from "../CustomTable/tableHeader";
import ScheduleRowItem from "./scheduleRowItem";
import CustomPagination from "../common/customPagination";
import { PlusIcon } from "../common/iconsWithTooltip";

const Schedules = () => {
  const admin = true;
  const data = [
    {
      id: 1,
      day: "Monday",
      startHour: "9:00 a.m.",
      endHour: "1:00 p.m.",
      tutor: { id: 11, name: "Alin" },
      location: "Alin's Zoom link",
      isActive: false,
    },
    {
      id: 2,
      day: "Monday",
      startHour: "1:00 p.m.",
      endHour: "5:00 p.m.",
      tutor: { id: 12, name: "Andrew" },
      location: "Andrew's Zoom link",
      isActive: false,
    },
    {
      id: 3,
      day: "Tuesday",
      startHour: "10:00 a.m.",
      endHour: "1:00 p.m.",
      tutor: { id: 13, name: "Victor" },
      location: "Victor's Zoom link",
      isActive: false,
    },
    {
      id: 4,
      day: "Tuesday",
      startHour: "11:00 a.m.",
      endHour: "3:00 p.m.",
      tutor: { id: 11, name: "Alin" },
      location: "Alin's Zoom link",
      isActive: false,
    },
    {
      id: 5,
      day: "Friday",
      startHour: "1:00 p.m.",
      endHour: "6:00 p.m.",
      tutor: { id: 12, name: "Andrew" },
      location: "Andrew's Zoom link",
      isActive: false,
    },
    {
      id: 6,
      day: "Saturday",
      startHour: "10:00 a.m.",
      endHour: "3:00 p.m.",
      tutor: { id: 13, name: "Victor" },
      location: "Victor's Zoom link",
      isActive: false,
    },
  ];
  const [schedules, setSchedules] = useState(
    JSON.parse(localStorage.getItem("schedules")) || data
  );

  useEffect(() => {
    localStorage.setItem("schedules", JSON.stringify(schedules));

    return () => {
      console.log("Schedules Clean up...");
      localStorage.removeItem("schedules");
    };
  }, [schedules]);

  const header = ["Day", "From", "To", "Tutor", "Zoom Link"];
  if (admin) {
    header.push("Actions");
  }

  const handleEdit = (e) => {
    console.log("Edit Target: ", e);
  };

  const handleToggleChange = (e) => {
    const id = parseInt(e.target.getAttribute("scheduleid"));
    const modified = schedules.map((item) =>
      item.id === id ? { ...item, isActive: !item.isActive } : item
    );
    setSchedules(modified);
  };

  return (
    <MainContainer title="Tutor Schedule" icon={<PlusIcon />}>
      <Table className="text-center" bordered hover responsive>
        <TableHeader headers={header} />
        <tbody className="text-muted">
          <ScheduleRowItem
            data={schedules}
            onEdit={handleEdit}
            onChange={handleToggleChange}
            admin={admin}
          />
        </tbody>
      </Table>
      <CustomPagination />
    </MainContainer>
  );
};

export default Schedules;

import React from "react";
import Table from "react-bootstrap/Table";
import MainContainer from "../common/MainContainer";
import TableHeader from "../CustomTable/TableHeader";
import ScheduleRowItem from "./ScheduleRowItem";
import CustomPagination from "../CustomPagination";
import { PlusIcon } from "../common/IconsWithTooltip";
import { useEffect } from "react";
import { useState } from "react";

const Schedules = () => {
  const admin = true;
  const schedule = [
    {
      id: 1,
      day: "Monday",
      startHour: "9:00 a.m.",
      endHour: "1:00 p.m.",
      tutor: { id: 11, name: "Alin" },
      location: "Alin's Zoom link",
      isActive: false
    },
    {
      id: 2,
      day: "Monday",
      startHour: "1:00 p.m.",
      endHour: "5:00 p.m.",
      tutor: { id: 12, name: "Andrew" },
      location: "Andrew's Zoom link",
      isActive: false
    },
    {
      id: 3,
      day: "Tuesday",
      startHour: "10:00 a.m.",
      endHour: "1:00 p.m.",
      tutor: { id: 13, name: "Victor" },
      location: "Victor's Zoom link",
      isActive: false
    },
    {
      id: 4,
      day: "Tuesday",
      startHour: "11:00 a.m.",
      endHour: "3:00 p.m.",
      tutor: { id: 11, name: "Alin" },
      location: "Alin's Zoom link",
      isActive: false
    },
    {
      id: 5,
      day: "Friday",
      startHour: "1:00 p.m.",
      endHour: "6:00 p.m.",
      tutor: { id: 12, name: "Andrew" },
      location: "Andrew's Zoom link",
      isActive: false
    },
    {
      id: 6,
      day: "Saturday",
      startHour: "10:00 a.m.",
      endHour: "3:00 p.m.",
      tutor: { id: 13, name: "Victor" },
      location: "Victor's Zoom link",
    },
  ];
  const header = ["Day", "From", "To", "Tutor", "Zoom Link"];
  if (admin) {
    header.push("Action");
  }

  const handleEdit = (e) => {
    console.log("Edit Target: ", e.target.id);
  };

  const handleToggleChange = (e) => {
    console.log("Toggle: ", e.target.id);

  };

  return (
    <MainContainer title="Tutor Schedule" icon={<PlusIcon />}>
      <Table className="text-center" bordered hover responsive>
        <TableHeader headers={header} />
        <tbody className="text-muted">
          <ScheduleRowItem
            data={schedule}
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

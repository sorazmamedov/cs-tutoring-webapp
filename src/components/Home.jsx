import React from "react";
import Semesters from "./Semesters";
import Schedules from "./Schedules";
import Announcements from "./Announcements";
import Courses from "./Courses";
import Profiles from "./Profiles";
import TimeSlots from "./TimeSlots";

const Home = () => {
  return (
    <>
      <Semesters />
      <Schedules />
      <Announcements />
      <Courses />
      <Profiles />
      <TimeSlots />
    </>
  );
};

export default Home;

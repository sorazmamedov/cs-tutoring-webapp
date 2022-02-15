import React from "react";

import Schedules from "./Schedules";
import Announcements from "./Announcements";
import Courses from "./Courses";
import TimeSlots from "./TimeSlots";

const Home = () => {
  return (
    <>
      <Schedules />
      <Announcements />
      <Courses />
      <TimeSlots />
    </>
  );
};

export default Home;

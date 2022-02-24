import React from "react";
import Semesters from "./Semesters";
import Schedules from "./Schedules";
import Announcements from "./Announcements";
import Courses from "./Courses";
import Profiles from "./Profiles";
import TimeSlots from "./TimeSlots";
import { AnnouncementDataProvider } from "./Context/AnnouncementContext";

const Home = () => {
  return (
    <>
      <Semesters />
      <Schedules />
      <AnnouncementDataProvider>
        <Announcements />
      </AnnouncementDataProvider>
      <Courses />
      <Profiles />
      <TimeSlots />
    </>
  );
};

export default Home;

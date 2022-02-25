import React from "react";
import Semesters from "./Semesters";
import Schedules from "./Schedules";
import Announcements from "./Announcements";
import Courses from "./Courses";
import Profiles from "./Profiles";
import TimeSlots from "./TimeSlots";
import AnnouncementDataProvider from "./Context/AnnouncementContext";
import SemesterDataProvider from "./Context/SemesterContext";

const Home = () => {
  return (
    <>
      <SemesterDataProvider>
        <Semesters />
      </SemesterDataProvider>
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

import React from "react";
import Semesters from "./Semesters";
import Schedules from "./Schedules";
import Announcements from "./Announcements";
import Courses from "./Courses";
import Tutors from "./Tutors";
import TimeSlots from "./TimeSlots";
import SemesterDataProvider from "./Context/semesterContext";
import AnnouncementDataProvider from "./Context/announcementContext";
import CourseDataProvider from "./Context/courseContext";
import TutorDataProvider from "./Context/tutorsContext";


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
      <CourseDataProvider>
        <Courses />
      </CourseDataProvider>
      <TutorDataProvider>
        <Tutors />
      </TutorDataProvider>
      <TimeSlots />
    </>
  );
};

export default Home;

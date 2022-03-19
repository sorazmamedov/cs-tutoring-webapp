import React from "react";
import Semesters from "./Semesters";
import Schedules from "./Schedules";
import Announcements from "./Announcements";
import Courses from "./Courses";
import Tutors from "./Tutors";
import Calendar from "./Calendar";
import SemesterDataProvider from "./Context/semesterContext";
import AnnouncementDataProvider from "./Context/announcementContext";
import CourseDataProvider from "./Context/courseContext";
import TutorDataProvider from "./Context/tutorsContext";
import ScheduleDataProvider from "./Context/scheduleContext";
import CalendarDataProvider from "./Context/calendarContext";

const Home = () => {
  return (
    <>
      <SemesterDataProvider>
        <Semesters />
      </SemesterDataProvider>
      <TutorDataProvider>
        <ScheduleDataProvider>
          <Schedules />
        </ScheduleDataProvider>
        <Tutors />
      </TutorDataProvider>
      <AnnouncementDataProvider>
        <Announcements />
      </AnnouncementDataProvider>
      <CourseDataProvider>
        <Courses />
      </CourseDataProvider>
      <CalendarDataProvider>
        <Calendar />
      </CalendarDataProvider>
    </>
  );
};

export default Home;

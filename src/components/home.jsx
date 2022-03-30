import React from "react";
import Semesters from "./Semesters";
import Schedules from "./Schedules";
import Announcements from "./Announcements";
import Courses from "./Courses";
import Tutors from "./Tutors";
import Calendar from "./Calendar";
import SemesterDataProvider from "../Context/semesterContext";
import AnnouncementDataProvider from "../Context/announcementContext";
import CourseDataProvider from "../Context/courseContext";
import TutorDataProvider from "../Context/tutorsContext";
import ScheduleDataProvider from "../Context/scheduleContext";
import CalendarDataProvider from "../Context/calendarContext";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { auth, ROLES } = useAuth();
  return (
    <>
      {auth?.user?.roles.includes(ROLES.Admin) && (
        <SemesterDataProvider>
          <Semesters />
        </SemesterDataProvider>
      )}
      <TutorDataProvider>
        <ScheduleDataProvider>
          <Schedules />
        </ScheduleDataProvider>
        {auth?.user?.roles.includes(ROLES.Admin) && <Tutors />}
      </TutorDataProvider>
      <AnnouncementDataProvider>
        <Announcements />
      </AnnouncementDataProvider>
      {auth?.user?.roles.includes(ROLES.Admin) && (
        <CourseDataProvider>
          <Courses />
        </CourseDataProvider>
      )}
      <CalendarDataProvider>
        <Calendar />
      </CalendarDataProvider>
    </>
  );
};

export default Home;

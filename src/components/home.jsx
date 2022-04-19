import React from "react";
import Appointments from "./Appointments";
import Semesters from "./Semesters";
import Schedules from "./Schedules";
import Announcements from "./Announcements";
import Courses from "./Courses";
import Tutors from "./Tutors";
import Calendar from "./Calendar";
import SemesterDataProvider from "../Context/semesterContext";
import AppointmentDataProvider from "../Context/appointmentContext";
import AnnouncementDataProvider from "../Context/announcementContext";
import CourseDataProvider from "../Context/courseContext";
import TutorDataProvider from "../Context/tutorsContext";
import ScheduleDataProvider from "../Context/scheduleContext";
import CalendarDataProvider from "../Context/calendarContext";
import TimeslotDataProvider from "../Context/timeslotContext";
import useAuth from "../hooks/useAuth";
import Public from "./Public";
import Timeslots from "./Timeslots";

const Home = () => {
  const { auth, ROLES } = useAuth();
  return !auth?.user ? (
    <Public />
  ) : (
    <>
      {auth?.user?.roles.includes(ROLES.Admin) && (
        <SemesterDataProvider>
          <Semesters />
        </SemesterDataProvider>
      )}
      <AppointmentDataProvider>
        <Appointments />
      </AppointmentDataProvider>
      <TutorDataProvider>
        <ScheduleDataProvider>
          <Schedules />
        </ScheduleDataProvider>
        {auth?.user?.roles.includes(ROLES.Admin) && <Tutors />}
        <TimeslotDataProvider>
          <Timeslots />
        </TimeslotDataProvider>
      </TutorDataProvider>
      <AnnouncementDataProvider>
        <Announcements />
      </AnnouncementDataProvider>
      {auth?.user?.roles.includes(ROLES.Admin) && (
        <CourseDataProvider>
          <Courses />
        </CourseDataProvider>
      )}
      {auth?.user?.roles.includes(ROLES.Tutor) && auth?.user?.isActive && (
        <CalendarDataProvider>
          <Calendar />
        </CalendarDataProvider>
      )}
    </>
  );
};

export default Home;

import schemas from "./yup";

const adminValidator = (payload) => schemas.adminValidator(payload);
const tutorValidator = (payload) => schemas.tutorValidator(payload);
const studentValidator = (payload) => schemas.studentValidator(payload);
const announcementValidator = (payload) =>
  schemas.announcementValidator(payload);
const appointmentValidator = (payload) => schemas.appointmentValidator(payload);
const reportValidator = (payload) => schemas.reportValidator(payload);
const courseValidator = (payload) => schemas.courseValidator(payload);
const scheduleValidator = (payload) => schemas.scheduleValidator(payload);
const semesterValidator = (payload) => schemas.semesterValidator(payload);
const timeSlotValidator = (payload) => schemas.timeSlotValidator(payload);

export {
  adminValidator,
  tutorValidator,
  studentValidator,
  announcementValidator,
  appointmentValidator,
  reportValidator,
  courseValidator,
  scheduleValidator,
  semesterValidator,
  timeSlotValidator,
};

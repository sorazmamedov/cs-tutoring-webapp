import schemas from "./yup";

const userValidator = (payload) => schemas.userValidator(payload);
const announcementValidator = (payload, context) =>
  schemas.announcementValidator(payload, context);
const appointmentValidator = (payload) => schemas.appointmentValidator(payload);
const reportValidator = (payload) => schemas.reportValidator(payload);
const courseValidator = (payload) => schemas.courseValidator(payload);
const scheduleValidator = (payload) => schemas.scheduleValidator(payload);
const semesterValidator = (payload) => schemas.semesterValidator(payload);
const timeSlotValidator = (payload) => schemas.timeSlotValidator(payload);
const calendarValidator = (payload, context) =>
  schemas.calendarValidator(payload, context);
const eventValidator = (payload, context) =>
  schemas.eventValidator(payload, context);

export {
  userValidator,
  announcementValidator,
  appointmentValidator,
  reportValidator,
  courseValidator,
  scheduleValidator,
  semesterValidator,
  timeSlotValidator,
  calendarValidator,
  eventValidator,
};

import adminSchema from "./admin-schema";
import tutorSchema from "./tutor-schema";
import studentSchema from "./student-schema";
import announcementSchema from "./announcement-schema";
import appointmentSchema from "./appointment-schema";
import reportSchema from "./report-schema";
import courseSchema from "./course-schema";
import scheduleSchema from "./schedule-schema";
import semesterSchema from "./semester-schema";
import timeSlotSchema from "./timeSlot-schema";
import calendarSchema from "./calendar-schema";
import eventSchema from "./event-schema";

let JoiValidator = (payload, schema, context) => {
  try {
    schema.validateSync(payload, {
      strict: true,
      abortEarly: false,
      ...context,
    });

    return;
  } catch (error) {
    return error;
  }
};

export default Object.freeze({
  adminValidator: (payload) => JoiValidator(payload, adminSchema),
  tutorValidator: (payload) => JoiValidator(payload, tutorSchema),
  studentValidator: (payload) => JoiValidator(payload, studentSchema),
  announcementValidator: (payload) => JoiValidator(payload, announcementSchema),
  appointmentValidator: (payload) => JoiValidator(payload, appointmentSchema),
  reportValidator: (payload) => JoiValidator(payload, reportSchema),
  courseValidator: (payload) => JoiValidator(payload, courseSchema),
  scheduleValidator: (payload) => JoiValidator(payload, scheduleSchema),
  semesterValidator: (payload) => JoiValidator(payload, semesterSchema),
  timeSlotValidator: (payload) => JoiValidator(payload, timeSlotSchema),
  calendarValidator: (payload, context) =>
    JoiValidator(payload, calendarSchema, context),
  eventValidator: (payload, context) =>
    JoiValidator(payload, eventSchema, context),
});

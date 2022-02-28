import { object } from "yup";
import vs from "./validationSchemas";

export default object().shape({
  appointmentId: vs.nanoid,
  tutorId: vs.nanoid,
  studentId: vs.nanoid,
  courseId: vs.requiredText,
  appointmentDate: vs.date,
  location: vs.shortText,
  canceled: vs.boolean,
  noShow: vs.boolean,
});

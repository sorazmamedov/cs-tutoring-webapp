import { object } from "yup";
import vs from "./validationSchemas";

export default object().shape({
  reportId: vs.nanoid,
  tutorId: vs.nanoid,
  studentId: vs.nanoid,
  courseId: vs.requiredText,
  message: vs.longText.required(),
  submittedOn: vs.date,
  status: vs.status,
});

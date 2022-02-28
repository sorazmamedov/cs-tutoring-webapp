import { object } from "yup";
import vs from "./validationSchemas";

export default object().shape({
  id: vs.nanoid,
  courseCode: vs.shortText,
  courseName: vs.requiredText,
  semesterId: vs.nanoid,
  instructorName: vs.requiredText,
  instructorEmail: vs.email,
});

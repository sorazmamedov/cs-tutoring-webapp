import { object } from "yup";
import vs from "./validationSchemas";

export default object().shape({
  section: vs.shortText,
  courseName: vs.requiredText,
  instructorName: vs.requiredText,
  instructorEmail: vs.email,
});

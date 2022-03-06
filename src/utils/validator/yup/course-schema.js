import { object } from "yup";
import vs from "./validationSchemas";

export default object().shape({
  id: vs.nanoid,
  section: vs.shortText,
  courseName: vs.requiredText,
  semesterId: vs.nanoid,
  instructorName: vs.requiredText,
  instructorEmail: vs.email,
});

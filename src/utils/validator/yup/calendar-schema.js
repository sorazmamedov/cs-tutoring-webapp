import { object } from "yup";
import vs from "./validationSchemas";

export default object().shape({
  id: vs.nanoid,
  tutorId: vs.nanoid,
  semesterId: vs.nanoid,
  start: vs.start,
  end: vs.end,
});
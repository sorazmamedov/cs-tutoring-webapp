import { object } from "yup";
import vs from "./validationSchemas";

export default object().shape({
  tutorId: vs.nanoid,
  semesterId: vs.nanoid,
  start: vs.start,
  end: vs.end,
  slots: vs.slotsArray,
  repeat: vs.boolean,
  repeatUntil: vs.repeatUntil,
});

import { object } from "yup";
import vs from "./validationSchemas";

export default object().shape({
  id: vs.nanoid,
  tutorId: vs.nanoid,
  semesterId: vs.nanoid,
  day: vs.weekday,
  startHour: vs.startHour,
  endHour: vs.endHour,
  location: vs.shortText,
  isActive: vs.boolean,
});

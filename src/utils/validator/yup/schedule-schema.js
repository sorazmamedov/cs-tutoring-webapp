import { object } from "yup";
import vs from "./validationSchemas";

export default object().shape({
  scheduleId: vs.nanoid,
  tutorId: vs.nanoid,
  semesterId: vs.semesterId,
  day: vs.weekday,
  startHour: vs.startHour,
  endHour: vs.endHour,
  //sessionDuration: vs.sessionDuration,
});

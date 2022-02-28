import { object } from "yup";
import vs from "./validationSchemas";

export default object().shape({
  slotId: vs.nanoid,
  scheduleId: vs.nanoid,
  slotDate: vs.date,
  startHour: vs.startHour,
  endHour: vs.endHour,
  booked: vs.boolean,
  appointmentId: vs.nanoid,
});

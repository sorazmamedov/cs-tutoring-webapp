import { object } from "yup";
import vs from "./validationSchemas";

export default object().shape({
  id: vs.nanoid,
  semesterName: vs.semesterName,
  academicYear: vs.year,
  startDate: vs.startDate,
  endDate: vs.endDate,
  active: vs.boolean,
});

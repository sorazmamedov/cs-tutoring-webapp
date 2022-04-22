import { object } from "yup";
import vs from "./validationSchemas";

export default object().shape({
  report: vs.report,
});

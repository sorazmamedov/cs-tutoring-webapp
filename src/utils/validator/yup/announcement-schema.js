import { object } from "yup";
import vs from "./validationSchemas";

export default object().shape({
  id: vs.nanoid,
  publisherId: vs.nanoid,
  semesterId: vs.nanoid,
  createdOn: vs.date,
  subject: vs.shortText,
  content: vs.longText,
  published: vs.boolean,
});

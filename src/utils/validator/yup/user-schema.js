import { object, string } from "yup";
import vs from "./validationSchemas";
import { len } from "../validationMessages";

export default object().shape({
  id: vs.nanoid,
  firstName: vs.firstName,
  lastName: vs.lastName,
  pronouns: vs.pronouns,
  email: vs.email,
  isActive: vs.boolean,
  roles: vs.roles,
  picture: vs.url,
  activeSemesters: vs.activeSemesters,
  neiuId: string()
    .trim()
    .matches(/^\d{9}$/, "NEIU ID must be a 9 digit number."),
  about: string().trim().min(len.minLongTextLength).max(len.maxLongTextLength),
});

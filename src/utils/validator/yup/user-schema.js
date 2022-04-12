import { object, string } from "yup";
import vs from "./validationSchemas";

export default object().shape({
  id: vs.nanoid,
  firstName: vs.firstName,
  lastName: vs.lastName,
  pronouns: string().trim().min(0).max(100),
  email: vs.email,
  isActive: vs.boolean,
  roles: vs.roles,
  picture: vs.url,
  activeSemesters: vs.activeSemesters,
  neiuId: string()
    .trim()
    .matches(/^\d{9}$/, "NEIU ID must be a 9 digit number."),
  about: string().trim(),
});

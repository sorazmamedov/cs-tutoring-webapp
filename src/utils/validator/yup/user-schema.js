import { object } from "yup";
import vs from "./validationSchemas";

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
  neiuId: vs.neiuId,
  about: vs.about,
});

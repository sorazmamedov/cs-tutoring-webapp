import { object } from "yup";
import vs from "./validationSchemas";

export default object().shape({
  id: vs.nanoid,
  neiuId: vs.neiuId,
  firstName: vs.firstName,
  lastName: vs.lastName,
  email: vs.email,
  about: vs.longText,
});

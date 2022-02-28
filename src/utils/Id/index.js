import { nanoid } from "nanoid";
import { len } from "../validator/validationMessages";

const Id = Object.freeze({
  makeId: () => nanoid(len.idLength),
});

export default Id;

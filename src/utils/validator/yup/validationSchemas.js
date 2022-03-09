import { string, number, boolean, ref } from "yup";
import { len, messages } from "../validationMessages";

export default Object.freeze({
  nanoid: string()
    .trim()
    .length(len.idLength)
    .required()
    .typeError("${path}" + messages.idError),

  neiuId: string()
    .matches(/^\d{9}$/)
    .required()
    .typeError(messages.isRequired),

  firstName: string()
    .trim()
    .min(len.minNameLength)
    .max(len.maxNameLength)
    .required()
    .typeError(messages.isRequired),

  lastName: string()
    .trim()
    .min(len.minNameLength)
    .max(len.maxNameLength)
    .required()
    .typeError(messages.isRequired),

  email: string()
    .trim()
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 2,
      tlds: { allow: ["edu"] },
    })
    .matches(/[A-Za-z0-9-]+@neiu.edu$/)
    .required()
    .typeError(messages.isRequired),

  date: number()
    .integer()
    .positive()
    .moreThan(len.minDate)
    .required()
    .typeError(messages.isRequired),

  shortText: string()
    .trim()
    .min(len.minShortTextLength)
    .max(len.maxShortTextLength)
    .required()
    .typeError(messages.isRequired),

  longText: string()
    .trim()
    .min(len.minLongTextLength)
    .max(len.maxLongTextLength)
    .typeError(messages.isRequired),

  requiredText: string().trim().required().typeError(messages.isRequired),

  boolean: boolean().required().typeError('${path}' + messages.isRequired),

  //Semester
  semesterName: string()
    .trim()
    .matches(/^(Spring|Summer|Fall|Winter)$/, messages.semesterNameError)
    .required()
    .typeError(messages.isRequired),
  year: number()
    .integer()
    .positive()
    .min(len.minYear, messages.minYearError)
    .required()
    .typeError(messages.isRequired),
  startDate: number()
    .min(len.minDate, messages.dateError)
    .required()
    .typeError(messages.isRequired),
  endDate: number()
    .moreThan(ref("startDate"), messages.dateError)
    .required()
    .typeError(messages.isRequired),

  //Schedule
  weekday: string()
    .trim()
    .matches(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)$/)
    .required()
    .typeError(messages.isRequired),

  startHour: string()
    .trim()
    .matches(
      /^([1-9]|1[0-2]):[0-5][0-9]\s(a.m.|p.m.)$/,
      "Format mismatch! Example: 1:45 a.m."
    )
    .required()
    .typeError(messages.isRequired),

  endHour: string()
    .trim()
    .matches(
      /^([1-9]|1[0-2]):[0-5][0-9]\s(a.m.|p.m.)$/,
      "Format mismatch! Example: 1:45 a.m."
    )
    .required()
    .typeError(messages.isRequired),
});

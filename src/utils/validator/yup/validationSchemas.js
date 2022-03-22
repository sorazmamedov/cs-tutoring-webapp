import { string, number, boolean, ref, date, object, array } from "yup";
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
    .matches(
      /[A-Za-z0-9-]+@neiu.edu$/,
      "Email does not match: example@neiu.edu"
    )
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

  boolean: boolean()
    .required()
    .typeError("${path}" + messages.isRequired),

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

  // Dates
  date: date()
    .min(new Date(len.minDate), "${path} " + messages.dateError)
    .required()
    .typeError(messages.isRequired),

  startDate: date()
    .min(new Date(len.minDate), messages.dateError)
    .required()
    .typeError(messages.isRequired),

  endDate: date()
    .min(ref("startDate"), messages.dateError)
    .required()
    .typeError(messages.isRequired),

  start: date()
    .min(ref("$min"), "Event start and end dates must be within the semester")
    .max(ref("$max"), "Event start and end dates must be within the semester")
    .required()
    .typeError(messages.isRequired),

  end: date()
    .min(ref("start"), "Event start and end dates must be within the semester")
    .max(
      ref("$rangeMax"),
      "Event start and end dates must be within the semester"
    )
    .required()
    .typeError(messages.isRequired),

  range: object()
    .shape({
      start: date()
        .min(ref("$min"), "Repeat range must be within the semester")
        .max(ref("$min"), "Repeat range must be within the semester")
        .typeError(messages.isRequired),
      end: date()
        .min(ref("start"), "Repeat range must be within the semester")
        .max(ref("$rangeMax"), "Repeat range must be within the semester")
        .typeError(messages.isRequired),
    })
    .when("repeat", {
      is: true,
      then: (schema) => schema.required(),
    }),

  slotsArray: array(
    object().shape({
      start: date()
        .min(ref("$min"), "${path} " + "Slots must be within selected date range")
        .max(ref("$max"), "${path} " + "Slots must be within selected date range")
        .max(ref("$rangeMax"), "${path} " + "Slots must be within selected date range")
        .required()
        .typeError(messages.isRequired),
      end: date()
        .min(ref("start"), "${path} " + "Slots must be within selected date range")
        .max(ref("$max"), "${path} " + "Slots must be within selected date range")
        .max(ref("$rangeMax"), "${path} " + "Slots must be within selected date range")
        .required()
        .typeError(messages.isRequired),
    })
  ).min(1),

  weekday: string()
    .trim()
    .matches(
      /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)$/,
      "Day must be on the week days and must begin with capital letter!"
    )
    .required()
    .typeError(messages.isRequired),

  startHour: string()
    .trim()
    .matches(
      /^([1-9]|1[0-2]):[0-5][0-9]\s(a.m.|p.m.)$/,
      "From: Format mismatch! Example: 1:45 a.m."
    )
    .required()
    .typeError(messages.isRequired),

  endHour: string()
    .trim()
    .matches(
      /^([1-9]|1[0-2]):[0-5][0-9]\s(a.m.|p.m.)$/,
      "To: Format mismatch! Example: 1:45 a.m."
    )
    .required()
    .typeError(messages.isRequired),
});

import { string, number, boolean, ref, date, object, array } from "yup";
import { len, messages } from "../validationMessages";

export default Object.freeze({
  nanoid: string()
    .trim()
    .length(len.idLength)
    .required()
    .typeError("${path}" + messages.idError),

  roles: array().items(number().oneOf([1960, 1988, 2017])),

  activeSemesters: array(string().trim().length(len.idLength)),

  url: string().url(),

  neiuId: string()
    .trim()
    .matches(/^\d{9}$/, "NEIU ID must be a 9 digit number.")
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
    .typeError("${path} " + messages.isRequired),

  // Dates
  date: date()
    .min(new Date(len.minDate), "${path} " + messages.dateError)
    .required()
    .typeError("${path} " + messages.isRequired),

  startDate: date()
    .min(new Date(len.minDate), messages.dateError)
    .required()
    .typeError(messages.isRequired),

  endDate: date()
    .min(ref("startDate"), messages.dateError)
    .required()
    .typeError(messages.isRequired),

  start: date()
    .min(
      ref("$rangeMin"),
      "Event start and end dates must be within the semester"
    )
    .max(ref("$max"), "Event start and end dates must be within the semester")
    .required()
    .typeError("${path} " + messages.isRequired),

  end: date()
    .min(ref("start"), "Event start and end dates must be within the semester")
    .max(
      ref("$rangeMax"),
      "Event start and end dates must be within the semester"
    )
    .required()
    .typeError("${path} " + messages.isRequired),

  repeatUntil: date().when("repeat", {
    is: true,
    then: (schema) =>
      schema
        .min(ref("$min"), "Repeat range must be within the semester")
        .max(ref("$rangeMax"), "Repeat range must be within the semester")
        .required()
        .typeError(
          "Repeat until must be a 'date' type and " + messages.isRequired
        ),
  }),

  slotsArray: array(
    object().shape({
      start: date()
        .min(
          ref("$min"),
          "${path} " + "Slots must be within selected date range"
        )
        .max(
          ref("$max"),
          "${path} " + "Slots must be within selected date range"
        )
        .max(
          ref("$rangeMax"),
          "${path} " + "Slots must be within selected date range"
        )
        .required()
        .typeError("${path} " + messages.isRequired),
      end: date()
        .min(
          ref("start"),
          "${path} " + "Slots must be within selected date range"
        )
        .max(
          ref("$max"),
          "${path} " + "Slots must be within selected date range"
        )
        .max(
          ref("$rangeMax"),
          "${path} " + "Slots must be within selected date range"
        )
        .required()
        .typeError("${path} " + messages.isRequired),
    })
  ).min(1),

  weekday: string()
    .trim()
    .matches(
      /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)$/,
      "Day must be on the week days and must begin with capital letter!"
    )
    .required()
    .typeError("${path} " + messages.isRequired),

  startHour: string()
    .trim()
    .matches(
      /^([1-9]|1[0-2]):[0-5][0-9]\s(a.m.|p.m.)$/,
      "From: Format mismatch! Example: 1:45 a.m."
    )
    .required()
    .typeError("${path} " + messages.isRequired),

  endHour: string()
    .trim()
    .matches(
      /^([1-9]|1[0-2]):[0-5][0-9]\s(a.m.|p.m.)$/,
      "To: Format mismatch! Example: 1:45 a.m."
    )
    .required()
    .typeError("${path} " + messages.isRequired),
});

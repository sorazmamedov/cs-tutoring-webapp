import { object, string, number, date, boolean, ref } from "yup";
import { len, messages } from "../validationMessages";

export default Object.freeze({
  nanoid: string()
    .trim()
    .length(len.idLength, messages.idError)
    .required()
    .typeError(messages.isRequired),

  neiuId: number()
    .integer()
    .min(len.neiuIdStart)
    .max(len.neiuIdEnd)
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

  boolean: boolean().required().typeError(messages.isRequired),

  //Course

  //Semester
  semesterId: string()
    .trim()
    .matches(new RegExp(/^(Fall|Spring|Summer)[2-9]\d{3}$/))
    .required()
    .typeError(messages.isRequired),
  semesterName: string()
    .trim()
    .matches(new RegExp(/^(Fall|Spring|Summer)$/), messages.semesterNameError)
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
  // Joi.string()
  //   .trim()
  //   .matches(
  //     new RegExp(/^[2-9][0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)
  //   )
  //   .required(),
  endDate: number().when("startDate", {
    is: (startDate) => startDate >= len.minDate,
    then: number()
      .min(ref("startDate"), messages.dateError)
      .required()
      .typeError(messages.isRequired),
    otherwise: number()
      .min(len.minDate, messages.dateError)
      .required()
      .typeError(messages.isRequired),
  }),

  //Report
  // status: Joi.string()
  //   .matches(new RegExp(/^(pending|sent|error)$/))
  //   .required(),

  //Schedule
  weekday: number()
    .integer()
    .positive()
    .min(len.minDay)
    .max(len.maxDay)
    .required()
    .typeError(messages.isRequired),

  startHour: number()
    .integer()
    .positive()
    .min(len.minStartHour)
    .max(len.maxEndHour - 1)
    .required()
    .typeError(messages.isRequired),

  endHour: number()
    .integer()
    .positive()
    .moreThan(ref("startHour"))
    .max(len.maxEndHour)
    .required()
    .typeError(messages.isRequired),

  sessionDuration: number()
    .integer()
    .positive()
    .min(len.minSessionDuration)
    .max(len.maxSessionDuration)
    .required()
    .typeError(messages.isRequired),
});

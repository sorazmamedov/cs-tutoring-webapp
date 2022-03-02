const len = Object.freeze({
  //length of a field
  dateLength: 10,
  idLength: 12,
  neiuIdLength: 6,
  neiuIdStart: 100000,
  neiuIdEnd: 999999,
  minNameLength: 2,
  maxNameLength: 30,
  minShortTextLength: 2,
  maxShortTextLength: 100,
  minLongTextLength: 10,
  maxLongTextLength: 1000,
  minYear: 2022,
  minDate: 1641016800000, //(January 1, 2022)
  minDay: 1, //0-Sunday, 1-Monday etc.
  maxDay: 6, //6-Saturday etc. 0-6
  minStartHour: 6, //6am 24 hour format
  maxEndHour: 22, //10pm 24 hour format
  minSessionDuration: 20,
  maxSessionDuration: 50,
});

const messages = Object.freeze({
  //errors
  isRequired: "is a required field!",
  noEmpty: "cannot be empty",
  idError: `"id" must be a string of length ${len.idLength}!`,
  minYearError: `must be equal or greater than ${len.minYear}`,
  neiuIdError: `"neiuId" must be a 6 digit number between ${len.neiuIdStart} and ${len.neiuIdEnd}!`,
  nameError: `must be a string of length: min=${len.minNameLength}, max=${len.maxNameLength}`,
  firstnameError: `Firstname must be a string of length: min=${len.minNameLength}, max=${len.maxNameLength}`, //?
  lastnameError: "Lastname must be a string of length: min=2, max=30", //?
  dateError: "must be a valid future date",
  courseIdError: "Course id is required!", //?
  courseNameError: "Course name must be a string and required!",
  instructorNameError: "Instructor name is required and has to be a string!",
  semesterIdError: "Semester id is required!",
  semesterNameError: "Semester name must be a string and required!",
  locationError: "Location is required and must be a string value!",
  booleanError: "Must be a boolean!",
  subjectError: `Must be a string of length: min=${len.minSubjectLength} max=${len.maxSubjectLength} characters!`,
  contentError: `Must be a string of length: min=${len.minContentLength} max=${len.maxContentLength} characters!`,
  emailError: "Email must be in neiu.edu (ex: johndoe@neiu.edu) domain!",
  academicYearError: "Year is required and must be a positive integer!",
  dayError: "Day must be a number between 0-6, 0-Sunday, 1-Monday and so on!",
  startEndHourError: "Hour must be a number between 6-22 (6am-10pm)!",
  sessionDurationError:
    "Session duration must be a number between 20-50 (minutes)!",
  //patterns
  statusPattern: /^(pending|sent|error)$/,
  // datePattern:
});
export { len, messages };

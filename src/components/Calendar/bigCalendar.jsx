import React, { useMemo, useCallback, useState } from "react";
import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

const BigCalendar = ({
  events,
  handleSelectSlot,
  handleSelectEvent,
  handleRangeChange,
}) => {
  const [view, setView] = useState(Views.WEEK);

  const onView = useCallback((newView) => setView(newView), [setView]);

  const locales = {
    "en-US": enUS,
  };

  const { defaultDate, min, max, formats } = useMemo(
    () => ({
      defaultDate: new Date(),
      min: new Date(2022, 3, 15, 9),
      max: new Date(2022, 3, 15, 22, 30),
      formats: {
        dateFormat: (date, culture, localizer) =>
          localizer.format(date, "d", culture),
      },
    }),
    []
  );

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
    weekStartsOn: 1,
  });

  return (
    <Calendar
      selectable={view !== "month"}
      style={{ height: "700px" }}
      step={15}
      timeslots={4}
      localizer={localizer}
      defaultDate={defaultDate}
      formats={formats}
      events={events}
      defaultView={Views.WEEK}
      views={["week"]}
      min={min}
      max={max}
      onView={onView}
      onSelectEvent={handleSelectEvent}
      onSelectSlot={handleSelectSlot}
      onRangeChange={handleRangeChange}
    />
  );
};

export default BigCalendar;

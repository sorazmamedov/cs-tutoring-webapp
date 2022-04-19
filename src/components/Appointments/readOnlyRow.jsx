import React from "react";
import { format } from "date-fns";
import { BarFillIcon, BarIcon, CancelIcon, EyeIcon, EyeSlashIcon } from "../common/iconsWithTooltip";
import SpinnerBtn from "../common/spinnerBtn";

const ReadOnlyRow = ({
  appointment,
  admin,
  tutor,
  saving,
  handleEdit,
  handleToggle,
}) => {
  return (
    <tr>
      <td>
        {appointment?.student
          ? `${appointment.student.firstName} ${appointment.student.lastName}`
          : `${appointment.tutor.firstName} ${appointment.tutor.lastName}`}
      </td>
      <td>{`${format(appointment.start, "PP")}`}</td>
      <td>{`${format(appointment.start, "h:mm bbb")} - ${format(
        appointment.end,
        "h:mm bbb"
      )}`}</td>
      <td>{appointment.course}</td>
      <td className="ps-1 pe-0 no-stretch text-center">
        {appointment?.student ? (
          <>
            {/* <EyeIcon aria-label="Mark as no show" /> */}
            <EyeSlashIcon aria-label="Mark as showed up" />
            {/* <BarIcon aria-label="Write report" className="me-0 ms-2" /> */}
            <BarFillIcon className="me-0 ms-2" />
          </>
        ) : (
          <>
            <CancelIcon className="p-0" aria-label="Cancel" style={{ color: "red" }} />
          </>
        )}
      </td>
    </tr>
  );
};

export default ReadOnlyRow;

import React from "react";
import { format } from "date-fns";
import { BarIcon, CancelIcon, EyeIcon } from "../common/iconsWithTooltip";
import SpinnerBtn from "../common/spinnerBtn";

const ReadOnlyRow = ({
  appointment,
  saving,
  handleEdit,
  handleNoShow,
  handleCancel,
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
        {saving !== appointment.id ? (
          appointment?.student ? (
            <>
              <EyeIcon
                aria-label="Toggle no show"
                eyeslash={appointment.noShow ? "true" : "false"}
                tooltipTxt={appointment.noShow ? "No Show" : "Show"}
                onClick={() => handleNoShow(appointment)}
              />
              <BarIcon
                aria-label="Write report"
                className="me-0 ms-2"
                barfill={appointment.report ? "true" : "false"}
                tooltipTxt={appointment.report ? "Edit Report" : "Write Report"}
                onClick={() => handleEdit(appointment.id)}
              />
            </>
          ) : (
            <CancelIcon
              className="p-0"
              aria-label="Cancel"
              style={{ color: "red" }}
              onClick={() => handleCancel(appointment.id)}
            />
          )
        ) : (
          <SpinnerBtn btnVariant="" variant="primary" />
        )}
      </td>
    </tr>
  );
};

export default ReadOnlyRow;

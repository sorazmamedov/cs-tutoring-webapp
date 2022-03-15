import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { EditIcon, SwitchIcon } from "../common/iconsWithTooltip";
import SpinnerBtn from "../common/spinnerBtn";

const ReadOnlyRow = ({
  schedule,
  admin,
  tutor,
  saving,
  handleEdit,
  handleToggle,
}) => {
  return (
    <tr>
      <td>{schedule.day}</td>
      <td>{schedule.startHour}</td>
      <td>{schedule.endHour}</td>
      <td>{`${tutor.firstName} ${tutor.lastName}`}</td>
      <td>
        {schedule.location.startsWith("www") ||
        schedule.location.startsWith("https") ? (
          <a href={schedule.location} target="_blank" rel="noopener noreferrer">
            {tutor.firstName}'{!tutor.firstName.endsWith("s") && "s"} Zoom Link
          </a>
        ) : (
          <span>{schedule.location}</span>
        )}
      </td>
      {admin && (
        <td className="ps-1 pe-0 no-stretch">
          {saving !== schedule.id ? (
            <>
              <EditIcon onClick={handleEdit} scheduleid={schedule.id} />
              <SwitchIcon
                scheduleid={schedule.id}
                className="me-0 ms-2"
                onChange={handleToggle}
                checked={schedule.isActive}
              />
            </>
          ) : (
            <SpinnerBtn btnVariant="" variant="primary" />
          )}
        </td>
      )}
    </tr>
  );
};

export default ReadOnlyRow;

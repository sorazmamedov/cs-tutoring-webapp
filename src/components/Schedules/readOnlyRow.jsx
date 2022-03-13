import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { EditIcon, SwitchIcon } from "../common/iconsWithTooltip";

const ReadOnlyRow = ({
  schedule,
  admin,
  tutor,
  saving,
  handleEdit,
  handleToggle,
}) => {
  console.log(schedule, tutor);
  return (
    <tr>
      <td>{schedule.day}</td>
      <td>{schedule.startHour}</td>
      <td>{schedule.endHour}</td>
      <td>{`${tutor.firstName} ${tutor.lastName}`}</td>
      <td className="px-0">
        <a href={schedule.location} target="_blank" rel="noopener noreferrer">
          {tutor.firstName}'{!tutor.firstName.endsWith("s") && "s"} Zoom Link
        </a>
      </td>
      {admin && (
        <td className="pe-0 no-stretch">
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
            <Button className="col-12 p-0 roundBorder" disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="save"
                aria-hidden="true"
              />
              <span className="visually-hidden">Saving...</span>
            </Button>
          )}
        </td>
      )}
    </tr>
  );
};

export default ReadOnlyRow;

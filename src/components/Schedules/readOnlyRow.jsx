import { EditIcon, SwitchIcon } from "../common/iconsWithTooltip";

const ReadOnlyRow = ({ schedule, admin, handleEdit, handleToggle }) => {
  return (
    <tr>
      <td>{schedule.day}</td>
      <td>{schedule.startHour}</td>
      <td>{schedule.endHour}</td>
      <td>{schedule.tutor.name}</td>
      <td className="px-0">
        <a href={schedule.location} target="_blank" rel="noopener noreferrer">
          {schedule.tutor.name}'{!schedule.tutor.name.endsWith("s") && "s"} Zoom
          Link
        </a>
      </td>
      {admin && (
        <td className="pe-0 no-stretch">
          <EditIcon onClick={handleEdit} scheduleid={schedule.id} />
          <SwitchIcon
            scheduleid={schedule.id}
            className="me-0 ms-2"
            onChange={handleToggle}
            checked={schedule.isActive}
          />
        </td>
      )}
    </tr>
  );
};

export default ReadOnlyRow;

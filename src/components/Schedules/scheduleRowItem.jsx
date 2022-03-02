import { EditIcon, SwitchIcon } from "../common/iconsWithTooltip";

const ScheduleRowItem = ({ data, admin, onEdit, onChange }) => {
  return data.map((schedule) => (
    <tr id={schedule.id} key={schedule.id}>
      <td>{schedule.day}</td>
      <td>{schedule.startHour}</td>
      <td>{schedule.endHour}</td>
      <td>{schedule.tutor.name}</td>
      <td className="px-0">{schedule.location}</td>
      {admin && (
        <td className="pe-0 no-stretch">
          <EditIcon onClick={onEdit} scheduleid={schedule.id} />
          <SwitchIcon
            scheduleid={schedule.id}
            className="me-0 ms-2"
            onChange={onChange}
            checked={schedule.isActive}
          />
        </td>
      )}
    </tr>
  ));
};

export default ScheduleRowItem;

import { EditIcon, SwitchIcon } from "../common/IconsWithTooltip";

const ScheduleRowItem = ({ isActive, data, admin, onEdit, onChange }) => {
  return data.map((schedule) => (
    <tr id={schedule.id} key={schedule.id}>
      <td>{schedule.day}</td>
      <td>{schedule.startHour}</td>
      <td>{schedule.endHour}</td>
      <td>{schedule.tutor.name}</td>
      <td className="px-0">{schedule.location}</td>
      {admin && (
        <td className="px-0 mx-0">
          <EditIcon sourceId={schedule.id} onEdit={onEdit} />
          <SwitchIcon sourceid={schedule.id} onChange={onChange} isActive />
        </td>
      )}
    </tr>
  ));
};

export default ScheduleRowItem;

import { EditIcon, SwitchIcon } from "../common/IconsWithTooltip";

const ProfileRowItem = ({ data, admin, onEdit, onChange }) => {
  return data.map((tutor) => (
    <tr id={tutor.id} key={tutor.id}>
      <td>{tutor.neiuId}</td>
      <td>{tutor.firstName}</td>
      <td>{tutor.lastName}</td>
      <td>{tutor.email}</td>
      <td>{tutor.about.length > 30 ? tutor.about.substring(0, 30) + "..." : tutor.about}</td>
      {admin && (
        <td className="pe-0 no-stretch">
          <EditIcon onClick={onEdit} tutorid={tutor.id} />
          <SwitchIcon
            tutorid={tutor.id}
            className="me-0 ms-2"
            onChange={onChange}
            checked={tutor.isActive}
          />
        </td>
      )}
    </tr>
  ));
};

export default ProfileRowItem;

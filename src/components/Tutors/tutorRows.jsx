import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { EditIcon, SwitchIcon } from "../common/iconsWithTooltip";

const TutorRowItem = ({ tutors, admin, saving, onEdit, onChange }) => {
  return tutors.map((tutor) => (
    <tr id={tutor.id} key={tutor.id}>
      <td>{tutor.neiuId}</td>
      <td>{tutor.firstName + " " + tutor.lastName}</td>
      {/* <td>{tutor.lastName}</td> */}
      <td>{tutor.email}</td>
      <td>
        {tutor.about.length > 30
          ? tutor.about.substring(0, 30) + "..."
          : tutor.about}
      </td>
      {admin && (
        <td className="pe-0 no-stretch">
          {saving !== tutor.id ? (
            <>
              <EditIcon onClick={onEdit} tutorid={tutor.id} />
              <SwitchIcon
                tutorid={tutor.id}
                className="me-0 ms-2"
                onChange={onChange}
                checked={tutor.isActive}
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
  ));
};

export default TutorRowItem;

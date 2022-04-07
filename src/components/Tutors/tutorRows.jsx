import React, { useState, useContext } from "react";
import { ActionsContext, ViewContext } from "../../Context/tutorsContext";
import { EditIcon, SwitchIcon } from "../common/iconsWithTooltip";
import SpinnerBtn from "../common/spinnerBtn";
import { putTutor } from "../../apis/cs-tutoring/tutors";
import { showErrors } from "../common/errorHelper";

const TutorRows = ({ setShow, setTitle, setModalBody }) => {
  const { auth, ROLES, tutors } = useContext(ViewContext);
  const { setTutors } = useContext(ActionsContext);
  const [saving, setSaving] = useState(null);

  const handleEdit = (e) => {
    console.log("Edit Target: ", e);
  };

  const handleToggle = async (e) => {
    if (saving) {
      return;
    }
    const id = e.target.getAttribute("tutorid");
    setSaving(id);
    const item = tutors.find((item) => item.id === id);
    const modified = { ...item, isActive: !item.isActive };
    const result = await putTutor(modified);

    if (result.status === 200) {
      let index = tutors.findIndex((item) => item.id === id);
      setSaving(null);
      setTutors([
        ...tutors.slice(0, index),
        result.data,
        ...tutors.slice(++index),
      ]);
    } else {
      setSaving(null);
      showErrors(result, setTitle, setShow, setModalBody);
    }
  };

  return tutors.map((tutor) => (
    <tr id={tutor.id} key={tutor.id}>
      <td>{tutor.neiuId}</td>
      <td>{tutor.firstName + " " + tutor.lastName}</td>
      <td>{tutor.email}</td>
      <td>
        {tutor.about.length > 30
          ? tutor.about.substring(0, 30) + "..."
          : tutor.about}
      </td>
      {auth?.user?.roles.includes(ROLES.Admin) && (
        <td className="pe-0 no-stretch">
          {saving !== tutor.id ? (
            <>
              <EditIcon onClick={handleEdit} tutorid={tutor.id} />
              <SwitchIcon
                tutorid={tutor.id}
                className="me-0 ms-2"
                onChange={handleToggle}
                checked={tutor.isActive}
              />
            </>
          ) : (
            <SpinnerBtn btnVariant="" variant="primary" />
          )}
        </td>
      )}
    </tr>
  ));
};

export default TutorRows;

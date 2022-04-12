import React, { useState, useContext, useEffect } from "react";
import { ActionsContext, ViewContext } from "../../Context/tutorsContext";
import { SwitchIcon } from "../common/iconsWithTooltip";
import SpinnerBtn from "../common/spinnerBtn";
import { showErrors } from "../common/errorHelper";
import useAxios from "../../hooks/useAxios";

const TutorRows = ({ setShow, setTitle, setModalBody }) => {
  const { data, error, axiosFetch } = useAxios();
  const { auth, ROLES, tutors } = useContext(ViewContext);
  const { setTutors } = useContext(ActionsContext);
  const [saving, setSaving] = useState("");

  const handleToggle = async (e) => {
    if (saving) {
      return;
    }
    const id = e.target.getAttribute("tutorid");
    setSaving(id);
    const tutor = tutors.find((item) => item.id === id);

    axiosFetch({
      method: "PUT",
      url: `/users/${id}`,
      requestConfig: { data: { isActive: !tutor.isActive } },
    });
  };

  useEffect(() => {
    if (Object.keys(data).length) {
      let index = tutors.findIndex((item) => item.id === saving);
      setTutors([...tutors.slice(0, index), data, ...tutors.slice(++index)]);
      setSaving(null);
    }
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    if (error) {
      setSaving("");
      showErrors(error, setTitle, setShow, setModalBody);
    }
    // eslint-disable-next-line
  }, [error]);

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
            <SwitchIcon
              tutorid={tutor.id}
              className="me-0 ms-2"
              onChange={handleToggle}
              checked={tutor.isActive}
            />
          ) : (
            <SpinnerBtn btnVariant="" variant="primary" />
          )}
        </td>
      )}
    </tr>
  ));
};

export default TutorRows;

import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const ActionsDropDown = ({ handleAddSemester, handleEditSemester }) => {
  return (
    <Dropdown size="sm">
      <Dropdown.Toggle variant="secondary" className="px-1 py-0 rounded-3">
        More
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#" onClick={handleAddSemester}>
          Add New Semester
        </Dropdown.Item>
        <Dropdown.Item href="#" onClick={handleEditSemester}>
          Edit Semester Dates
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ActionsDropDown;

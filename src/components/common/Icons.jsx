import Form from "react-bootstrap/Form";
import React from "react";

export const editIcon = () => (
  <i className="bi bi-pencil-fill" data-icon-type="edit" />
);

export const deleteIcon = () => (
  <i className="bi bi-trash3 me-3" data-icon-type="delete" />
);

export const toggleIcon = ({ sourceid, onChange }) => {
  return (
    <Form.Switch
      inline
      className="me-0 ms-3"
      data-icon-type="toggle"
      id={sourceid}
      onChange={onChange}
    />
  );
};

export const megaphoneIcon = () => (
  <i className="bi bi-megaphone-fill" data-icon-type="megaphone" />
);

export const plusIcon = () => (
  <i className="bi bi-plus-circle" data-icon-type="plus" />
);

export const arrowUpIcon = () => (
  <i class="bi bi-arrow-up-square-fill" data-icon-type="arrowUp" />
);

export const personIcon = (style) => (
  <i className="bi bi-person-circle" data-icon-type="person" style={style} />
);

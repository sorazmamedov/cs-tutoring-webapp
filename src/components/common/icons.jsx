import Form from "react-bootstrap/Form";
import React from "react";

export const editIcon = ({ className, ...props }) => (
  <i
    className={`bi bi-pencil-fill ${className}`}
    data-icon-type="edit"
    {...props}
  />
);

export const deleteIcon = ({ className, ...props }) => {
  return (
    <i
      className={`bi bi-trash3 ${className}`}
      data-icon-type="delete"
      {...props}
    />
  );
};

export const toggleIcon = (props) => {
  return <Form.Switch inline data-icon-type="toggle" {...props} />;
};

export const megaphoneIcon = (props) => (
  <i className="bi bi-megaphone-fill" data-icon-type="megaphone" {...props} />
);

export const plusIcon = (props) => (
  <i className="bi bi-plus-circle" data-icon-type="plus" {...props} />
);

export const arrowUpIcon = (props) => (
  <i class="bi bi-arrow-up-square-fill" data-icon-type="arrowUp" {...props} />
);

export const personIcon = (style) => (
  <i className="bi bi-person-circle" data-icon-type="person" style={style} />
);

export const HouseIcon = (props) => (
  <i className="bi bi-house-door-fill" data-icon-type="house" {...props} />
);

export const menuIcon = (props) => (
  <i className="bi bi-three-dots" data-icon-type="menu" {...props} />
);

export const checkIcon = (props) => (
  <i className="bi bi-check-circle" data-icon-type="check" {...props} />
);

export const cancelIcon = (props) => (
  <i className="bi bi-x-lg" data-icon-type="cancel" {...props} />
);

export const moonIcon = (props) => (
  <i className="bi bi-moon-stars-fill" data-icon-type="moon" {...props} />
);

export const sunIcon = (props) => (
  <i className="bi bi-brightness-high-fill" data-icon-type="sun" {...props} />
);

export const refreshIcon = ({ rotate, ...props }) => (
  <i
    className={rotate ? "bi bi-arrow-repeat rotate" : "bi bi-arrow-repeat"}
    data-icon-type="refresh"
    {...props}
  />
);

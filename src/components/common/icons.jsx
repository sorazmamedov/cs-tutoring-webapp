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

export const plusIcon = ({className, ...props}) => (
  <i className={`bi bi-plus-circle ${className}`} data-icon-type="plus" {...props} />
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

export const cancelIcon = ({ className, ...props }) => (
  <i className={`bi bi-x-lg ${className}`} data-icon-type="cancel" {...props} />
);

export const moonIcon = (props) => (
  <i className="bi bi-moon-stars-fill" data-icon-type="moon" {...props} />
);

export const sunIcon = ({ className, ...props }) => (
  <i
    className={`bi bi-brightness-high-fill ${className}`}
    data-icon-type="sun"
    {...props}
  />
);

export const refreshIcon = ({ className, ...props }) => (
  <i
    className={`bi bi-arrow-repeat ${className}`}
    data-icon-type="refresh"
    {...props}
  />
);

export const eyeIcon = ({ eyeslash, ...props }) => (
  <i
    className={eyeslash === "true" ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"}
    data-icon-type="eye"
    {...props}
  />
);

export const barIcon = ({ className, barfill, ...props }) => (
  <i
    className={barfill === "true" ? `bi bi-bar-chart-fill ${className}` : `bi bi-bar-chart ${className}`}
    data-icon-type="bar"
    {...props}
  />
);

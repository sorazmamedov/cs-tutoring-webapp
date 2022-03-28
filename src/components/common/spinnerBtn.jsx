import React from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const SpinnerBtn = ({
  text,
  btnVariant,
  role = "save",
  variant,
  size = "sm",
  animation = "grow",
  accessibilityText = "Saving",
  className = "col-12 p-0 roundBorder",
}) => {
  return (
    <Button variant={btnVariant} className={className} disabled>
      <Spinner
        variant={variant}
        as="span"
        animation={animation}
        size={size}
        role={role}
        aria-hidden="true"
        className="text-center"
      />
      <span className="visually-hidden">{accessibilityText}...</span>
      {text}
    </Button>
  );
};

export default SpinnerBtn;

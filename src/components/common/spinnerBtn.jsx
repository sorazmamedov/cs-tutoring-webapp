import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const SpinnerBtn = ({ accessibilityText = "Saving" }) => {
  return (
    <Button className="col-12 p-0 roundBorder" disabled>
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="save"
        aria-hidden="true"
      />
      <span className="visually-hidden">{accessibilityText}...</span>
    </Button>
  );
};

export default SpinnerBtn;

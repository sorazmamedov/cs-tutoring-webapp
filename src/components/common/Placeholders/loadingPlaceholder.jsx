import React from "react";
import Placeholder from "react-bootstrap/Placeholder";

const LoadingPlaceholder = () => {
  return (
    <div className="pt-3 table-placeholder">
      <Placeholder animation="glow">
        <Placeholder xs={6} />
      </Placeholder>
      <Placeholder animation="glow">
        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
        <Placeholder xs={6} /> <Placeholder xs={8} />
      </Placeholder>
      <Placeholder animation="glow">
        <Placeholder xs={6} />
      </Placeholder>
      <Placeholder animation="glow">
        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
        <Placeholder xs={6} /> <Placeholder xs={8} />
      </Placeholder>
    </div>
  );
};

export default LoadingPlaceholder;

import React from "react";
import MainContainer from "./common/mainContainer";

const NotFound = () => {
  return (
    <MainContainer className="shadow p-3 mb-4">
      <h3 className="text-center mb-5">Page not found!</h3>
      <div className="mb-5 text-center">
        <iframe
          width="640"
          height="480"
          src="https://www.youtube.com/embed/eHrcRqu_Es4"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </MainContainer>
  );
};

export default NotFound;

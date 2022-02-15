import React from "react";
import Image from "react-bootstrap/Image";
const ProfileImage = () => {
  return (
    <Image
      src="/profile_placeholder.svg"
      className="mt-4 mb-5 pt-4 pb-3"
      fluid
      roundedCircle
      style={{
        border: "2px solid #707070",
        height: "274px",
        width: "274px",
        backgroundColor: "#FFFFFF 0% 0% no-repeat padding-box",
        boxShadow: "inset 0px 4px 6px #00000029, 0px 3px 6px #00000029",
        opacity: "1"
      }}
    />
  );
};

export default ProfileImage;

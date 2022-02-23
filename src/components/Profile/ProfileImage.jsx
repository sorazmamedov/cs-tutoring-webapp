import React from "react";
import Image from "react-bootstrap/Image";
const ProfileImage = () => {
  return (
    <Image
      src="/profile_placeholder.svg"
      className="mt-4 mb-5 pt-4 pb-3 profileImage"
      fluid
      roundedCircle
    />
  );
};

export default ProfileImage;

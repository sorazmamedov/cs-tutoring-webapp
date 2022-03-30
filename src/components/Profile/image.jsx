import React from "react";
import Image from "react-bootstrap/Image";
const ProfileImage = ({ src }) => {
  return (
    <Image
      src={src ? `${src}=w200-h200-c` : "/profile_placeholder.svg"}
      className={`mt-4 mb-5 profileImage ${!src && `pt-4 pb-3`}`}
      fluid
      roundedCircle
    />
  );
};

export default ProfileImage;

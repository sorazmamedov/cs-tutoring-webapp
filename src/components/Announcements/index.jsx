import React from "react";
import Table from "react-bootstrap/Table";
import { DeleteIcon, MegaphoneIcon } from "../common/IconsWithTooltip";
import MainContainer from "../common/MainContainer";
import CustomPagination from "../CustomPagination";

const Announcements = () => {
  const announcements = [
    {
      id: 1,
      subject:
        "Victor’s tutoring hours today will be conducted remotely.  See attached for zoom link.",
      read: false,
      draft: false,
    },
    {
      id: 2,
      subject:
        "Andrew’s tutoring hours today will be conducted remotely.  See attached for zoom link.",
      read: true,
      draft: true,
    },
    {
      id: 3,
      subject:
        "Alin’s tutoring hours today will be conducted remotely.  See attached for zoom link.",
      read: true,
      draft: false,
    },
    {
      id: 4,
      subject:
        "Berk’s tutoring hours today will be conducted remotely.  See attached for zoom link.",
      read: false,
      draft: false,
    },
    {
      id: 5,
      subject:
        "Victor’s tutoring hours today will be conducted remotely.  See attached for zoom link.",
      read: false,
      draft: true,
    },
    {
      id: 6,
      subject:
        "Serdar’s tutoring hours today will be conducted remotely.  See attached for zoom link.",
      read: true,
      draft: false,
    },
    {
      id: 7,
      subject:
        "Thomas’s tutoring hours today will be conducted remotely.  See attached for zoom link.",
      read: true,
      draft: false,
    },
  ];

  const handleShowAnnouncement = (e) => {
    e.stopPropagation();
    console.log(e.target);
  };

  const handleDelete = () => {};
  return (
    <MainContainer title="Announcements" icon={<MegaphoneIcon />}>
      <Table bordered hover responsive>
        <tbody>
          {announcements.map((announcement) => (
            <tr
              id={announcement.id}
              key={announcement.id}
              className="w-100 d-flex justify-content-between"
              onClick={(e) => handleShowAnnouncement(e)}
            >
              <td className="w-100 d-flex justify-content-between">
                <span className={announcement.draft ? "text-danger" : ""}>
                  {announcement.subject}
                </span>
                <div>
                  {announcement.draft && (
                    <span className="d-inline text-danger me-4">Draft</span>
                  )}
                  <DeleteIcon
                    sourceId={announcement.id}
                    onDelete={handleDelete}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <CustomPagination />
    </MainContainer>
  );
};

export default Announcements;

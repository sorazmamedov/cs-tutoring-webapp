import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import MainContainer from "../common/MainContainer";
import TableHeader from "../CustomTable/TableHeader";
import ProfileRowItem from "./ProfileRowItem";
import CustomPagination from "../common/CustomPagination";
import { PlusIcon } from "../common/IconsWithTooltip";
import { useEffect } from "react";

const Profiles = () => {
  const admin = true;
  const data = [
    {
      id: "wx-nWZPAX1TC",
      neiuId: 123563,
      firstName: "John",
      lastName: "Monroe",
      email: "jmonroe@neiu.edu",
      about: "Some lorem ipsum and some more Some lorem ipsum and Some lorem ipsum",
    },
    {
      id: "2ZXHi4q7J_9m",
      neiuId: 777777,
      firstName: "Martin",
      lastName: "King",
      email: "mking@neiu.edu",
      about: "From California",
    },
    {
      id: "Zt5_isRtMR10",
      neiuId: 789456,
      firstName: "Brook",
      lastName: "Beckham",
      email: "bbeckhamasdad@neiu.edu",
      about: "From London",
    },
    {
      id: "0gtY1ZHfxsyb",
      neiuId: 676877,
      firstName: "Jennifer",
      lastName: "Monroe",
      email: "jmonroe@neiu.edu",
      about: "From NYC",
    },
    {
      id: "fWkdyv20bLQw",
      neiuId: 784878,
      firstName: "Madelyn",
      lastName: "Katowski",
      email: "mkatowski@neiu.edu",
      about: "From Idaho",
    },
    {
      id: "aKpdLEo4EG6y",
      neiuId: 789456,
      firstName: "Brook",
      lastName: "Beckham",
      email: "bbeckham@neiu.edu",
      about: "From London",
    },
    {
      id: "CiBK_33uD81s",
      neiuId: 789456,
      firstName: "Scarlett",
      lastName: "Moe",
      email: "smoe@neiu.edu",
      about: "From Pensylvania",
    },
  ];

  const [profiles, setProfiles] = useState(
    JSON.parse(localStorage.getItem("profiles")) || data
  );

  useEffect(() => {
    localStorage.setItem("profiles", JSON.stringify(profiles));

    return () => {
      console.log("Clean up...");
      localStorage.removeItem("profiles");
    };
  }, [profiles]);

  const header = ["ID", "Firstname", "Lastname", "Email", "About"];
  if (admin) {
    header.push("Actions");
  }

  const handleEdit = (e) => {
    console.log("Edit Target: ", e);
  };

  const handleToggleChange = (e) => {
    const id = parseInt(e.target.getAttribute("scheduleid"));
    const modified = profiles.map((item) =>
      item.id === id ? { ...item, isActive: !item.isActive } : item
    );
    setProfiles(modified);
  };

  return (
    <MainContainer title="Tutor Profile" icon={<PlusIcon />}>
      <Table hover responsive>
        <TableHeader headers={header} />
        <tbody className="text-muted">
          <ProfileRowItem
            data={profiles}
            onEdit={handleEdit}
            onChange={handleToggleChange}
            admin={admin}
          />
        </tbody>
      </Table>
      <CustomPagination />
    </MainContainer>
  );
};

export default Profiles;

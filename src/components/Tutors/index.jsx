import React, { useContext, useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import MainContainer from "../common/mainContainer";
import TableHeader from "../CustomTable/tableHeader";
import TutorRowItem from "./tutorRowItem";
import CustomPagination from "../common/customPagination";
import { PlusIcon } from "../common/iconsWithTooltip";
import { GlobalViewContext } from "../Context/dataContext";
import { ActionsContext, ViewContext } from "../Context/tutorsContext";
import TitleBar from "../common/titleBar";
import {
  NoDataPlaceholder,
  ErrorPlaceholder,
  LoadingPlaceholder,
} from "../common/Placeholders/";
import TemplateModal from "../common/templateModal";
const Tutors = () => {
  const { admin } = useContext(GlobalViewContext);
  const { tutors, loading, error } = useContext(ViewContext);
  const { setTutors } = useContext(ActionsContext);

  const header = ["ID", "Firstname", "Lastname", "Email", "About"];
  const adminHeader = [...header, "Actions"]


  const handleEdit = (e) => {
    console.log("Edit Target: ", e);
  };

  const handleToggleChange = (e) => {
    const id = parseInt(e.target.getAttribute("scheduleid"));
    const modified = tutors.map((item) =>
      item.id === id ? { ...item, isActive: !item.isActive } : item
    );
    setTutors(modified);
  };

  return (
    <MainContainer>
      {!loading && !error && <TitleBar title="Tutors" icon={<PlusIcon />} />}
      {loading && <LoadingPlaceholder />}
      {!loading && error && <ErrorPlaceholder />}
      {!loading && !error && tutors && tutors.length === 0 && <NoDataPlaceholder />}
      {!loading && !error && tutors && tutors.length !== 0 && (
        <>
          <Table hover responsive>
            <TableHeader headers={admin ? adminHeader : header} />
            <tbody className="text-muted">
              <TutorRowItem
                data={tutors}
                onEdit={handleEdit}
                onChange={handleToggleChange}
                admin={admin}
              />
            </tbody>
          </Table>
          <CustomPagination />
        </>
      )}
      <TemplateModal viewContext={ViewContext} />
    </MainContainer>
  );
};

export default Tutors;

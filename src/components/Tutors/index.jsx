import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import MainContainer from "../common/mainContainer";
import TableHeader from "../common/tableHeader";
import TutorRows from "./tutorRows";
import CustomPagination from "../common/customPagination";
import { PlusIcon } from "../common/iconsWithTooltip";
import { ViewContext } from "../Context/tutorsContext";
import TitleBar from "../common/titleBar";
import {
  NoDataPlaceholder,
  ErrorPlaceholder,
  LoadingPlaceholder,
} from "../common/Placeholders/";
import TemplateModal from "../common/templateModal";

const Tutors = () => {
  const { admin, tutors, loading, error } = useContext(ViewContext);

  const header = ["ID", "Name", "Email", "About"];
  const adminHeader = [...header, "Actions"];

  return (
    <MainContainer>
      {!loading && !error && <TitleBar title="Tutors" />}
      {loading && <LoadingPlaceholder />}
      {!loading && error && <ErrorPlaceholder />}
      {!loading && !error && tutors && tutors.length === 0 && (
        <NoDataPlaceholder />
      )}
      {!loading && !error && tutors && tutors.length !== 0 && (
        <>
          <Table hover responsive>
            <TableHeader headers={admin ? adminHeader : header} />
            <tbody className="text-muted">
              <TutorRows />
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

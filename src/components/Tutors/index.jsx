import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import MainContainer from "../common/mainContainer";
import TableHeader from "../common/tableHeader";
import TutorRows from "./tutorRows";
import CustomPagination from "../common/customPagination";
import { ViewContext } from "../../Context/tutorsContext";
import TitleBar from "../common/titleBar";
import {
  NoDataPlaceholder,
  ErrorPlaceholder,
  LoadingPlaceholder,
} from "../common/Placeholders/";
import useModal from "../../hooks/useModalStates";
import TemplateModal from "../common/templateModal";

const Tutors = () => {
  const { admin, tutors, loading, error } = useContext(ViewContext);
  const { show, title, ModalBody, reset, setShow, setTitle, setModalBody } =
    useModal();
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
              <TutorRows {...{ setShow, setTitle, setModalBody }} />
            </tbody>
          </Table>
          <CustomPagination />
        </>
      )}
      <TemplateModal {...{ show, title, ModalBody, reset }} />
    </MainContainer>
  );
};

export default Tutors;

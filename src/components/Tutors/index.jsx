import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import MainContainer from "../common/mainContainer";
import TableHeader from "../common/tableHeader";
import TutorRows from "./tutorRows";
import CustomPagination from "../common/customPagination";
import { PlusIcon } from "../common/iconsWithTooltip";
import { ActionsContext, ViewContext } from "../../Context/tutorsContext";
import TitleBar from "../common/titleBar";
import {
  NoDataPlaceholder,
  ErrorPlaceholder,
  LoadingPlaceholder,
} from "../common/Placeholders/";
import useModal from "../../hooks/useModalStates";
import TemplateModal from "../common/templateModal";
import AddTutorDialog from "./addTutorDialog";

const Tutors = () => {
  const { auth, ROLES, signingIn, tutors, loading, error, loadedSemester } =
    useContext(ViewContext);
  const { setTutors } = useContext(ActionsContext);
  const { show, title, ModalBody, reset, setShow, setTitle, setModalBody } =
    useModal();
  const header = ["ID", "Name", "Email", "About"];
  const adminHeader = [...header, "Status"];

  const handleAddTutor = () => {
    setTitle("Add New Tutor");
    setModalBody(
      <AddTutorDialog {...{ setTutors, loadedSemester, ROLES, reset }} />
    );
    setShow(true);
  };

  return (
    <MainContainer>
      {!loading && !signingIn && !error && (
        <TitleBar
          title="Tutors"
          icon={
            auth?.user?.roles.includes(ROLES.Admin) && (
              <PlusIcon onClick={handleAddTutor} />
            )
          }
        />
      )}
      {(loading || signingIn) && <LoadingPlaceholder />}
      {!loading && error && <ErrorPlaceholder />}
      {!loading && !signingIn && !error && tutors && tutors.length === 0 && (
        <NoDataPlaceholder />
      )}
      {!loading && !signingIn && !error && tutors && tutors.length !== 0 && (
        <>
          <Table hover responsive>
            <TableHeader
              headers={
                auth?.user?.roles.includes(ROLES.Admin) ? adminHeader : header
              }
            />
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

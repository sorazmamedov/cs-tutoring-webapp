import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import { PlusIcon, RefreshIcon } from "../common/iconsWithTooltip";
import MainContainer from "../common/mainContainer";
import TableHeader from "../common/tableHeader";
import CourseRows from "./courseRows";
import CustomPagination from "../common/customPagination";
import TemplateModal from "../common/templateModal";
import AddCourseDialog from "./AddCourseDialog/";
import TitleBar from "../common/titleBar";
import { ActionsContext, ViewContext } from "../../Context/courseContext";
import useModal from "../../hooks/useModalStates";
import {
  NoDataPlaceholder,
  ErrorPlaceholder,
  LoadingPlaceholder,
} from "../common/Placeholders/";

const Courses = () => {
  const {
    courses,
    loading,
    error,
    darkTheme,
    loadedSemester,
    page,
    pageCount,
  } = useContext(ViewContext);
  const { setPage, setRefetch } = useContext(ActionsContext);
  const { show, title, ModalBody, reset, setShow, setTitle, setModalBody } =
    useModal();

  const headers = ["Section", "Course", "Instructor", "Email", "Actions"];

  const handleAddCourse = () => {
    setTitle("Add New Courses");
    setModalBody(
      <AddCourseDialog
        {...{
          semesterId: loadedSemester.id,
          pageCount,
          setRefetch,
        }}
      />
    );
    setShow(true);
  };

  return (
    <MainContainer>
      <TitleBar
        title={"Courses"}
        icon={
          loading && courses && courses.length !== 0 ? (
            <RefreshIcon onClick={() => setRefetch(true)} className="rotate" />
          ) : (
            <PlusIcon onClick={handleAddCourse} />
          )
        }
      />

      {loading && courses && courses.length === 0 && <LoadingPlaceholder />}
      {!loading && error && <ErrorPlaceholder />}
      {!loading && !error && courses && courses.length === 0 && (
        <NoDataPlaceholder />
      )}

      {!error && courses && courses.length !== 0 && (
        <>
          <Table className="text-center" bordered hover responsive>
            <TableHeader {...{ headers, darkTheme }} />
            <tbody className={darkTheme ? "" : "text-muted"}>
              <CourseRows {...{ reset, setShow, setTitle, setModalBody }} />
            </tbody>
          </Table>
          <CustomPagination {...{ page, pageCount, setPage }} />
        </>
      )}
      <TemplateModal {...{ show, title, ModalBody, reset }} />
    </MainContainer>
  );
};

export default Courses;

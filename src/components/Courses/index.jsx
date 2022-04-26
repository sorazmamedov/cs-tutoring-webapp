import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import { PlusIcon } from "../common/iconsWithTooltip";
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
    total,
    limit
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
          coursesLen: courses.length,
          setPage,
        }}
      />
    );
    setShow(true);
  };

  return (
    <MainContainer>
      {!loading && !error && (
        <TitleBar
          title={"Courses"}
          icon={<PlusIcon onClick={handleAddCourse} />}
        />
      )}

      {loading && <LoadingPlaceholder />}
      {!loading && error && <ErrorPlaceholder />}
      {!loading && !error && courses && courses.length === 0 && (
        <NoDataPlaceholder />
      )}

      {!loading && !error && courses && courses.length !== 0 && (
        <>
          <Table className="text-center" bordered hover responsive>
            <TableHeader {...{ headers, darkTheme }} />
            <tbody className={darkTheme ? "" : "text-muted"}>
              <CourseRows {...{ reset, setShow, setTitle, setModalBody }} />
            </tbody>
          </Table>
          <CustomPagination {...{page, pageCount, setPage, total, limit, setRefetch }} />
        </>
      )}
      <TemplateModal {...{ show, title, ModalBody, reset }} />
    </MainContainer>
  );
};

export default Courses;

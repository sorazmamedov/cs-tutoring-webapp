import React, { useContext, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { PlusIcon } from "../common/iconsWithTooltip";
import MainContainer from "../common/mainContainer";
import TableHeader from "../CustomTable/tableHeader";
import CourseRows from "./courseRows";
import CustomPagination from "../common/customPagination";
import TemplateModal from "../common/templateModal";
import CourseDialog from "./courseDialog";
import TitleBar from "../common/titleBar";
import { ActionsContext, ViewContext } from "../Context/courseContext";
import { GlobalViewContext } from "../Context/dataContext";
import {
  NoDataPlaceholder,
  ErrorPlaceholder,
  LoadingPlaceholder,
} from "../common/Placeholders/";

const Courses = () => {
  const { admin } = useContext(GlobalViewContext);
  const { courses, loading, error } = useContext(ViewContext);
  const { setShow, setTitle, setModalBody } = useContext(ActionsContext);

  const tableHeader = ["Section", "Course", "Instructor", "Email"];
  const adminTHeader = [...tableHeader, "Actions"];

  const handleAddCourse = () => {
    setTitle("Add New Courses");
    setModalBody(() => CourseDialog);
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
            <TableHeader headers={admin ? adminTHeader : tableHeader} />
            <tbody className="text-muted">
              <CourseRows admin={admin} />
            </tbody>
          </Table>
          <CustomPagination />
        </>
      )}
      <TemplateModal viewContext={ViewContext} />
    </MainContainer>
  );
};

export default Courses;

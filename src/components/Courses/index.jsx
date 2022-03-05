import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import { PlusIcon } from "../common/iconsWithTooltip";
import MainContainer from "../common/mainContainer";
import TableHeader from "../CustomTable/tableHeader";
import CourseRowItem from "./courseRowItem";
import CustomPagination from "../common/customPagination";
import TemplateModal from "../common/templateModal";
import CourseDialog from "./courseDialog";
import { ActionsContext, ViewContext } from "../Context/courseContext";
import { GlobalViewContext } from "../Context/dataContext";

const Courses = () => {
  const { loadedSemester } = useContext(GlobalViewContext);
  const { show, courses } = useContext(ViewContext);
  const { setShow, setTitle, setModalBody, setCourses } =
    useContext(ActionsContext);
  const admin = true;

  const tableHeader = ["Section", "Course", "Semester", "Instructor", "Email"];
  if (admin) {
    tableHeader.push("Edit");
  }

  const handleAddCourse = () => {
    setTitle("Add New Courses");
    setModalBody(() => CourseDialog);
    setShow(true);
  };
  return (
    <MainContainer
      title={
        !loadedSemester?.semesterName
          ? "Courses"
          : `Courses <--> ${loadedSemester.semesterName} ${loadedSemester.academicYear}`
      }
      icon={<PlusIcon onClick={handleAddCourse} />}
    >
      <Table className="text-center mx-auto" bordered hover responsive>
        <TableHeader headers={tableHeader} />
        <tbody className="text-muted">
          <CourseRowItem data={courses} admin={admin} />
        </tbody>
      </Table>
      <CustomPagination />
      <TemplateModal viewContext={ViewContext} />
    </MainContainer>
  );
};

export default Courses;

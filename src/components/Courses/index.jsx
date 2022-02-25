import React from "react";
import Table from "react-bootstrap/Table";
import { PlusIcon } from "../common/IconsWithTooltip";
import MainContainer from "../common/MainContainer";
import CustomPagination from "../common/CustomPagination";
import TableHeader from "../CustomTable/TableHeader";
import CourseRowItem from "./CourseRowItem";

const Courses = () => {
  const admin = true;
  const courses = [
    {
      id: "OmI7h-JiesTo",
      courseCode: "CS-324-1",
      courseName: "Algorithms",
      semesterId: "Pp9NItWifwKW",
      instructorName: "Peter Kimmel",
      instructorEmail: "pkimmel@neiu.edu",
    },
    {
      id: "OhKh3ClzPv-y",
      courseCode: "CS-400-2",
      courseName: "Discrete Structures",
      semesterId: "Pp9NItWifwKW",
      instructorName: "Rachel Trana",
      instructorEmail: "rtrana@neiu.edu",
    },
    {
      id: "QCYy5AGrKZrl",
      courseCode: "CS-442",
      courseName: "Network",
      semesterId: "Pp9NItWifwKW",
      instructorName: "TBA",
      instructorEmail: "TBA@neiu.edu",
    },
    {
      id: "U5NsuHEmMxds",
      courseCode: "CS-442",
      courseName: "Operating Systems",
      semesterId: "Pp9NItWifwKW",
      instructorName: "TBA",
      instructorEmail: "TBA@neiu.edu",
    },
    {
      id: "ZQAd_NT9e8Pk",
      courseCode: "CS-442",
      courseName: "Game Theory",
      semesterId: "Pp9NItWifwKW",
      instructorName: "TBA",
      instructorEmail: "TBA@neiu.edu",
    },
    {
      id: "US0g_IJcyYWj",
      courseCode: "CS-442",
      courseName: "Java Mastery",
      semesterId: "Pp9NItWifwKW",
      instructorName: "TBA",
      instructorEmail: "TBA@neiu.edu",
    },
    {
      id: "KY9V4BrBTiSV",
      courseCode: "CS-442",
      courseName: "Front-End Development",
      semesterId: "Pp9NItWifwKW",
      instructorName: "TBA",
      instructorEmail: "TBA@neiu.edu",
    },
    {
      id: "VrveAvVNT_7h",
      courseCode: "CS-442",
      courseName: "Data Mining",
      semesterId: "Pp9NItWifwKW",
      instructorName: "TBA",
      instructorEmail: "TBA@neiu.edu",
    },
  ];

  const tableHeader = ["Section", "Course", "Semester", "Instructor", "Email"];
  if (admin) {
    tableHeader.push("Edit");
  }

  return (
    <MainContainer title="Courses" icon={<PlusIcon />}>
      <Table className="text-center mx-auto" bordered hover responsive>
        <TableHeader headers={tableHeader} />
        <tbody className="text-muted">
          <CourseRowItem data={courses} admin={admin} />
        </tbody>
      </Table>
      <CustomPagination />
    </MainContainer>
  );
};

export default Courses;

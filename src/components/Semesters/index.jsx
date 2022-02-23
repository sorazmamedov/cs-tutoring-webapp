import React, { useState, useRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { HouseIcon } from "../common/Icons";
import MainContainer from "../common/MainContainer";
import TitleBar from "../common/TitleBar";

const Semesters = () => {
  const yearRef = useRef(null);
  const [semesters, setSemesters] = useState([
    {
      id: 0,
      semesterName: "Spring",
      academicYear: "2021",
      startDate: "8/26/2021",
      endDate: "12/14/2021",
      active: true,
    },
    {
      id: 1,
      semesterName: "Fall",
      academicYear: "2021",
      startDate: "8/26/2021",
      endDate: "12/14/2021",
      active: false,
    },
    {
      id: 2,
      semesterName: "Spring",
      academicYear: "2022",
      startDate: "1/21/2022",
      endDate: "5/10/2022",
      active: true,
    },
    {
      id: 3,
      semesterName: "Summer",
      academicYear: "2022",
      startDate: "5/26/2022",
      endDate: "8/14/2022",
      active: false,
    },
    {
      id: 4,
      semesterName: "Fall",
      academicYear: "2022",
      startDate: "8/26/2022",
      endDate: "12/14/2022",
      active: false,
    },
    {
      id: 5,
      semesterName: "Spring",
      academicYear: "2023",
      startDate: "1/15/2023",
      endDate: "5/7/2023",
      active: false,
    },
    {
      id: 6,
      semesterName: "Summer",
      academicYear: "2023",
      startDate: "5/15/2023",
      endDate: "8/7/2023",
      active: false,
    },
    {
      id: 7,
      semesterName: "Summer",
      academicYear: "2034",
      startDate: "5/15/2034",
      endDate: "8/7/2034",
      active: false,
    },
  ]);

  const availableYears = [
    ...new Set(semesters.map((item) => item.academicYear)),
  ];

  const [currentSemester, setCurrentSemester] = useState(
    semesters.filter(
      (item) =>
        item.active &&
        Date.parse(item.startDate) <= Date.now() &&
        Date.parse(item.endDate) >= Date.now()
    )[0] || semesters[0]
  );

  const [loadedSemester, setLoadedSemester] = useState(currentSemester.id);

  const [selectedYear, setSelectedYear] = useState(
    currentSemester.academicYear
  );

  const handleLoad = () => {
    setLoadedSemester(currentSemester.id);
  };

  const handleStatusChange = () => {
    setCurrentSemester({ ...currentSemester, active: !currentSemester.active });
    setSemesters([
      ...semesters.filter((item) => item.id !== currentSemester.id),
      { ...currentSemester, active: !currentSemester.active },
    ]);
  };

  const handleSemesterChange = (selected) => {
    setCurrentSemester(
      semesters.find(
        (item) => item.semesterName + " " + item.academicYear === selected
      )
    );
  };

  const handleYearChange = (selected) => {
    setSelectedYear(selected);
    setCurrentSemester(
      semesters.filter((item) => item.academicYear === selected)[0]
    );
  };

  const handleAddSemester = () => {
    console.log("Add new semester ....");
  };

  const handleEditSemester = () => {
    console.log("Edit semester ....");
  };

  const handleDeleteSemester = () => {
    const targetId = currentSemester.id;
    setSemesters([...semesters.filter((item) => item.id !== targetId)]);
  };

  return (
    <MainContainer className="shadow p-3 mb-4 rounded-3">
      <TitleBar className="w-100 d-flex justify-content-between align-items-center text-muted">
        <div className="w-100">
          <HouseIcon />
          <span className="ms-3 fw-bolder align-text-bottom">Semester</span>

          {/* Select Year */}
          <select
            ref={yearRef}
            className="ms-3 text-muted align-text-bottom rounded bg-white px-1"
            onChange={(e) => handleYearChange(e.target.value)}
            value={currentSemester.academicYear}
          >
            {availableYears.map((year) => (
              <option id={year} key={year}>
                {year}
              </option>
            ))}
          </select>
          {/* End of Select Year */}

          {/* Select Semester */}
          <select
            className="ms-3 text-muted align-text-bottom rounded bg-white px-1"
            onChange={(e) =>
              handleSemesterChange(e.target.value, e.target.name)
            }
            value={`${currentSemester.semesterName} ${currentSemester.academicYear}`}
          >
            {semesters
              .filter((item) => item.academicYear === selectedYear)
              .map((semester) => (
                <option name={semester.id} key={semester.id}>
                  {`${semester.semesterName} ${semester.academicYear}`}
                </option>
              ))}
          </select>
          {/* End of Select Semester */}

          <Button
            disabled={loadedSemester === currentSemester.id}
            size="sm"
            className={`ms-4 px-3 py-0 align-text-bottom ${
              loadedSemester === currentSemester.id
                ? "btn-secondary"
                : "available"
            }`}
            onClick={handleLoad}
          >
            LOAD
          </Button>

          <span className="ms-4 me-2 fw-bolder align-text-bottom">Status:</span>
          <Button
            size="sm"
            className="py-0 align-text-bottom"
            variant={currentSemester.active ? "success" : "warning"}
            onClick={handleStatusChange}
          >
            {currentSemester.active ? (
              <span className="px-2">Active</span>
            ) : (
              "Deactive"
            )}
          </Button>
        </div>
        <Dropdown size="sm">
          <Dropdown.Toggle variant="secondary" className="px-1 py-0 rounded-3">
            More
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#" onClick={handleAddSemester}>
              Add New Semester
            </Dropdown.Item>
            <Dropdown.Item href="#" onClick={handleEditSemester}>
              Edit Current Semester
            </Dropdown.Item>
            <Dropdown.Item
              href="#"
              onClick={handleDeleteSemester}
              className="text-danger"
            >
              Delete Current Semester
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </TitleBar>
    </MainContainer>
  );
};

export default Semesters;

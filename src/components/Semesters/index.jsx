import React, { useState, useContext, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { HouseIcon } from "../common/Icons";
import MainContainer from "../common/MainContainer";
import TitleBar from "../common/TitleBar";
import {
  GlobalViewContext,
  GlobalActionsContext,
} from "../Context/DataContext";
import { ViewContext, ActionsContext } from "../Context/SemesterContext";
import TemplateModal from "../common/TemplateModal";
import SemesterDialog from "./SemesterDialog";

const Semesters = () => {
  const { loadedSemester } = useContext(GlobalViewContext);
  const { setLoadedSemester } = useContext(GlobalActionsContext);
  const { semesters } = useContext(ViewContext);
  const { setTitle, setSemesters, setModalBody, setEditSemesterId, setShow } =
    useContext(ActionsContext);

  const [availableYears, setAvailableYears] = useState([]);

  const [currentSemester, setCurrentSemester] = useState(loadedSemester);

  const handleYearChange = (selected) => {
    const year = parseInt(selected);
    setCurrentSemester(
      semesters.filter((item) => item.academicYear === year)[0]
    );
  };

  const handleSemesterChange = (e) => {
    setCurrentSemester(semesters.find((item) => item.id === e.target.value));
  };

  const handleLoad = () => {
    setLoadedSemester(currentSemester);
  };

  const handleStatusChange = () => {
    setCurrentSemester({ ...currentSemester, active: !currentSemester.active });
    setSemesters([
      ...semesters.filter((item) => item.id !== currentSemester.id),
      { ...currentSemester, active: !currentSemester.active },
    ]);
  };

  const handleAddSemester = () => {
    setTitle("Add New Semester");
    setModalBody(() => SemesterDialog);
    setShow(true);
  };

  const handleEditSemester = () => {
    setTitle("Edit Semester");
    setEditSemesterId(currentSemester.id);
    setModalBody(() => SemesterDialog);
    setShow(true);
  };

  const handleDeleteSemester = () => {
    const targetId = currentSemester.id;
    setSemesters([...semesters.filter((item) => item.id !== targetId)]);
    setAvailableYears([...new Set(semesters.map((item) => item.academicYear))]);
  };

  useEffect(() => {
    console.log("Loaded semester has changed...");
    // setLoadedSemesterId(currentSemester.id);
  }, [loadedSemester]);

  useEffect(() => {
    console.log("Semesters have changed...");
    setAvailableYears([...new Set(semesters.map((item) => item.academicYear))]);
  }, [semesters]);

  return (
    <MainContainer className="shadow p-3 mb-4 rounded-3">
      <TitleBar className="w-100 d-flex justify-content-between align-items-center text-muted">
        <div className="w-100">
          <HouseIcon />
          <span className="ms-3 fw-bolder align-text-bottom">Semester</span>

          {/* Select Year */}
          <select
            className="ms-3 text-muted align-text-bottom rounded bg-white px-1"
            onChange={(e) => handleYearChange(e.target.value)}
            value={currentSemester.academicYear}
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {/* End of Select Year */}

          {/* Select Semester */}
          <select
            className="ms-3 text-muted align-text-bottom rounded bg-white px-1"
            onChange={(e) => handleSemesterChange(e)}
            value={currentSemester.id}
          >
            {semesters
              .filter(
                (item) => item.academicYear === currentSemester.academicYear
              )
              .map((semester) => (
                <option key={semester.id} value={semester.id}>
                  {`${semester.semesterName}`}
                </option>
              ))}
          </select>
          {/* End of Select Semester */}

          <Button
            disabled={loadedSemester.id === currentSemester.id}
            size="sm"
            className={`ms-4 px-3 py-0 align-text-bottom ${
              loadedSemester.id === currentSemester.id
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
              "Inactive"
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
      <TemplateModal viewContext={ViewContext} />
    </MainContainer>
  );
};

export default Semesters;

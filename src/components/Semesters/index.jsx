import React, { useState, useContext, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Placeholder from "react-bootstrap/Placeholder";
import { HouseIcon } from "../common/Icons";
import { PlusIcon } from "../common/IconsWithTooltip";
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
  const { semesters, currentSemester, loading, error } =
    useContext(ViewContext);
  const {
    setTitle,
    setSemesters,
    setModalBody,
    setShow,
    setCurrentSemester,
    setEdit,
  } = useContext(ActionsContext);

  // const loading = false;
  // const error = false;

  const [availableYears, setAvailableYears] = useState([]);

  const handleYearChange = (selected) => {
    const year = parseInt(selected);
    setCurrentSemester({
      ...semesters.filter((item) => item.academicYear === year)[0],
    });
  };

  const handleSemesterChange = (e) => {
    setCurrentSemester(semesters.find((item) => item.id === e.target.value));
  };

  const handleLoad = () => {
    setLoadedSemester({ ...currentSemester });
  };

  const handleStatusChange = () => {
    const modified = {
      ...currentSemester,
      active: !currentSemester.active,
    };

    let index = semesters.findIndex((item) => item.id === modified.id);

    setSemesters([
      ...semesters.slice(0, index),
      modified,
      ...semesters.slice(++index),
    ]);
    setCurrentSemester(modified);
    if (loadedSemester.id === modified.id) {
      setLoadedSemester(modified);
    }
  };

  const handleAddSemester = () => {
    setTitle("Add New Semester");
    setModalBody(() => SemesterDialog);
    setShow(true);
  };

  const handleEditSemester = () => {
    setTitle("Edit Semester");
    setEdit(true);
    setModalBody(() => SemesterDialog);
    setShow(true);
  };

  const handleDeleteSemester = () => {
    const targetId = currentSemester.id;
    setSemesters([...semesters.filter((item) => item.id !== targetId)]);
    setAvailableYears([...new Set(semesters.map((item) => item.academicYear))]);
  };

  useEffect(() => {
    if (Object.keys(loadedSemester).length !== 0) {
      console.log("==============Got loadedSemester=============");
      setCurrentSemester({ ...loadedSemester });
    }
  }, [loadedSemester]);

  useEffect(() => {
    if (semesters.length !== 0) {
      console.log("==============Setting availableYears=============");
      setAvailableYears([
        ...new Set(semesters.map((item) => item.academicYear)),
      ]);
    }
  }, [semesters]);

  return (
    <MainContainer className="shadow p-3 mb-4 rounded-3">
      {loading && (
        <Placeholder as="p" animation="glow" className="m-auto">
          <Placeholder xs={12} />
        </Placeholder>
      )}
      {!loading && error && (
        <p className="m-auto text-center text-muted">
          Error occured! Please try reloading the page!
        </p>
      )}
      {!loading && !error && semesters.length === 0 && (
        <div className="d-flex float-right">
          <p className="m-auto text-center text-muted">
            Empty - no data available!
          </p>
          <PlusIcon text="Add New Semester" onClick={handleAddSemester} />
        </div>
      )}
      {!loading &&
        !error &&
        loadedSemester &&
        currentSemester &&
        semesters &&
        semesters.length > 0 &&
        availableYears && (
          <TitleBar className="w-100 d-flex justify-content-between align-items-center text-muted">
            <div className="w-100">
              <HouseIcon />
              <span className="ms-3 fw-bolder align-text-bottom">Semester</span>

              {/* Select Year */}
              <select
                className="ms-3 text-muted align-text-bottom rounded bg-white px-1"
                onChange={(e) => handleYearChange(e.target.value)}
                value={currentSemester?.academicYear}
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
                value={currentSemester?.id}
              >
                {semesters
                  .filter(
                    (item) =>
                      item.academicYear === currentSemester?.academicYear
                  )
                  .map((semester) => (
                    <option key={semester.id} value={semester.id}>
                      {`${semester.semesterName}`}
                    </option>
                  ))}
              </select>
              {/* End of Select Semester */}

              <Button
                disabled={loadedSemester?.id === currentSemester?.id}
                size="sm"
                className={`ms-4 px-3 py-0 align-text-bottom ${
                  loadedSemester?.id === currentSemester?.id
                    ? "btn-secondary"
                    : "available"
                }`}
                onClick={handleLoad}
              >
                LOAD
              </Button>

              <span className="ms-4 me-2 fw-bolder align-text-bottom">
                Status:
              </span>
              <Button
                size="sm"
                className="py-0 align-text-bottom"
                variant={currentSemester?.active ? "success" : "warning"}
                onClick={handleStatusChange}
              >
                {currentSemester?.active ? (
                  <span className="px-2">Active</span>
                ) : (
                  "Inactive"
                )}
              </Button>
            </div>
            <Dropdown size="sm">
              <Dropdown.Toggle
                variant="secondary"
                className="px-1 py-0 rounded-3"
              >
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
        )}
      <TemplateModal viewContext={ViewContext} />
    </MainContainer>
  );
};

export default Semesters;
